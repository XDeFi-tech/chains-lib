import { Msg as BaseMsg } from '@xdefi/chains-core';
import BigNumber from 'bignumber.js';
import accumulative from 'coinselect/accumulative';
import * as Bitcoin from 'bitcoinjs-lib';

import { UTXODataSource, UTXO } from './datasource/utxo/utxo.data-source';

export interface BitcoinMessageBody {
  amount: BigNumber;
  recipient: string;
  memo?: string;
  sender: string;
}

export type BitcoinTxBody = { txHex: string };

export interface FeeEstimation {
  fee: null | BigNumber;
  maxFee: null | BigNumber;
}

export class BitcoinChainMessage extends BaseMsg<
  BitcoinMessageBody,
  BitcoinTxBody,
  FeeEstimation
> {
  declare data: BitcoinMessageBody;
  declare keys: Bitcoin.ECPairInterface;
  feeEstimation: FeeEstimation = { fee: null, maxFee: null };

  constructor(
    private utxoDataSource: UTXODataSource,
    data: BitcoinMessageBody,
    feeEstimation?: FeeEstimation
  ) {
    super(data);
    if (feeEstimation) {
      this.feeEstimation = feeEstimation;
    }
  }

  get hasSignature() {
    return !!this.keys;
  }

  public toData() {
    return this.data;
  }

  async buildTx() {
    const utxos = await this.utxoDataSource.scanUTXOs(this.data.sender);
    const { fee } = this.feeEstimation ?? {};
    if (!fee)
      throw new Error('Fee estimation is required for building transaction');
    const feeRateWhole = parseInt(fee.toFixed(0));
    const compiledMemo = this.data.memo
      ? this.compileMemo(this.data.memo)
      : null;

    const targetOutputs = [];

    targetOutputs.push({
      address: this.data.recipient,
      value: this.data.amount.toNumber(),
    });

    if (compiledMemo) {
      targetOutputs.push({ script: compiledMemo, value: 0 });
    }
    const { inputs, outputs } = accumulative(
      utxos,
      targetOutputs,
      feeRateWhole
    );

    if (!inputs || !outputs)
      throw new Error('Insufficient Balance for transaction');

    const psbt = new Bitcoin.Psbt({ network: Bitcoin.networks.bitcoin });

    inputs.forEach((utxo: UTXO) =>
      psbt.addInput({
        hash: utxo.hash,
        index: utxo.index,
        witnessUtxo: utxo.witnessUtxo,
      })
    );

    // psbt add outputs from accumulative outputs
    outputs.forEach((output: Bitcoin.PsbtTxOutput) => {
      if (!output.address) {
        //an empty address means this is the  change ddress
        output.address = this.data.sender;
      }
      if (!output.script) {
        psbt.addOutput(output);
      } else {
        //we need to add the compiled memo this way to
        //avoid dust error tx when accumulating memo output with 0 value
        if (compiledMemo) {
          psbt.addOutput({ script: compiledMemo, value: 0 });
        }
      }
    });

    const txHex = psbt.extractTransaction(true).toHex();
    const signedTxHex = this.signPsbt(psbt);

    return { txHex, psbtHex: psbt.toHex(), signedTxHex };
  }

  private signPsbt(psbt: Bitcoin.Psbt) {
    if (!this.signature) {
      return null;
    }
    psbt.signAllInputs(
      Bitcoin.ECPair.fromPrivateKey(Buffer.from(this.signature))
    );
    psbt.finalizeAllInputs();

    return psbt.extractTransaction(true).toHex();
  }

  compileMemo(memo: string) {
    return Bitcoin.script.compile([
      Bitcoin.opcodes.OP_RETURN,
      Buffer.from(memo, 'utf8'),
    ]);
  }

  setKeys(keys: Bitcoin.ECPairInterface) {
    this.keys = keys;

    return this;
  }

  setFees(feeEstimation: FeeEstimation) {
    this.feeEstimation = feeEstimation;

    return this;
  }

  getFee() {
    return this.feeEstimation;
  }
}

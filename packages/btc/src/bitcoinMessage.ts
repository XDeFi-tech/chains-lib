import { BaseAmount } from '@xchainjs/xchain-util';
import { Msg as BaseMsg } from '@xdefi/chains-core';
import BigNumber from 'bignumber.js';
import accumulative from 'coinselect/accumulative';
import * as Bitcoin from 'bitcoinjs-lib';
import { UTXO } from '@xchainjs/xchain-bitcoin';

import { HaskoinDataSource } from './datasource/haskoin/haskoin.data-source';

export interface BitcoinMessageBody {
  amount: BaseAmount;
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
    private haskoinDataSourcer: HaskoinDataSource,
    data: BitcoinMessageBody,
    feeEstimation?: FeeEstimation
  ) {
    super(data);
    if (feeEstimation) {
      this.feeEstimation = feeEstimation;
    }
  }

  get hasSignature() {
    return false;
  }

  public toData() {
    return this.data;
  }
  async buildTx() {
    const utxos = await this.haskoinDataSourcer.scanUTXOs(this.data.sender);
    if (!this.feeEstimation?.fee)
      throw new Error('Fee estimation is required for building transaction');
    const feeRateWhole = parseInt(this.feeEstimation?.fee.toFixed(0));
    const compiledMemo = this.data.memo
      ? this.compileMemo(this.data.memo)
      : null;

    const targetOutputs = [];

    targetOutputs.push({
      address: this.data.recipient,
      value: this.data.amount.amount().toNumber(),
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
    psbt.signAllInputs(this.keys);
    psbt.finalizeAllInputs();
    const txHex = psbt.extractTransaction().toHex();

    return { txHex };
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

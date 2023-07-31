import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BaseMsg,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import accumulative from 'coinselect/accumulative';
import * as Bitcoin from 'bitcoinjs-lib';

import { UTXO, UTXODataSource } from './datasource/utxo/utxo.data-source';
import type { BtcProvider } from './chain.provider';
import { HaskoinDataSource } from './datasource';
import { UTXOManifest } from './manifests';

export interface BitcoinMessageBody {
  amount: NumberIsh;
  to: string;
  memo?: string;
  from: string;
  gasLimit?: NumberIsh;
}

export type BitcoinTxBody = { psbtHex: string };

const defaultFeeEstimation: FeeEstimation = { fee: null, maxFee: null };

export class ChainMsg extends BaseMsg<BitcoinMessageBody, BitcoinTxBody> {
  declare signedTransaction: string | null;
  declare data: BitcoinMessageBody;
  declare keys: Bitcoin.ECPairInterface;
  public utxoDataSource: UTXODataSource;
  feeEstimation: FeeEstimation = defaultFeeEstimation;
  private prevSpeed: undefined | GasFeeSpeed;
  constructor(msg: BitcoinMessageBody, provider?: BtcProvider) {
    super(msg, provider);
    const manifest = this.provider?.manifest as UTXOManifest;
    this.utxoDataSource = new HaskoinDataSource(manifest.chainDataSourceURL);
  }

  public toData() {
    return this.data;
  }

  async buildTx() {
    const utxos = await this.utxoDataSource.scanUTXOs(this.data.from);
    const { fee } = await this.getFee(GasFeeSpeed.low);
    if (!fee)
      throw new Error('Fee estimation is required for building transaction');
    const feeRateWhole = parseInt(fee);
    const compiledMemo = this.data.memo
      ? this.compileMemo(this.data.memo)
      : null;

    const targetOutputs = [];

    targetOutputs.push({
      address: this.data.to,
      value: new BigNumber(this.data.amount.toString())
        .multipliedBy(10 ** (this.provider?.manifest.decimals || 0))
        .toNumber(),
    });

    if (compiledMemo) {
      targetOutputs.push({ script: compiledMemo, value: 0 });
    }
    const { inputs, outputs } = accumulative(
      utxos,
      targetOutputs,
      feeRateWhole
    );

    if (!inputs || !outputs) {
      throw new Error('Insufficient Balance for transaction');
    }

    const psbt = new Bitcoin.Psbt({ network: Bitcoin.networks.bitcoin });
    psbt.addInputs(
      inputs.map((utxo: UTXO) => ({
        hash: utxo.hash,
        index: utxo.index,
        witnessUtxo: utxo.witnessUtxo,
      }))
    );

    // psbt add outputs from accumulative outputs
    outputs.forEach((output: Bitcoin.PsbtTxOutput) => {
      if (!output.address) {
        //an empty address means this is the change address
        output.address = this.data.from;
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

    return { psbtHex: psbt.toHex(), psbt };
  }

  private compileMemo(memo: string) {
    return Bitcoin.script.compile([
      Bitcoin.opcodes.OP_RETURN,
      Buffer.from(memo, 'utf8'),
    ]);
  }

  async getFee(speed?: GasFeeSpeed) {
    if (
      this.prevSpeed &&
      speed === this.prevSpeed &&
      this.feeEstimation &&
      this.feeEstimation.fee
    ) {
      return this.feeEstimation;
    }

    let feeEstimation = defaultFeeEstimation;

    if (this.provider) {
      const feeOptions = await this.provider.gasFeeOptions();
      if (!feeOptions) {
        return defaultFeeEstimation;
      }

      this.feeEstimation = {
        fee: feeOptions[speed || GasFeeSpeed.medium].toString(),
        maxFee: feeOptions[GasFeeSpeed.high].toString(),
      };
      this.prevSpeed = speed;
      feeEstimation = this.feeEstimation;
    }

    return feeEstimation;
  }
}

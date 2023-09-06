import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BaseMsg,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import accumulative from 'coinselect/accumulative';
import * as Bitcoin from 'bitcoinjs-lib';

import { UTXODataSource } from './datasource/utxo/utxo.data-source';
import type { UtxoProvider } from './chain.provider';
import { HaskoinDataSource } from './datasource';
import { UTXOManifest } from './manifests';

export interface BitcoinMessageBody {
  amount: NumberIsh;
  to: string;
  memo?: string;
  from: string;
  gasLimit?: NumberIsh; // ByteFee
}

const defaultFeeEstimation: FeeEstimation = { fee: null, maxFee: null };

export class ChainMsg extends BaseMsg<BitcoinMessageBody, any> {
  declare signedTransaction: string | null;
  declare data: BitcoinMessageBody;
  declare keys: Bitcoin.ECPairInterface;
  public utxoDataSource: UTXODataSource;
  feeEstimation: FeeEstimation = defaultFeeEstimation;
  constructor(msg: BitcoinMessageBody, provider: UtxoProvider) {
    super(msg, provider);
    const manifest = this.provider?.manifest as UTXOManifest;
    this.utxoDataSource = new HaskoinDataSource(manifest.chainDataSourceURL);
  }

  public toData() {
    return this.data;
  }

  async buildTx() {
    const utxos = await this.utxoDataSource.scanUTXOs(this.data.from);
    const { fee } = await this.getFee();
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

    return { inputs, outputs, utxos, fee, compiledMemo };
  }

  private compileMemo(memo: string) {
    return Bitcoin.script.compile([
      Bitcoin.opcodes.OP_RETURN,
      Buffer.from(memo, 'utf8'),
    ]);
  }

  async getFee(speed?: GasFeeSpeed) {
    let feeEstimation = defaultFeeEstimation;
    const msgData = this.toData();
    if (msgData.gasLimit) {
      feeEstimation.fee = BigNumber(msgData.gasLimit.toString())
        .dividedBy(10 ** (this.provider?.manifest.decimals || 0))
        .toString();
    } else if (this.provider) {
      const feeOptions = await this.provider.gasFeeOptions();
      if (!feeOptions) {
        return defaultFeeEstimation;
      }

      this.feeEstimation = {
        fee: BigNumber(feeOptions[speed || GasFeeSpeed.medium].toString())
          .dividedBy(10 ** this.provider.manifest.decimals)
          .toString(),
        maxFee: BigNumber(feeOptions[GasFeeSpeed.high].toString())
          .dividedBy(10 ** this.provider.manifest.decimals)
          .toString(),
      };
      feeEstimation = this.feeEstimation;
    }

    return feeEstimation;
  }
}

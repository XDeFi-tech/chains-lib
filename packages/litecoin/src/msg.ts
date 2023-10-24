import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BaseMsg,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import accumulative from 'coinselect/accumulative';
import * as UTXOLib from 'bitcoinjs-lib';

import type { LitecoinProvider } from './chain.provider';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  memo?: string;
  from: string;
  gasLimit?: NumberIsh; // ByteFee
  decimals?: number;
}

export class ChainMsg extends BaseMsg<MsgBody, any> {
  declare signedTransaction: string | null;

  constructor(
    public readonly data: MsgBody,
    public readonly provider: LitecoinProvider
  ) {
    super(data, provider);
  }

  public toData() {
    return this.data;
  }

  async buildTx() {
    const msgData = this.toData();
    const utxos = await this.provider.utxoDataSource.scanUTXOs(this.data.from);
    const { fee } = await this.getFee();
    if (!fee)
      throw new Error('Fee estimation is required for building transaction');
    const feeRateWhole = parseInt(fee) < 1 ? 1 : parseInt(fee);
    const compiledMemo = msgData?.memo && this.compileMemo(msgData.memo);

    const targetOutputs = [];

    targetOutputs.push({
      address: msgData.to,
      value: new BigNumber(msgData.amount.toString())
        .multipliedBy(
          10 ** (msgData.decimals || this.provider.manifest.decimals)
        )
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

    return {
      to: msgData.to,
      from: msgData.from,
      inputs,
      outputs,
      utxos,
      fee,
      compiledMemo,
    };
  }

  public compileMemo(memo: string) {
    return UTXOLib.script.compile([
      UTXOLib.opcodes.OP_RETURN,
      Buffer.from(memo, 'utf8'),
    ]);
  }

  async getFee(speed?: GasFeeSpeed): Promise<FeeEstimation> {
    const feeEstimation: FeeEstimation = { fee: null, maxFee: null };
    const msgData = this.toData();
    if (msgData.gasLimit) {
      feeEstimation.fee = BigNumber(msgData.gasLimit.toString())
        .dividedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
        .toString();
    } else {
      const feeOptions = await this.provider.gasFeeOptions();
      if (!feeOptions) {
        return feeEstimation;
      }

      feeEstimation.fee = BigNumber(
        feeOptions[speed || GasFeeSpeed.medium].toString()
      )
        .dividedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
        .toString();
    }

    return feeEstimation;
  }
}

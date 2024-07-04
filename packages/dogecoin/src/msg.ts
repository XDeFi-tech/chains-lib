import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BaseMsg,
  MsgEncoding,
  NumberIsh,
  Coin,
} from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import accumulative from 'coinselect/accumulative';
import * as UTXOLib from 'bitcoinjs-lib';

import type { DogecoinProvider } from './chain.provider';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  memo?: string | Uint8Array;
  from: string;
  gasLimit?: NumberIsh; // ByteFee
  decimals?: number;
}

export const MINIMUM_DOGECOIN_FEE = 40000;

export class ChainMsg extends BaseMsg<MsgBody, any> {
  declare signedTransaction: string | null;

  constructor(
    public readonly data: MsgBody,
    public readonly provider: DogecoinProvider,
    public readonly encoding: MsgEncoding
  ) {
    super(data, provider, encoding);
  }

  public toData() {
    return this.data;
  }

  async buildTx() {
    const msgData = this.toData();
    const utxos = await this.provider.scanUTXOs(this.data.from);
    const { fee } = await this.getFee(); // unit is btc/kvB
    if (!fee)
      throw new Error('Fee estimation is required for building transaction');
    const feeRate = Number(fee) * 1e5; // sat/vB
    const feeRateWhole =
      parseInt(feeRate.toString()) < MINIMUM_DOGECOIN_FEE
        ? MINIMUM_DOGECOIN_FEE
        : parseInt(feeRate.toString());
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

  /**
   * Current method in used to compile a bitcoinjs-lib script. Bitcoin scripts are used to define the conditions
   * under which funds can be spent in a Bitcoin transaction. Mark a transaction output as unspendable
   * @param {string | Uint8Array} memo
   * @returns {Buffer} OP_RETURN compiled script
   */
  public compileMemo(memo: string | Uint8Array) {
    let formattedMemo: Buffer;
    if (typeof memo === 'string') {
      formattedMemo = Buffer.from(memo, 'utf8');
    } else {
      formattedMemo = Buffer.from(memo);
    }

    return UTXOLib.script.compile([UTXOLib.opcodes.OP_RETURN, formattedMemo]);
  }

  async getFee(speed?: GasFeeSpeed): Promise<FeeEstimation> {
    const feeEstimation: FeeEstimation = { fee: null, maxFee: null };
    const msgData = this.toData();
    if (msgData.gasLimit) {
      feeEstimation.fee = new BigNumber(msgData.gasLimit.toString())
        .dividedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
        .toString();
    } else {
      const feeOptions = await this.provider.gasFeeOptions();
      if (!feeOptions) {
        return feeEstimation;
      }

      feeEstimation.fee = new BigNumber(
        feeOptions[speed || GasFeeSpeed.medium].toString()
      )
        .dividedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
        .toString();
    }

    return feeEstimation;
  }

  async getMaxAmountToSend(contract?: string) {
    const msgData = this.toData();
    const balances = await this.provider.getBalance(msgData.from);
    const gap = new BigNumber(this.provider.manifest?.maxGapAmount || 0);

    let balance: Coin | undefined;

    if (!contract) {
      balance = (await balances.getData()).find(
        (b) =>
          b.asset.chainId === this.provider.manifest.chainId && b.asset.native
      );
    } else {
      balance = (await balances.getData()).find(
        (b) =>
          b.asset.chainId === this.provider.manifest.chainId &&
          b.asset.address === contract
      );
    }

    if (!balance) throw new Error('No balance found');

    let maxAmount: BigNumber = new BigNumber(balance.amount).minus(gap);

    if (balance.asset.native) {
      const feeEstimation = await this.getFee();
      maxAmount = maxAmount.minus(feeEstimation.fee || 0);
    }

    if (maxAmount.isLessThan(0)) {
      return '0';
    }

    return maxAmount.toString();
  }
}

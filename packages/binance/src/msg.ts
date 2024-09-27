import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BasMsg,
  MsgEncoding,
  NumberIsh,
  Coin,
} from '@ctrl-tech/chains-core';
import BigNumber from 'bignumber.js';

import type { BinanceProvider } from './chain.provider';

export interface MsgBody {
  from: string;
  to: string;
  amount: NumberIsh;
  memo?: string;
  denom: string;
  source?: number;
  type?: string;
  data?: string;
}

export interface TxBody {
  to: string;
  value: number;
  chainId: string;
  memo: string;
  from: string;
  accountNumber: number;
  sequence: number;
  source: number;
  denom: string;
  data?: string;
}

export class ChainMsg extends BasMsg<MsgBody, TxBody> {
  declare signedTransaction: string | null;
  declare provider: BinanceProvider;

  constructor(data: MsgBody, provider: BinanceProvider, encoding: MsgEncoding) {
    super(data, provider, encoding);
  }

  public toData() {
    return this.data;
  }
  async buildTx(): Promise<TxBody> {
    const msgData = this.toData();
    const account = await this.provider.getAccount(msgData.from);
    return {
      to: msgData.to,
      value: new BigNumber(msgData.amount)
        .multipliedBy(10 ** this.provider.manifest.decimals)
        .toNumber(),
      chainId: this.provider.manifest.chainId,
      memo: msgData.memo || '',
      from: account.address,
      accountNumber: account.accountNumber || 0,
      sequence: account.sequence || 0,
      source: msgData.source || 0,
      denom: msgData.denom,
      data: msgData.data,
    };
  }

  async getFee() {
    const fee = await this.provider.gasFeeOptions();
    const feeEstimation: FeeEstimation = {
      fee: null,
      maxFee: null,
    };

    if (!fee) {
      return feeEstimation;
    }

    feeEstimation.fee = new BigNumber(fee[GasFeeSpeed.medium] as number)
      .dividedBy(10 ** this.provider.manifest.decimals)
      .toString();
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

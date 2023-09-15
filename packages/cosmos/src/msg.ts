import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BasMsg,
  MsgData,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import { StdTx } from '@cosmjs/amino';
import BigNumber from 'bignumber.js';

import type { CosmosProvider } from './chain.provider';

export interface MsgBody {
  from: string;
  to: string;
  amount: string;
  denom?: string;
  memo?: string;
  gasLimit?: NumberIsh;
  gasPrice?: NumberIsh;
  mode?: string;
}

export interface TxData {
  msgs: any[];
  memo?: string;
  from: string;
  to: string;
  value: string;
  accountNumber?: number;
  sequence?: number;
  denom: string;
}

export class ChainMsg extends BasMsg<MsgBody, TxData> {
  declare signedTransaction: StdTx | undefined;
  declare provider: CosmosProvider;

  public toData() {
    return this.data;
  }

  constructor(data: MsgData, provider: CosmosProvider) {
    super(data, provider);
  }

  async buildTx() {
    const msgData = this.toData();
    const value = BigNumber(msgData.amount)
      .multipliedBy(10 ** this.provider.manifest.decimals)
      .toString();
    const msgToSend = {
      fromAddress: msgData.from,
      toAddress: msgData.to,
      amount: [
        {
          amount: value,
          denom: msgData.denom || this.provider.manifest.denom,
        },
      ],
    };
    const fee = {
      amount: [
        {
          amount: BigNumber(msgData.gasPrice)
            .multipliedBy(10 ** this.provider.manifest.decimals)
            .toString(),
          denom: this.provider.manifest.denom,
        },
      ],
      gas: BigNumber(msgData.gasLimit).toString(),
    };
    const acc = await this.provider.getAccount(msgData.from);

    return {
      msgs: msgToSend,
      ...(msgData.memo && { memo: msgData.memo }),
      fee,
      ...(acc && {
        accountNumber: acc.accountNumber,
        sequence: acc.sequence,
      }),
      to: msgData.to,
      from: msgData.from,
      denom: msgData.denom || this.provider.manifest.denom,
      value,
    };
  }

  async getFee(speed?: GasFeeSpeed) {
    const data = this.toData();
    const estimation: FeeEstimation = {
      fee: null,
      maxFee: null,
    };

    if (!data.gasLimit && !data.gasPrice && this.provider) {
      const [feeEstimation] = await this.provider.estimateFee(
        [this],
        speed || GasFeeSpeed.medium
      );
      if (feeEstimation.gasPrice && feeEstimation.gasLimit) {
        estimation.fee = BigNumber(feeEstimation.gasLimit.toString())
          .multipliedBy(feeEstimation.gasPrice.toString())
          .dividedBy(10 ** this.provider.manifest.decimals)
          .toString();
      }
    } else if (data.gasLimit && data.gasPrice) {
      estimation.fee = BigNumber(data.gasLimit)
        .multipliedBy(data.gasPrice)
        .dividedBy(10 ** this.provider.manifest.decimals)
        .toString();
    }

    return estimation;
  }
}

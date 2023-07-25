import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BasMsg,
  MsgData,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import { StdTx } from '@cosmjs/amino';
import BigNumber from 'bignumber.js';

import { CosmosManifest } from './manifests';
import type { CosmosProvider } from './chain.provider';

export interface MsgBody {
  from: string;
  to: string;
  amount: string;
  denom: string;
  memo: string;
  gasLimit: NumberIsh;
  gasPrice: NumberIsh;
  mode?: string;
}

export interface TxData {
  msgs: any[];
  memo?: string;
}

export class ChainMsg extends BasMsg<MsgBody, TxData> {
  declare signedTransaction: StdTx | undefined;
  manifest?: CosmosManifest | undefined;

  public toData() {
    return this.data;
  }

  constructor(
    public readonly data: MsgData,
    public readonly provider?: CosmosProvider
  ) {
    super(data, provider);
    this.manifest = provider?.manifest as CosmosManifest;
  }

  async buildTx() {
    const msgData = this.toData();
    const msgToSend = {
      fromAddress: msgData.from,
      toAddress: msgData.to,
      amount: [
        {
          amount: BigNumber(msgData.amount)
            .multipliedBy(10 ** (this.manifest?.decimals || 0))
            .toString(),
          denom: msgData.denom || this.manifest?.denom,
        },
      ],
    };
    const fee = {
      amount: [
        {
          amount: BigNumber(msgData.gasPrice)
            .multipliedBy(10 ** (this.manifest?.decimals || 0))
            .toString(),
          denom: msgData.denom || this.manifest?.denom,
        },
      ],
      gas: BigNumber(msgData.gasLimit).toString(),
    };
    let acc = null;

    if (this.provider) {
      acc = await this.provider.getAccount(msgData.from);
    }

    return {
      msgs: msgToSend,
      ...(msgData.memo && { memo: msgData.memo }),
      fee,
      ...(acc && {
        accountNumber: acc.accountNumber,
        sequence: acc.sequence,
      }),
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
          .dividedBy(10 ** (this.manifest?.decimals || 0))
          .toString();
      }
    } else if (data.gasLimit && data.gasPrice) {
      estimation.fee = BigNumber(data.gasLimit)
        .multipliedBy(data.gasPrice)
        .dividedBy(10 ** (this.manifest?.decimals || 0))
        .toString();
    }

    return estimation;
  }

  static fromData(data: MsgBody) {
    return new ChainMsg(data);
  }
}

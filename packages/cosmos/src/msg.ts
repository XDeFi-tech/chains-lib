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
}

export interface TxData {
  msgs: any[];
  memo?: string;
}

export class ChainMsg extends BasMsg<MsgBody, TxData> {
  signedTransaction: StdTx | undefined;
  manifest: CosmosManifest | undefined;

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
      from_address: msgData.from,
      to_address: msgData.to,
      amount: [
        {
          amount: msgData.amount,
          denom: msgData.denom,
        },
      ],
    };

    return {
      msgs: [msgToSend],
      ...(msgData.memo && { memo: msgData.memo }),
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

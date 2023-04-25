import { Msg as BasMsg } from '@xdefi/chains-core';
import BigNumber from 'bignumber.js';

export interface MsgBody {
  from: string;
}

export interface TxData {
  from: string;
}

export interface FeeEstimation {
  fee: null | BigNumber;
  maxFee: null | BigNumber;
}

export class ChainMsg extends BasMsg<MsgBody, TxData, FeeEstimation> {
  signedTransaction: string | undefined;

  public toData() {
    return this.data;
  }

  buildTx() {
    return this.data;
  }

  getFee() {
    return this.data;
  }

  static fromData(data: MsgBody) {
    return new ChainMsg(data);
  }
}

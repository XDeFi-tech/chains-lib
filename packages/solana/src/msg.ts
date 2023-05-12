import { Msg as BasMsg } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';

export interface MsgBody {
  to: string;
}

export interface FeeEstimation {
  fee: null | BigNumber;
  maxFee: null | BigNumber;
}

export class ChainMsg extends BasMsg<MsgBody, MsgBody, FeeEstimation> {
  declare signedTransaction: string;

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

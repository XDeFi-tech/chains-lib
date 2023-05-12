import { Msg as BasMsg } from '@xdefi/chains-core';
import BigNumber from 'bignumber.js';

export interface MsgBody {
  to: string;
}

export interface FeeEstimation {
  fee: null | BigNumber;
  maxFee: null | BigNumber;
}

export class ChainMsg extends BasMsg<MsgBody, MsgBody, FeeEstimation> {
  signedTransaction: unknown;
  public toData() {
    return this.data;
  }
  buildTx() {
    return this.data;
  }
  getFee() {
    return this.data;
  }
}
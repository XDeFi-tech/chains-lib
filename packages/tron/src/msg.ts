import { Msg as BasMsg } from '@xdefi/chains-core';

export interface MsgBody {
  to: string;
}

export class ChainMsg extends BasMsg<MsgBody, MsgBody> {
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

import { Msg as BasMsg } from '@xdefi-tech/chains-core';
import { StdTx } from '@cosmjs/amino';

export interface MsgBody {
  from: string;
  to: string;
  amount: string;
  denom: string;
  memo: string;
}

export interface TxData {
  msgs: any[];
  memo?: string;
}

export class ChainMsg extends BasMsg<MsgBody, TxData> {
  signedTransaction: StdTx | undefined;

  public toData() {
    return this.data;
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

  getFee() {
    return this.data;
  }

  static fromData(data: MsgBody) {
    return new ChainMsg(data);
  }
}

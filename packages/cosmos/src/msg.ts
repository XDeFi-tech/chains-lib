import { Msg as BasMsg } from '@xdefi-tech/chains-core';
import { MsgSend, coin, StdFee } from '@cosmjs/launchpad';
import { StdTx } from '@cosmjs/amino';

export interface MsgBody {
  from: string;
  to: string;
  amount: string;
  denom: string;
}

export interface TxData {
  msgs: MsgSend[];
  fee: StdFee;
  memo?: string;
}

export class ChainMsg extends BasMsg<MsgBody, TxData> {
  signedTransaction: StdTx | undefined;

  public toData() {
    return this.data;
  }

  async buildTx() {
    const msgData = this.toData();
    const msgToSend: MsgSend = {
      type: 'cosmos-sdk/MsgSend',
      value: {
        from_address: msgData.from,
        to_address: msgData.to,
        amount: [coin(msgData.amount, msgData.denom)],
      },
    };
    const fee = {
      amount: [coin('5000', 'uatom')],
      gas: '890000',
    };
    return {
      msgs: [msgToSend],
      fee: fee,
      memo: undefined,
    };
  }

  getFee() {
    return this.data;
  }

  static fromData(data: MsgBody) {
    return new ChainMsg(data);
  }
}

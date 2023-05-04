import { Msg as BasMsg } from '@xdefi/chains-core';
import BigNumber from 'bignumber.js';
import { MsgSend, coin, StdFee } from '@cosmjs/launchpad';

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

export interface FeeEstimation {
  fee: null | BigNumber;
  maxFee: null | BigNumber;
}

export class ChainMsg extends BasMsg<MsgBody, TxData, FeeEstimation> {
  signedTransaction: string | undefined;

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

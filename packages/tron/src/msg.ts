import { Msg as BaseMsg } from '@xdefi-tech/chains-core';
import TronWeb from 'tronweb';

import { TRON_MANIFEST } from './manifests';

export interface MsgBody {
  to: string;
  from: string;
  amount: string;
}

export class ChainMsg extends BaseMsg<MsgBody, MsgBody> {
  signedTransaction: unknown;
  public toData(): MsgBody {
    return {
      to: this.data?.to,
      from: this.data?.from,
      amount: this.data?.amount,
    };
  }
  buildTx() {
    const tronWeb = new TronWeb({
      fullHost: TRON_MANIFEST.rpcURL,
    });

    const data = this.toData();
    const tx = tronWeb.transactionBuilder.sendTrx(
      data.to,
      tronWeb.toSun(data.amount),
      data.from,
      null
    );
    return tx;
  }
  getFee() {
    return this.data;
  }
}

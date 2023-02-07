import { Msg as BasMsg } from "@xdefi/chains-core";

interface MsgBody {
  nonce: string;
  to: string;
  value: string;
  gasLimit: string;
  gasPrice: string;
}

export class ChainMsg extends BasMsg<MsgBody> {
  public toData(): MsgBody {
    // sha256 alg
    return {
      nonce: '',
      to: '',
      value: '',
      gasLimit: '',
      gasPrice: ''
    };
  }
}

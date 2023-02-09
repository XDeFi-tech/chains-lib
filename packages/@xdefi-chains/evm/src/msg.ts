import { Msg as BasMsg } from "@xdefi/chains-core";
import ethers from 'ethers';

interface GasFee {
  gasLimit: string;
  gasPrice: string;
}

interface MsgBody {
  nonce: string; // calculated from chain
  to: string; // to address
  from: string; // from address
  value: string; // value in wei starts with 0x
  data?: string; // 0x by default
  gasLimit?: string;  // calculated based on 'data' field
  gasPrice?: string;  // from chain
}

export class ChainMsg extends BasMsg<MsgBody, GasFee> {
  public fee(): GasFee {
    return {
      gasLimit: this.data?.gasLimit,
      gasPrice: this.data?.gasPrice,
    }
  }

  public toData(): MsgBody {
    return {
      nonce: this.data?.nonce,
      to: this.data?.to,
      from: this.data?.from,
      value: this.data?.value,
      data: this.data?.data,
      gasLimit: this.data?.gasLimit,
      gasPrice: this.data?.gasPrice,
    };
  }

  public toHash() {
    return ethers.utils.RLP.encode([
      ethers.utils.hexlify(this.data.nonce),
      ethers.utils.hexlify(this.data.gasPrice),
      ethers.utils.hexlify(this.data.gasLimit),
      ethers.utils.hexlify(this.data.to),
      ethers.utils.hexlify(this.data.value),
      ethers.utils.hexlify(this.data.data),
      "0x",
      "0x",
    ]);
  }
}

import App from "@ledgerhq/hw-app-eth";
import Transport from "@ledgerhq/hw-transport-webhid";
import { Signer } from "@xdefi/chains-core";
import { BigNumber, utils } from "ethers";
import { ChainMsg } from "./msg";

type Signature = {
  v: number;
  r: string;
  s: string;
};

@Signer.Decorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider<Signature> {
  verifyAddress(address: string): boolean {
    return utils.isAddress(address);
  }

  async getAddress(derivation: string): Promise<string> {
    const transport = await Transport.create();
    const app = new App(transport);

    const address = await app.getAddress(derivation);
    transport.close();

    return address.address;
  }

  async sign(derivation: string, msg: ChainMsg): Promise<Signature> {
    const transport = await Transport.create();
    const app = new App(transport);

    const signature = await app.signTransaction(derivation, msg.toData());
    transport.close();

    return {
      v: BigNumber.from("0x" + signature.v).toNumber(),
      r: "0x" + signature.r,
      s: "0x" + signature.s,
    };
  }
}

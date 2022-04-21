import { Signer, Msg } from "@xdefi/chains-core";

@Signer.Decorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Controller {
  verifyAddress(address: string): boolean {
    throw new Error("Method not implemented.");
  }
  getAddress(derivation: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  sign(msg: Msg): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

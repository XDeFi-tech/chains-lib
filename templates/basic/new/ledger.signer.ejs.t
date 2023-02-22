---
to: apps/<%= name.toLowerCase() %>/src/ledger.signer.ts
---

import { Signer, Msg } from "@xdefi/chains-core";
import { ChainMsg } from "./msg";

type Signature = any

@Signer.Decorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Controller<Signature> {
  verifyAddress(address: string): boolean {
    throw new Error("Method not implemented.");
  }
  getAddress(derivation: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  sign(derivation: string, msg: ChainMsg): Promise<Signature> {
    throw new Error("Method not implemented.");
  }
}

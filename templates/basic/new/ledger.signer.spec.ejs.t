---
to: apps/<%= name.toLowerCase() %>/src/ledger.signer.spec.ts
---

import { LedgerSigner } from "./ledger.signer";

describe("ledger.signer", () => {
  it.todo("verifyAddress(): should return FALSE if address is invalid");
  it.todo("verifyAddress(): should return TRUE if address is valid");

  it.todo("getAddress(): should throw an error if derivation path is invalid");
  it.todo("getAddress(): should return address");

  it.todo("sign(): show throw an error if msg is invalid");
  it.todo("sign(): show return signature");
});

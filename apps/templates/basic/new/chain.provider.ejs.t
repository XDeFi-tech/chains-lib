---
to: apps/<%= name.toLowerCase() %>/src/chain.provider.ts
---

import "reflect-metadata";
import { Chain, Coin, Msg, Transaction } from "@xdefi/chains-core";
import { LedgerSigner } from "./ledger.signer";
import { ChainMsg } from "./msg";

@Chain.Decorator("<%= Name %>Provider", {
  deps: [LedgerSigner],
})
class <%= Name %>Provider extends Chain.Provider {
  createMsg(data: Msg.Data): Msg {
    return new ChainMsg(data);
  }
  getTransactions(): Promise<Transaction[]> {
    throw new Error("Method not implemented.");
  }
  estimateFee(msgs: Msg[]): Promise<Coin[]> {
    throw new Error("Method not implemented.");
  }
  broadcast(msgs: Msg[]): Promise<Transaction[]> {
    throw new Error("Method not implemented.");
  }
  getBalance(): Promise<Coin> {
    throw new Error("Method not implemented.");
  }
}

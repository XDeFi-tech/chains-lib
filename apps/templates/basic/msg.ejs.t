---
to: apps/<%= name %>/msg.ts
---

import { Msg as BasMsg } from "@xdefi/chains-core";

export class ChainMsg extends BasMsg {
  public toData() {
    return this.data;
  }
}

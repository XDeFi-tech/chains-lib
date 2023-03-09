---
to: packages/<%= name.toLowerCase() %>/src/manifests.ts
---

import { Chain } from '@xdefi/chains-core';

export const <%= name %>Manifest: Chain.Manifest = {
   name: '<%= name %>',
   description: '',
   rpcURL: '',
   chainSymbol: '',
   blockExplorerURL: '',
   chainId: '',
   chain: '',
};
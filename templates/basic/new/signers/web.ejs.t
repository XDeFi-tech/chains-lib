---
to: packages/<%= name.toLowerCase() %>/src/signers/web.ts
---

import { Signer } from '@xdefi-tech/chains-core';
import { PrivateKeySigner } from './private-key.signer';

const signers: typeof Signer.Provider[] = [PrivateKeySigner];

export default signers;

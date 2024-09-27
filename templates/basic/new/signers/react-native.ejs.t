---
to: packages/<%= name.toLowerCase() %>/src/signers/react-native.ts
---

import { Signer } from '@ctrl-tech/chains-core';
import { PrivateKeySigner } from './private-key.signer';
// add and use trust wallet signer instead of PK


const signers: typeof Signer.Provider[] = [PrivateKeySigner];

export default signers;

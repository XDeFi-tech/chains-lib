import { Signer } from '@xdefi-tech/chains-core';

import { PrivateKeySigner } from './private-key.signer';
import { SeedPhraseSigner } from './seed-phrase.signer';
// add and use trust wallet signer instead of PK

const signers: typeof Signer.Provider[] = [PrivateKeySigner, SeedPhraseSigner];

export default signers;

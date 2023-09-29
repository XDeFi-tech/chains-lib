import { Signer } from '@xdefi-tech/chains-core';

import { SeedPhraseSigner } from './seed-phrase.signer';
// add and use trust wallet signer instead of PK

const signers: typeof Signer.Provider[] = [SeedPhraseSigner];

export default signers;

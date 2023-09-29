import { Signer } from '@xdefi-tech/chains-core';

import { SeedPhraseSigner } from './seed-phrase.signer';

const signers: typeof Signer.Provider[] = [SeedPhraseSigner];

export default signers;

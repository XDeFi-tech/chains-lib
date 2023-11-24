import { Signer } from '@xdefi-tech/chains-core';

import { LedgerSigner } from './ledger.signer';
import { SeedPhraseSigner } from './seed-phrase.signer';

const signers: typeof Signer.Provider[] = [LedgerSigner, SeedPhraseSigner];

export default signers;

import { Signer } from '@xdefi-tech/chains-core';

import SeedPhraseSigner from './seed-phrase.signer';
import LedgerSigner from './ledger.signer';

const signers: typeof Signer.Provider[] = [LedgerSigner, SeedPhraseSigner];

export default signers;

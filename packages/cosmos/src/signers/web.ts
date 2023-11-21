import { Signer } from '@xdefi-tech/chains-core';

import { LedgerSigner } from './ledger.signer';
import { SeedPhraseSigner } from './seed-phrase.signer';
import { PrivateKeySigner } from './private-key.signer';

const signers: typeof Signer.Provider[] = [
  LedgerSigner,
  SeedPhraseSigner,
  PrivateKeySigner,
];

export default signers;

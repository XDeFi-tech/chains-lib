import { Signer } from '@xdefi-tech/chains-core';

import { LedgerSigner } from './ledger.signer';
import { PrivateKeySigner } from './private-key.signer';
import { SeedPhraseSigner } from './seed-phrase.signer';
import { TrezorSigner } from './trezor.signer';

const signers: typeof Signer.Provider[] = [
  LedgerSigner,
  PrivateKeySigner,
  SeedPhraseSigner,
  TrezorSigner,
];

export default signers;

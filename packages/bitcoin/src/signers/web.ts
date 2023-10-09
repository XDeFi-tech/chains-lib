import { Signer } from '@xdefi-tech/chains-core';

import { PrivateKeySigner } from './private-key.signer';
import LedgerSigner from './ledger.signer';
import TrezorSigner from './trezor.signer';

const signers: typeof Signer.Provider[] = [
  LedgerSigner,
  PrivateKeySigner,
  TrezorSigner,
];

export default signers;

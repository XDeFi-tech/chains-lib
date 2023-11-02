import { Signer } from '@xdefi-tech/chains-core';

import { PrivateKeySigner } from './private-key.signer';
import TrezorSigner from './trezor.signer';
import LedgerSigner from './ledger.signer';

const signers: typeof Signer.Provider[] = [
  LedgerSigner,
  PrivateKeySigner,
  TrezorSigner,
];

export default signers;

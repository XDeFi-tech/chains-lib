import { Signer } from '@xdefi-tech/chains-core';

import { PrivateKeySigner } from './private-key.signer';
import { LedgerSigner } from './ledger.signer';

const signers: typeof Signer.Provider[] = [PrivateKeySigner, LedgerSigner];

export default signers;

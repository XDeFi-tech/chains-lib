import { Signer } from '@xdefi/chains-core';
import { LedgerSigner } from './ledger.signer';
import { PrivateKeySigner } from './private-key.signer';

const signers: typeof Signer.Provider[] = [LedgerSigner, PrivateKeySigner];

export default signers;

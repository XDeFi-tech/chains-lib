import { Signer } from '@xdefi-tech/chains-core';

import { PrivateKeySigner } from './private-key.signer';
// add and use trust wallet signer instead of PK

const signers: typeof Signer.Provider[] = [PrivateKeySigner];

export default signers;
export { PrivateKeySigner };

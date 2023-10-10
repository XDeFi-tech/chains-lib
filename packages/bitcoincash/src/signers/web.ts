import { Signer } from '@xdefi-tech/chains-core';

import { PrivateKeySigner } from './private-key.signer';
import TrezorSigner from './trezor.signer';

const signers: typeof Signer.Provider[] = [PrivateKeySigner, TrezorSigner];

export default signers;

---
to: packages/<%= name.toLowerCase() %>/src/signers/private-key.signer.ts
---

import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner<S = string> extends Signer.Provider<S> {
    verifyAddress(address: string): boolean {
        throw new Error('Method not implemented.');
    }

    async getAddress(privateKey: string): Promise<string> {
        if (!this.verifyAddress(privateKey)) {
            throw new Error('Invalid address');
        }
        throw new Error('Method not implemented.');
    }

    async sign(privateKey: string, msg: ChainMsg): Promise<S> {
        throw new Error('Method not implemented.');
    }
}

export default PrivateKeySigner;


import { Signer, SignerDecorator } from '@xdefi/chains-core';
import { ChainMsg } from '../msg';
import { Keypair, PublicKey } from '@solana/web3.js';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner<S = string> extends Signer.Provider<S> {
    verifyAddress(address: string): boolean {
        try {
            new PublicKey(address);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getAddress(privateKey: string): Promise<string> {
        if (!this.verifyAddress(privateKey)) {
            throw new Error('Invalid address');
        }
        const keypair =  Keypair.fromSecretKey(Buffer.from(privateKey, 'hex'));
        return keypair.publicKey.toBase58();
    }

    async sign(privateKey: string, msg: ChainMsg): Promise<S> {
        throw new Error('Method not implemented.');
    }
}

export default PrivateKeySigner;


import { Signer, SignerDecorator } from '@xdefi/chains-core';
import { utils, Wallet } from 'ethers';
import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider<string> {
    verifyAddress(address: string): boolean {
        return utils.isAddress(address);
    }

    async getAddress(privateKey: string): Promise<string> {
        if (!this.verifyAddress(privateKey)) {
            throw new Error('Invalid address, should start with "0x"');
        }
        const wallet = new Wallet(privateKey);

        return wallet.address;
    }

    async sign(privateKey: string, msg: ChainMsg): Promise<string> {
        const wallet = new Wallet(privateKey);
        const signature = await wallet.signTransaction(msg.prepareTransaction());
        msg.sign(signature);
        return signature;
    }
}
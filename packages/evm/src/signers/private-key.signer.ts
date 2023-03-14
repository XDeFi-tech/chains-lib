import { Signer, SignerDecorator } from '@xdefi/chains-core';
import { utils, Wallet } from 'ethers';
import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner<S = string> extends Signer.Provider<S> {
    verifyAddress(address: string): boolean {
        return utils.isAddress(address);
    }

    async getAddress(privateKey: string): Promise<string> {
        const wallet = new Wallet(privateKey);

        return wallet.address;
    }

    async sign(privateKey: string, msg: ChainMsg): Promise<S> {
        const wallet = new Wallet(privateKey);
        const txData = await msg.buildTx();
        const signature = await wallet.signTransaction({

        });
        msg.sign(signature);
        return signature as S;
    }
}

export default PrivateKeySigner;


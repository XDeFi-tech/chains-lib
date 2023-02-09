import { Signer, SignerDecorator } from "@xdefi/chains-core";
import { Wallet, utils } from "ethers";
import { ChainMsg } from "../msg";

@SignerDecorator(Signer.SignerType.KEYSTORE)
export class KeystoreSigner extends Signer.Provider<string> {
    constructor(
        private readonly wallet: any,
        private readonly walletPassword: string
    ) {
        super();
        this.wallet = wallet;
        this.walletPassword = wallet;
    }
    verifyAddress(address: string): boolean {
        return utils.isAddress(address);
    }

    async getAddress(privateKey: string): Promise<string> {
        if (!this.verifyAddress(privateKey)) {
            throw new Error('Invalid address, should start with "0x"')
        }
        const wallet = new Wallet(privateKey);

        return wallet.address;
    }

    async sign(privateKey: string, msg: ChainMsg): Promise<string> {
        if (!this.verifyAddress(privateKey)) {
            throw new Error('Invalid address, should start with "0x"')
        }
        const wallet = new Wallet(privateKey);
        const signature = await wallet.signTransaction(msg.toData());
        msg.sign(signature);
        return signature;
    }
}

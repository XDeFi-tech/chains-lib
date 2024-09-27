import { Signer, SignerDecorator } from '@ctrl-tech/chains-core';
// import * as ExpoTrustWallet from 'expo-trust-wallet';

@SignerDecorator(Signer.SignerType.TRUST_WALLET)
export class TrustWalletSigner extends Signer.Provider {
  getAddress(derivation) {
    throw new Error('Method not implemented.');
  }
  async sign(derivation, msg) {
    console.log('signing with TrustWallet', msg);
    const tx = await msg.buildTx();
    console.log('tx', tx);
    // const signedTx = ExpoTrustWallet.signTransaction(
    //   ExpoTrustWallet.COINS.evm,
    //   {
    //     ...tx,
    //     toAddress: tx.to,
    //     amount: '0x01',
    //     chainId: '0x01',
    //     gasLimit: '0x5208',
    //     gasPrice: '0x3b9aca00',
    //     maxFeePerGas: '0x00',
    //     maxPriorityFeePerGas: '0x00',
    //   }
    // );
    msg.sign('asdkjadjasodjoajfowjf');
  }
  verifyAddress(address) {
    return true
    // return ExpoTrustWallet.verifyAddress(address, ExpoTrustWallet.COINS.evm);
  }
}

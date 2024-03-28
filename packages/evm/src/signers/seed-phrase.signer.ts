import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { utils, Wallet } from 'ethers';

import { ChainMsg, SignatureType } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    return utils.isAddress(address);
  }

  async getPrivateKey(derivation: string) {
    const wallet = Wallet.fromMnemonic(this.key, derivation);
    return utils.isHexString(wallet.privateKey)
      ? wallet.privateKey.slice(2)
      : wallet.privateKey;
  }

  async getAddress(derivation: string): Promise<string> {
    const wallet = Wallet.fromMnemonic(this.key, derivation);
    return wallet.address;
  }

  async sign(
    msg: ChainMsg,
    derivation: string,
    signatureType: SignatureType
  ): Promise<void> {
    const wallet = Wallet.fromMnemonic(this.key, derivation);
    const txData = await msg.buildTx();
    let signature;
    if (signatureType === SignatureType.PersonalSign) {
      signature = await wallet.signMessage(txData.data);
    } else if (signatureType === SignatureType.Transaction) {
      signature = await wallet.signTransaction({
        to: txData.to,
        from: txData.from,
        nonce: txData.nonce,
        gasLimit: txData.gasLimit,
        value: txData.value,
        chainId: parseInt(txData.chainId),
        ...(txData.maxPriorityFeePerGas && {
          maxPriorityFeePerGas: txData.maxPriorityFeePerGas,
        }),
        ...(txData.maxFeePerGas && { maxFeePerGas: txData.maxFeePerGas }),
        ...(txData.gasPrice && { gasPrice: txData.gasPrice }),
        data: txData.data,
        type: txData.type,
      });
    }

    msg.sign(signature);
  }
}

export default SeedPhraseSigner;

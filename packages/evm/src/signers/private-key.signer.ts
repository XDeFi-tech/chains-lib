import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { utils, Wallet } from 'ethers';

import { ChainMsg, SignatureType } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    return utils.isAddress(address);
  }

  async getPrivateKey(): Promise<string> {
    return this.key;
  }

  async getAddress(): Promise<string> {
    const wallet = new Wallet(this.key);
    return wallet.address;
  }

  async sign(
    msg: ChainMsg,
    _derivation?: string,
    signatureType?: SignatureType
  ): Promise<void> {
    const wallet = new Wallet(this.key);
    const txData = await msg.buildTx();
    let signature;
    if (signatureType === SignatureType.Transaction) {
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
    } else if (signatureType === SignatureType.PersonalSign) {
      signature = await wallet.signMessage(txData.data);
    }

    throw new Error(signature);
    msg.sign(signature);
  }
}

export default PrivateKeySigner;

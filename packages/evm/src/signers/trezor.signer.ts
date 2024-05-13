import TrezorConnect, {
  EthereumTransaction,
  EthereumTransactionEIP1559,
} from '@trezor/connect-web';
import {
  IsTrezorInitialized,
  Signer,
  SignerDecorator,
} from '@xdefi-tech/chains-core';
import { utils } from 'ethers';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.TREZOR)
export class TrezorSigner extends Signer.TrezorProvider {
  verifyAddress(address: string): boolean {
    return utils.isAddress(address);
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Trezor device');
  }

  async getPublicKey(derivation: string) {
    throw new Error('Cannot extract public key from Trezor device');
  }

  @IsTrezorInitialized
  async getAddress(derivation: string): Promise<string> {
    const address = await TrezorConnect.ethereumGetAddress({
      path: derivation,
    });
    if (address.success) {
      return address.payload.address;
    } else {
      throw new Error('Error Getting Address: ' + address.payload.error);
    }
  }

  @IsTrezorInitialized
  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const txData = await msg.buildTx();
    let unsignedTx: EthereumTransaction | EthereumTransactionEIP1559;
    if (txData.gasPrice) {
      unsignedTx = {
        to: txData.to,
        chainId: parseInt(txData.chainId),
        nonce: txData.nonce,
        gasLimit: txData.gasLimit,
        value: txData.value,
        gasPrice: txData.gasPrice,
        data: txData.data,
      };
    } else {
      unsignedTx = {
        to: txData.to,
        chainId: parseInt(txData.chainId),
        nonce: txData.nonce,
        gasLimit: txData.gasLimit,
        value: txData.value,
        maxFeePerGas: txData.maxFeePerGas,
        maxPriorityFeePerGas: txData.maxPriorityFeePerGas,
        data: txData.data,
      };
    }

    const signatureResponse = await TrezorConnect.ethereumSignTransaction({
      path: derivation,
      transaction: unsignedTx,
    });

    if (signatureResponse.success === true) {
      const signature = {
        r: signatureResponse.payload.r,
        s: signatureResponse.payload.s,
        v: parseInt(signatureResponse.payload.v),
      };

      const signedTransaction = utils.serializeTransaction(
        {
          ...unsignedTx,
          nonce: parseInt(unsignedTx.nonce),
          value: utils.hexlify(unsignedTx.value),
          type: txData.type,
        },
        signature
      );

      msg.sign(signedTransaction);
    }
  }
}

export default TrezorSigner;

import TrezorConnect, {
  EthereumTransaction,
  EthereumTransactionEIP1559,
} from '@trezor/connect-web';
import transformTypedDataPlugin from '@trezor/connect-plugin-ethereum';
import {
  IsTrezorInitialized,
  Signer,
  SignerDecorator,
} from '@xdefi-tech/chains-core';
import { utils } from 'ethers';

import { ChainMsg, EIP712Data, Signature } from '../msg';

@SignerDecorator(Signer.SignerType.TREZOR)
export class TrezorSigner extends Signer.TrezorProvider {
  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Trezor device');
  }

  async getPublicKey(_derivation: string) {
    throw new Error('Cannot extract public key from Trezor device');
  }

  @IsTrezorInitialized
  async getAddress(derivation: string): Promise<string> {
    const address = await TrezorConnect.ethereumGetAddress({
      path: derivation,
    } as any);
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
        value: txData.value === '0x0' || !txData.value ? '0x00' : txData.value,
        gasPrice: txData.gasPrice,
        data: txData.data,
      } as EthereumTransaction;
    } else {
      unsignedTx = {
        to: txData.to,
        chainId: parseInt(txData.chainId),
        nonce: txData.nonce,
        gasLimit: txData.gasLimit,
        value: txData.value === '0x0' || !txData.value ? '0x00' : txData.value,
        maxFeePerGas: txData.maxFeePerGas,
        maxPriorityFeePerGas: txData.maxPriorityFeePerGas,
        data: txData.data,
      } as EthereumTransactionEIP1559;
    }

    const signatureResponse = await TrezorConnect.ethereumSignTransaction({
      path: derivation,
      transaction: unsignedTx,
    } as any);

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
    } else {
      throw new Error(
        'Error signing transaction: ' + signatureResponse.payload.error
      );
    }
  }

  // signTypedData (v4): Signs a typed data message. Returns (async) the signature as v, r, s object.
  async signTypedData(
    derivation: string,
    domain: EIP712Data['domain'],
    types: EIP712Data['types'],
    primaryType: EIP712Data['primaryType'],
    message: EIP712Data['message']
  ): Promise<Signature | any> {
    const { message_hash, domain_separator_hash } = transformTypedDataPlugin(
      {
        domain,
        types,
        primaryType,
        message,
      },
      true
    );
    const result = await TrezorConnect.ethereumSignTypedData({
      path: derivation,
      data: {
        domain,
        types,
        primaryType,
        message,
      },
      metamask_v4_compat: true,
      message_hash: message_hash ?? undefined,
      domain_separator_hash: domain_separator_hash ?? undefined,
    });

    if (result.success) {
      return result.payload;
    } else {
      throw new Error(result.payload.error);
    }
  }

  /**
   * Sign a personal message
   * @param message - The message to be signed
   * @param derivation - The derivation path
   * @param hex - Whether the message is in hex format
   * @returns The signature (r, s, v)
   */
  async signPersonalMessage(
    message: string,
    derivation: string,
    hex = false
  ): Promise<Signature | any> {
    const result = await TrezorConnect.ethereumSignMessage({
      path: derivation,
      message,
      hex,
    } as any);

    if (result.success) {
      return result.payload;
    } else {
      throw new Error(result.payload.error);
    }
  }
}

export default TrezorSigner;

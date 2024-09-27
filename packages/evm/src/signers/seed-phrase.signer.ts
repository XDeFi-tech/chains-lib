import { Signer, SignerDecorator } from '@ctrl-tech/chains-core';
import { utils, Wallet } from 'ethers';
import EthCrypto from 'eth-crypto';

import { ChainMsg, EvmTypedData, SignatureType, EncryptedObject } from '../msg';

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

  async getPublicKey(derivation: string): Promise<string> {
    const wallet = Wallet.fromMnemonic(this.key, derivation);
    return wallet.publicKey;
  }

  async sign(
    msg: ChainMsg,
    derivation: string,
    signatureType: SignatureType = SignatureType.Transaction
  ): Promise<void> {
    const wallet = Wallet.fromMnemonic(this.key, derivation);
    const txData = await msg.buildTx();
    let signature;
    if (signatureType === SignatureType.PersonalSign) {
      signature = await wallet.signMessage(txData.data);
    } else if (signatureType === SignatureType.SignTypedData) {
      if (
        !msg.toData().typedData ||
        typeof msg.toData().typedData !== 'object'
      ) {
        throw new Error('Invalid Typed Data Provided');
      }

      const typedData = msg.toData().typedData as EvmTypedData;
      signature = await wallet._signTypedData(
        typedData.domain,
        typedData.fields,
        typedData.values
      );
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

  // EIP 1024: Public Key Management

  // recover signature: Recovers the signers address from the signature.
  async recover(signature: string, message: string): Promise<string> {
    const signer = EthCrypto.recover(
      signature,
      EthCrypto.hash.keccak256(message)
    ); // signed message hash
    return signer;
  }

  // recoverPublicKey: Recovers the signers publicKey from the signature.
  async recoverPublicKey(signature: string, message: string): Promise<string> {
    const signer = EthCrypto.recoverPublicKey(
      signature,
      EthCrypto.hash.keccak256(message)
    ); // signed message hash
    return signer;
  }

  // encryptWithPublicKey: Encrypts a message using the provided public key. Returns (async) the encrypted data as object with hex-strings.
  async encryptWithPublicKey(
    pubKey: string, // The public key used for encryption.
    message: string // The message to be encrypted.
  ): Promise<EncryptedObject> {
    const encrypted = EthCrypto.encryptWithPublicKey(pubKey, message);
    return encrypted;
  }

  // signTypedData (v4): Signs a typed data message. Returns (async) the signature as string
  async signTypedData(
    derivation: string,
    domain: EvmTypedData['domain'],
    types: EvmTypedData['fields'],
    value: EvmTypedData['values']
  ): Promise<string> {
    const wallet = Wallet.fromMnemonic(this.key, derivation);
    const signature = await wallet._signTypedData(domain, types, value);

    return signature;
  }
}

export default SeedPhraseSigner;

import App from '@ledgerhq/hw-app-eth';
import ledgerService from '@ledgerhq/hw-app-eth/lib/services/ledger';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { ethers, utils, UnsignedTransaction } from 'ethers';
import EthCrypto from 'eth-crypto';

import { ChainMsg, EncryptedObject, EIP712Data, Signature } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Ledger device');
  }

  async getAddress(derivation: string): Promise<string> {
    const app = new App(this.transport as Transport);
    const address = await app.getAddress(derivation);

    return address.address;
  }

  async getPublicKey(derivation: string): Promise<string> {
    const app = new App(this.transport as Transport);
    const address = await app.getAddress(derivation);

    return address.publicKey;
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const app = new App(this.transport as Transport);
    const txData = await msg.buildTx();
    const unsignedTx: UnsignedTransaction = {
      to: txData.to,
      chainId: parseInt(txData.chainId),
      nonce: Number(txData.nonce),
      gasLimit: txData.gasLimit,
      value: txData.value,
      ...(txData.maxPriorityFeePerGas && {
        maxPriorityFeePerGas: txData.maxPriorityFeePerGas,
      }),
      ...(txData.maxFeePerGas && { maxFeePerGas: txData.maxFeePerGas }),
      ...(txData.gasPrice && { gasPrice: txData.gasPrice }),
      data: txData.data,
      type: txData.type,
    };
    const rawTx = ethers.utils.serializeTransaction(unsignedTx).substring(2);
    const resolution = await ledgerService.resolveTransaction(rawTx, {}, {});
    const rawSig = await app.signTransaction(derivation, rawTx, resolution);
    const sig = {
      v: ethers.BigNumber.from('0x' + rawSig.v).toNumber(),
      r: '0x' + rawSig.r,
      s: '0x' + rawSig.s,
    };

    const signedTransaction = ethers.utils.serializeTransaction(
      unsignedTx,
      sig
    );
    msg.sign(signedTransaction);
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

  // signTypedData (v4): Signs a typed data message. Returns (async) the signature as v, r, s object.
  async signTypedData(
    derivation: string,
    domain: EIP712Data['domain'],
    types: EIP712Data['types'],
    primaryType: EIP712Data['primaryType'],
    message: EIP712Data['message']
  ): Promise<Signature> {
    const app = new App(this.transport as Transport);
    const typedData = {
      types,
      domain,
      primaryType,
      message,
    };
    const signature = await app.signEIP712Message(derivation, typedData);
    return signature;
  }
}

export default LedgerSigner;

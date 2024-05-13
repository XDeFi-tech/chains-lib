import App from '@ledgerhq/hw-app-eth';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { utils } from 'ethers';
import EthCrypto from 'eth-crypto';

import { ChainMsg, EncryptedObject } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
  }

  verifyAddress(address: string): boolean {
    return utils.isAddress(address);
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
    const unsignedTx = {
      to: txData.to,
      from: txData.from,
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

    const rawTx = utils
      .hexlify(Buffer.from(JSON.stringify(unsignedTx)))
      .slice(2);
    const signature = await app.signTransaction(derivation, rawTx);
    const signedTransaction = utils.hexlify(
      Buffer.from(JSON.stringify({ ...unsignedTx, ...signature }))
    );
    msg.sign('0x' + signedTransaction);
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
}

export default LedgerSigner;

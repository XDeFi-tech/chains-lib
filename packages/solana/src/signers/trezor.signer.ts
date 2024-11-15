import TrezorConnect from '@trezor/connect-web';
import {
  IsTrezorInitialized,
  MsgEncoding,
  Signer,
  SignerDecorator,
} from '@xdefi-tech/chains-core';
import bs58 from 'bs58';
import {
  PublicKey,
  VersionedTransaction,
  Transaction as SolanaTransaction,
} from '@solana/web3.js';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.TREZOR)
export class TrezorSigner extends Signer.TrezorProvider {
  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Trezor device');
  }

  private async _getPublicKey(derivation: string) {
    const result = await TrezorConnect.solanaGetPublicKey({
      path: derivation,
    } as any);
    if (result.success) {
      return new PublicKey(
        Buffer.from((result.payload as any).publicKey, 'hex')
      );
    } else {
      throw new Error('Error Getting Address: ' + result.payload.error);
    }
  }

  @IsTrezorInitialized
  async getAddress(derivation: string): Promise<string> {
    const pubKey = await this._getPublicKey(derivation);
    return pubKey.toBase58();
  }

  @IsTrezorInitialized
  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const { tx, encoding } = await msg.buildTx();
    let txBuffer;
    let serializedTx = null;
    switch (encoding) {
      case MsgEncoding.base58:
      case MsgEncoding.base64:
        txBuffer = (tx as VersionedTransaction).message.serialize() as Buffer;
        break;
      case MsgEncoding.object:
        txBuffer = (tx as SolanaTransaction).serializeMessage();
        break;
      default:
        throw new Error('Unsupported encoding');
    }
    const result = await TrezorConnect.solanaSignTransaction({
      serializedTx: txBuffer.toString('hex'),
      path: derivation,
    } as any);
    if (result.success) {
      const signature = bs58.encode(
        Buffer.from(result.payload.signature, 'hex')
      );
      const bufferSig = Buffer.from(result.payload.signature, 'hex');
      const pubKey = await this._getPublicKey(derivation);
      tx.addSignature(pubKey, bufferSig);
      if (encoding === MsgEncoding.object) serializedTx = tx.serialize();
      else serializedTx = Buffer.from(tx.serialize());
      msg.sign({
        pubKey: pubKey,
        sig: signature,
        serializedTx,
      });
    } else {
      throw new Error(result.payload.error);
    }
  }

  @IsTrezorInitialized
  async signMessage(_message: string, _derivation: string): Promise<void> {
    throw new Error('Not supported from Trezor');
  }
}

export default TrezorSigner;

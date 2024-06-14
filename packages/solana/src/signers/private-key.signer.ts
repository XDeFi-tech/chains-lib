import { MsgEncoding, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import {
  Keypair,
  PublicKey,
  Transaction as SolanaTransaction,
  VersionedTransaction,
} from '@solana/web3.js';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

import { ChainMsg } from '../msg';
import { SolanaSignature } from '../types';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      const publicKey = new PublicKey(address);
      return publicKey.toBase58() === address;
    } catch (error) {
      return false;
    }
  }

  async getPrivateKey(_derivation: string): Promise<string> {
    return this.key;
  }

  async getAddress(_derivation: string): Promise<string> {
    const keypair = Keypair.fromSecretKey(Buffer.from(this.key, 'hex'));
    return keypair.publicKey.toBase58();
  }

  async sign(msg: ChainMsg): Promise<void> {
    const { tx, encoding } = await msg.buildTx();
    const account = Keypair.fromSecretKey(Buffer.from(this.key, 'hex'));
    let serializedTx = null;
    switch (encoding) {
      case MsgEncoding.object:
        const transaction = tx as SolanaTransaction;
        transaction.sign(account);
        serializedTx = transaction.serialize();
        break;
      case MsgEncoding.base64:
      case MsgEncoding.base58:
        const versionedTransaction = tx as VersionedTransaction;
        versionedTransaction.sign([account]);
        serializedTx = Buffer.from(versionedTransaction.serialize());
        break;
      default:
        throw new Error('Invalid encoding for solana transaction');
    }

    if (!serializedTx) {
      throw new Error('Failed to serialize transaction');
    }

    msg.sign(serializedTx);
  }

  async signMessage(msg: ChainMsg): Promise<SolanaSignature> {
    const message = msg.toData();
    const account = Keypair.fromSecretKey(Buffer.from(this.key, 'hex'));
    const decoded = bs58.decode(message.data);
    const signature = nacl.sign.detached(decoded, account.secretKey);

    return {
      pubKey: account.publicKey.toString(),
      sig: bs58.encode(signature),
    };
  }
}

export default PrivateKeySigner;

import { MsgEncoding, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import {
  Keypair,
  PublicKey,
  Transaction as SolanaTransaction,
  VersionedTransaction,
} from '@solana/web3.js';

import { ChainMsg } from '../msg';

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
}

export default PrivateKeySigner;

import { MsgEncoding, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import {
  Keypair,
  PublicKey,
  Transaction as SolanaTransaction,
  VersionedTransaction,
} from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      const publicKey = new PublicKey(address);
      return publicKey.toBase58() === address;
    } catch (error) {
      return false;
    }
  }

  async getPrivateKey(derivation: string): Promise<string> {
    if (!this.key) {
      throw new Error('No seed phrase set!');
    }
    const seed = await bip39.mnemonicToSeed(this.key, '');
    const seedBuffer = Buffer.from(seed).toString('hex');
    const derivedSeed = derivePath(derivation, seedBuffer).key;
    const secretKey = Keypair.fromSeed(Uint8Array.from(derivedSeed)).secretKey;
    return Buffer.from(secretKey).toString('hex');
  }

  async getAddress(derivation: string): Promise<string> {
    const keypair = Keypair.fromSecretKey(
      Buffer.from(await this.getPrivateKey(derivation), 'hex')
    );
    return keypair.publicKey.toBase58();
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const { tx, encoding } = await msg.buildTx();
    const account = Keypair.fromSecretKey(
      Buffer.from(await this.getPrivateKey(derivation), 'hex')
    );
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

export default SeedPhraseSigner;

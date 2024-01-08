import { MsgEncoding, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import {
  Keypair,
  PublicKey,
  Transaction as SolanaTransaction,
  VersionedTransaction,
} from '@solana/web3.js';
import * as bip39 from 'bip39';
import * as HDKey from 'hdkey';

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
    if (!this._key) {
      throw new Error('No seed phrase set!');
    }

    const seed = bip39.mnemonicToSeedSync(this._key, '');
    const hdKey = HDKey.fromMasterSeed(seed);
    const child = hdKey.derive(derivation);
    const keypair = Keypair.fromSeed(child.privateKey);
    return Buffer.from(keypair.secretKey).toString('hex');
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
    switch (encoding) {
      case MsgEncoding.object:
        const transaction = tx as SolanaTransaction;
        transaction.sign(account);
        break;
      case MsgEncoding.base64:
        const versionedTransaction = tx as VersionedTransaction;
        versionedTransaction.sign([account]);
        break;
      default:
        throw new Error('Invalid encoding for solana transaction');
    }

    msg.sign(tx.serialize());
  }
}

export default SeedPhraseSigner;
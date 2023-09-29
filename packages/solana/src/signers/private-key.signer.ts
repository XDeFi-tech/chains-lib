import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { Keypair, PublicKey } from '@solana/web3.js';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      new PublicKey(address);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getPrivateKey(_derivation: string): Promise<string> {
    return this.key;
  }

  async getAddress(_derivation: string): Promise<string> {
    if (!this.verifyAddress(this.key)) {
      throw new Error('Invalid address');
    }
    const keypair = Keypair.fromSecretKey(Buffer.from(this.key, 'hex'));
    return keypair.publicKey.toBase58();
  }

  async sign(msg: ChainMsg): Promise<void> {
    const { tx } = await msg.buildTx();
    tx.sign(Keypair.fromSecretKey(Buffer.from(this.key, 'hex')));
    msg.sign(tx.serialize());
  }
}

export default PrivateKeySigner;

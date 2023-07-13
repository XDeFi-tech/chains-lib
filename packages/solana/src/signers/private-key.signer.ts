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

  async getAddress(privateKey: string): Promise<string> {
    if (!this.verifyAddress(privateKey)) {
      throw new Error('Invalid address');
    }
    const keypair = Keypair.fromSecretKey(Buffer.from(privateKey, 'hex'));
    return keypair.publicKey.toBase58();
  }

  async sign(privateKey: string, msg: ChainMsg): Promise<void> {
    const tx = await msg.buildTx();
    tx.sign(Keypair.fromSecretKey(Buffer.from(privateKey, 'hex')));
    msg.sign(tx.serialize());
  }
}

export default PrivateKeySigner;

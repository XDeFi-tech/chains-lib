import Solana from '@ledgerhq/hw-app-solana';
import { PublicKey, Transaction as SolanaTransaction } from '@solana/web3.js';
import Transport from '@ledgerhq/hw-transport-webhid';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      const publicKey = new PublicKey(address);
      return publicKey.toBase58() === address;
    } catch (error) {
      return false;
    }
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Ledger device');
  }

  async getAddress(derivation: string): Promise<string> {
    const transport = await Transport.create();
    try {
      const app = new Solana(transport);
      const addressBuffer = await app.getAddress(derivation);
      return new PublicKey(addressBuffer.address).toBase58();
    } finally {
      transport.close();
    }
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const transport = await Transport.create();
    try {
      const app = new Solana(transport);
      const { tx } = await msg.buildTx();
      const transaction = tx as SolanaTransaction;
      const signedTx = await app.signTransaction(
        derivation,
        transaction.serializeMessage()
      );

      const addressBuffer = await app.getAddress(derivation);
      transaction.addSignature(
        new PublicKey(addressBuffer.address),
        signedTx.signature
      );

      msg.sign(transaction.serialize());
    } finally {
      transport.close();
    }
  }
}

export default LedgerSigner;

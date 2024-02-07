import Solana from '@ledgerhq/hw-app-solana';
import { PublicKey, Transaction as SolanaTransaction } from '@solana/web3.js';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
  }

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
    const app = new Solana(this.transport as Transport);
    const addressBuffer = await app.getAddress(derivation);
    return new PublicKey(addressBuffer.address).toBase58();
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const app = new Solana(this.transport as Transport);
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
  }
}

export default LedgerSigner;

import Solana from '@ledgerhq/hw-app-solana';
import { PublicKey, Transaction as SolanaTransaction } from '@solana/web3.js';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport | null;
  private isInternalTransport: boolean;

  constructor(transport?: Transport) {
    super();
    this.transport = null;

    if (transport) {
      this.transport = transport;
      this.isInternalTransport = false;
    } else {
      this.isInternalTransport = true;
      TransportWebHID.create().then((t) => {
        this.transport = t as Transport;
      });
    }
  }

  async initTransport() {
    this.transport = (await TransportWebHID.create()) as Transport;
    this.isInternalTransport = true;
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
    try {
      if (!this.transport) {
        await this.initTransport();
      }
      const app = new Solana(this.transport as Transport);
      const addressBuffer = await app.getAddress(derivation);
      return new PublicKey(addressBuffer.address).toBase58();
    } finally {
      if (this.isInternalTransport && this.transport) {
        this.transport.close();
        this.transport = null;
      }
    }
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    try {
      if (!this.transport) {
        await this.initTransport();
      }
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
    } finally {
      if (this.isInternalTransport && this.transport) {
        this.transport.close();
        this.transport = null;
      }
    }
  }
}

export default LedgerSigner;

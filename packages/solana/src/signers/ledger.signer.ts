import Solana from '@ledgerhq/hw-app-solana';
import {
  PublicKey,
  Transaction as SolanaTransaction,
  VersionedTransaction,
} from '@solana/web3.js';
import Transport from '@ledgerhq/hw-transport';
import { MsgEncoding, Signer, SignerDecorator } from '@xdefi-tech/chains-core';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
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
    const { tx, encoding } = await msg.buildTx();

    let signedTx;
    switch (encoding) {
      case MsgEncoding.object:
        const transaction = tx as SolanaTransaction;
        signedTx = await app.signTransaction(
          derivation,
          transaction.serializeMessage()
        );
        break;
      case MsgEncoding.base64:
      case MsgEncoding.base58:
        const versionedTransaction = tx as VersionedTransaction;
        signedTx = await app.signTransaction(
          derivation,
          Buffer.from(versionedTransaction.serialize())
        );
        break;
      default:
        throw new Error('Invalid encoding for solana transaction');
    }

    const addressBuffer = await app.getAddress(derivation);
    tx.addSignature(new PublicKey(addressBuffer.address), signedTx.signature);

    msg.sign(tx.serialize());
  }
}

export default LedgerSigner;

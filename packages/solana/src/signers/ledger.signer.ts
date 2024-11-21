import Solana from '@ledgerhq/hw-app-solana';
import {
  PublicKey,
  Transaction as SolanaTransaction,
  VersionedTransaction,
} from '@solana/web3.js';
import Transport from '@ledgerhq/hw-transport';
import { MsgEncoding, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import bs58 from 'bs58';

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
    const addressBuffer = await app.getAddress(derivation);
    const { tx, encoding } = await msg.buildTx();

    let signedTx;
    let serializedTx = null;
    const pubKey = new PublicKey(addressBuffer.address);
    switch (encoding) {
      case MsgEncoding.object:
        const transaction = tx as SolanaTransaction;
        signedTx = await app.signTransaction(
          derivation,
          transaction.serializeMessage()
        );
        transaction.addSignature(pubKey, signedTx.signature);
        serializedTx = transaction.serialize();
        break;
      case MsgEncoding.base64:
      case MsgEncoding.base58:
        const versionedTransaction = tx as VersionedTransaction;
        const blockhash = await msg.getLatestBlockhash();
        versionedTransaction.message.recentBlockhash = blockhash;
        signedTx = await app.signTransaction(
          derivation,
          Buffer.from(versionedTransaction.message.serialize())
        );
        versionedTransaction.addSignature(pubKey, signedTx.signature);
        serializedTx = Buffer.from(versionedTransaction.serialize());
        break;
      default:
        throw new Error('Invalid encoding for solana transaction');
    }

    const signature = bs58.encode(signedTx.signature);

    msg.sign({
      pubKey,
      sig: signature,
      serializedTx,
    });
  }

  async signMessage(
    _message: ChainMsg,
    _derivation: string
  ): Promise<{
    pubKey: PublicKey;
    sig: string;
  }> {
    throw new Error('Unsupported sign message for ledger');
  }
}

export default LedgerSigner;

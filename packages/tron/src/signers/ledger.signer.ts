import Transport from '@ledgerhq/hw-transport';
import Trx from '@ledgerhq/hw-app-trx';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
  }

  async getAddress(derivation: string): Promise<string> {
    const trx = new Trx(this.transport as Transport);
    const address = await trx.getAddress(derivation.replace('m/', ''));

    return address.address;
  }

  async sign(msg: ChainMsg, derivation: string) {
    const trx = new Trx(this.transport as Transport);
    const tx = await msg.buildTx();
    try {
      const signedTx = await trx.signTransaction(
        derivation.replace('m/', ''),
        tx.raw_data_hex,
        []
      );
      tx.signature = [signedTx];
    } catch (e: any) {
      if (/Too many bytes to encode/.test(e.message)) {
        const signedTx = await trx.signTransactionHash(
          derivation.replace('m/', ''),
          tx.txID
        );
        tx.signature = [signedTx];
      } else {
        throw e;
      }
    }

    msg.sign(tx);
  }

  async signMessage() {
    throw new Error('Ledger wallet does not support signMessage');
  }

  async signMessageV2(message: string, derivation: string) {
    const trx = new Trx(this.transport as Transport);
    const signature = await trx.signPersonalMessage(
      derivation.replace('m/', ''),
      Buffer.from(message).toString('hex')
    );

    return signature;
  }

  async signTransaction(
    derivation: string,
    txHex: string,
    tokenSignature = [] as string[]
  ) {
    const trx = new Trx(this.transport as Transport);
    const signature = await trx.signTransaction(
      derivation.replace('m/', ''),
      txHex,
      tokenSignature
    );

    return signature;
  }
}

export default LedgerSigner;

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
    const address = await trx.getAddress(derivation);

    return address.address;
  }

  async sign(msg: ChainMsg, derivation: string) {
    const trx = new Trx(this.transport as Transport);
    const tx = await msg.buildTx();

    const signedTx = await trx.signTransaction(derivation, tx.raw_data_hex, []);

    tx.signature = [signedTx];

    msg.sign(tx);
  }
}

export default LedgerSigner;

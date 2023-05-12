import App from '@ledgerhq/hw-app-eth';
import Transport from '@ledgerhq/hw-transport-webhid';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { utils } from 'ethers';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    return utils.isAddress(address);
  }

  async getAddress(derivation: string): Promise<string> {
    const transport = await Transport.create();
    const app = new App(transport);

    const address = await app.getAddress(derivation);
    transport.close();

    return address.address;
  }

  async sign(derivation: string, msg: ChainMsg): Promise<void> {
    const transport = await Transport.create();
    const app = new App(transport);
    const unsignedTx = await msg.buildTx();
    const signature = await app.signTransaction(
      derivation,
      utils.hexlify(Buffer.from(JSON.stringify(unsignedTx)))
    );
    const signedTransaction = utils.hexlify(
      Buffer.from(JSON.stringify({ ...unsignedTx, ...signature }))
    );
    msg.sign('0x' + signedTransaction);
    transport.close();
  }
}

export default LedgerSigner;

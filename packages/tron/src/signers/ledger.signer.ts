import Transport from '@ledgerhq/hw-transport-webhid';
import Trx from '@ledgerhq/hw-app-trx';
import { Chain, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TronWeb from 'tronweb';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  verifyAddress(address: string, manifest: Chain.Manifest): boolean {
    const tronWeb = new TronWeb({
      fullHost: manifest.rpcURL,
    });

    return tronWeb.isAddress(address);
  }

  async getAddress(derivation: string): Promise<string> {
    const transport = await Transport.create();
    try {
      const trx = new Trx(transport);

      const address = await trx.getAddress(derivation);

      return address.address;
    } catch (e) {
      throw e;
    } finally {
      await transport.close();
    }
  }

  async sign(msg: ChainMsg, derivation: string) {
    const transport = await Transport.create();
    try {
      const trx = new Trx(transport);
      const tx = await msg.buildTx();

      const signedTx = await trx.signTransaction(
        derivation,
        tx.raw_data_hex,
        []
      );

      tx.signature = [signedTx];

      msg.sign(tx);
    } catch (e) {
      throw e;
    } finally {
      await transport.close();
    }
  }
}

export default LedgerSigner;

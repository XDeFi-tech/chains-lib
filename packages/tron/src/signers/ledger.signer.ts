import Transport from '@ledgerhq/hw-transport';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import Trx from '@ledgerhq/hw-app-trx';
import { Chain, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TronWeb from 'tronweb';

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

  verifyAddress(address: string, manifest: Chain.Manifest): boolean {
    const tronWeb = new TronWeb({
      fullHost: manifest.rpcURL,
    });

    return tronWeb.isAddress(address);
  }

  async getAddress(derivation: string): Promise<string> {
    try {
      if (!this.transport) {
        await this.initTransport();
      }
      const trx = new Trx(this.transport as Transport);

      const address = await trx.getAddress(derivation);

      return address.address;
    } catch (e) {
      throw e;
    } finally {
      if (this.isInternalTransport && this.transport) {
        this.transport.close();
        this.transport = null;
      }
    }
  }

  async sign(msg: ChainMsg, derivation: string) {
    try {
      if (!this.transport) {
        await this.initTransport();
      }
      const trx = new Trx(this.transport as Transport);
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
      if (this.isInternalTransport && this.transport) {
        this.transport.close();
        this.transport = null;
      }
    }
  }
}

export default LedgerSigner;

import { LedgerSigner as LedgerApp } from '@cosmjs/ledger-amino';
import { stringToPath } from '@cosmjs/crypto';
import { fromBech32 } from '@cosmjs/encoding';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { SigningStargateClient } from '@cosmjs/stargate';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';

import { ChainMsg } from '../msg';
import { STARGATE_CLIENT_OPTIONS } from '../utils';

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

  verifyAddress(address: string, requiredPrefix: string): boolean {
    try {
      const { prefix, data } = fromBech32(address);
      if (prefix !== requiredPrefix) {
        return false;
      }
      return data.length === 20;
    } catch {
      return false;
    }
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Ledger device');
  }

  async getAddress(derivation: string, prefix: string): Promise<string> {
    try {
      if (!this.transport) {
        await this.initTransport();
      }
      const hdPath = stringToPath(derivation);
      const app = new LedgerApp(this.transport as Transport, {
        testModeAllowed: true,
        hdPaths: [hdPath],
        prefix,
      });

      const [{ address }] = await app.getAccounts();

      return address;
    } finally {
      if (this.isInternalTransport && this.transport) {
        this.transport.close();
        this.transport = null;
      }
    }
  }

  async sign(msg: ChainMsg, derivation: string, prefix: string): Promise<void> {
    try {
      if (!this.transport) {
        await this.initTransport();
      }
      if (!derivation.startsWith('m/')) {
        derivation = 'm/' + derivation;
      }

      const hdPath = stringToPath(derivation);
      const app = new LedgerApp(this.transport as Transport, {
        testModeAllowed: true,
        hdPaths: [hdPath],
        prefix,
      });

      const tendermintClient = await Tendermint34Client.connect(
        msg.provider.manifest.rpcURL
      );

      const client = await SigningStargateClient.createWithSigner(
        tendermintClient,
        app,
        STARGATE_CLIENT_OPTIONS
      );

      /* eslint-enable */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const txData = await msg.buildTx();
      const [{ address: senderAddress }] = await app.getAccounts();
      const signedTx = await client.sign(
        senderAddress,
        txData.msgs,
        txData.fee,
        txData.memo
      );
      const txBytes = TxRaw.encode(signedTx as TxRaw).finish();
      const rawTx = Buffer.from(txBytes).toString('base64');
      msg.sign(rawTx);
    } finally {
      if (this.isInternalTransport && this.transport) {
        this.transport.close();
        this.transport = null;
      }
    }
  }
}

export default LedgerSigner;

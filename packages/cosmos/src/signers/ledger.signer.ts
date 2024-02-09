import { LedgerSigner as LedgerApp } from '@cosmjs/ledger-amino';
import { stringToPath } from '@cosmjs/crypto';
import { fromBech32 } from '@cosmjs/encoding';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { SigningStargateClient } from '@cosmjs/stargate';

import { ChainMsg } from '../msg';
import { STARGATE_CLIENT_OPTIONS } from '../utils';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
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
    const hdPath = stringToPath(derivation);
    const app = new LedgerApp(this.transport as Transport, {
      testModeAllowed: true,
      hdPaths: [hdPath],
      prefix,
    });

    const [{ address }] = await app.getAccounts();

    return address;
  }

  async sign(msg: ChainMsg, derivation: string, prefix: string): Promise<void> {
    if (!derivation.startsWith('m/')) {
      derivation = 'm/' + derivation;
    }

    const hdPath = stringToPath(derivation);
    const app = new LedgerApp(this.transport as Transport, {
      testModeAllowed: true,
      hdPaths: [hdPath],
      prefix,
    });

    const client = await SigningStargateClient.connectWithSigner(
      msg.provider.manifest.rpcURL,
      app,
      STARGATE_CLIENT_OPTIONS
    );

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
  }
}

export default LedgerSigner;

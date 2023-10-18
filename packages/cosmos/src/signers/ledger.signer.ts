import { LedgerSigner as LedgerApp } from '@cosmjs/ledger-amino';
import { stringToPath } from '@cosmjs/crypto';
import { fromBech32 } from '@cosmjs/encoding';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import Transport from '@ledgerhq/hw-transport-webhid';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { SigningStargateClient } from '@cosmjs/stargate';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
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
    const transport = await Transport.create();
    try {
      const hdPath = stringToPath(derivation);
      const app = new LedgerApp(transport, {
        testModeAllowed: true,
        hdPaths: [hdPath],
        prefix,
      });

      const [{ address }] = await app.getAccounts();

      return address;
    } finally {
      transport.close();
    }
  }

  async sign(msg: ChainMsg, derivation: string, prefix: string): Promise<void> {
    const transport = await Transport.create();
    try {
      if (!derivation.startsWith('m/')) {
        derivation = 'm/' + derivation;
      }

      const hdPath = stringToPath(derivation);
      const app = new LedgerApp(transport, {
        testModeAllowed: true,
        hdPaths: [hdPath],
        prefix,
      });

      const tendermintClient = await Tendermint34Client.connect(
        msg.provider.manifest.rpcURL
      );

      const client = await SigningStargateClient.createWithSigner(
        tendermintClient,
        app
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
      transport.close();
    }
  }
}

export default LedgerSigner;

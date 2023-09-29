import Transport from '@ledgerhq/hw-transport-webhid';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { SigningStargateClient, GasPrice } from '@cosmjs/stargate';
import { LedgerSigner as CosmosLedgerSigner } from '@cosmjs/ledger-amino';
import { stringToPath } from '@cosmjs/crypto';
import { bech32 } from 'bech32';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      const result = bech32.decode(address);
      return result.prefix === 'cosmos' && result.words.length === 32;
    } catch (err) {
      return false;
    }
  }

  async getAddress(derivation: string): Promise<string> {
    const transport = await Transport.create();
    try {
      const signer = new CosmosLedgerSigner(transport, {
        testModeAllowed: true,
        hdPaths: [stringToPath(derivation)],
      });
      const [{ address }] = await signer.getAccounts();

      return address;
    } catch (err) {
      throw err;
    } finally {
      transport.close();
    }
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const transport = await Transport.create();
    try {
      const signer = new CosmosLedgerSigner(transport, {
        testModeAllowed: true,
        hdPaths: [stringToPath(derivation)],
        prefix: msg.provider?.manifest.chain,
      });
      const msgData = msg.toData();
      const txData = await msg.buildTx();
      const client = await SigningStargateClient.connectWithSigner(
        msg.provider?.manifest.chain as string,
        signer,
        {
          broadcastTimeoutMs: 600_000,
          broadcastPollIntervalMs: 5_000,
          gasPrice: GasPrice.fromString(
            `2500${msg.provider?.manifest.chainSymbol}`
          ),
        }
      );
      const signature = await client.sign(
        msgData.from,
        txData.msgs.map((msg: any) => ({
          typeUrl: '/cosmos.tx.v1beta1.TxBody',
          value: msg,
        })),
        txData.fee,
        txData.memo || ''
      );
      msg.sign(signature);
    } catch (err) {
      throw err;
    } finally {
      transport.close();
    }
  }
}

export default LedgerSigner;

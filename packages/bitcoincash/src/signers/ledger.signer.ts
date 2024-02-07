import { CreateTransactionArg } from '@ledgerhq/hw-app-btc/createTransaction';
import BtcOld from '@ledgerhq/hw-app-btc';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator, utils } from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import * as Bitcoin from 'bitcoinjs-lib';
import { isValidAddress, toLegacyAddress } from 'bchaddrjs';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  network = {
    hashGenesisBlock:
      '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
    port: 8333,
    portRpc: 8332,
    protocol: { magic: 3908297187 },
    seedsDns: [
      'seed.bitcoinabc.org',
      'seed-abc.bitcoinforks.org',
      'btccash-seeder.bitcoinunlimited.info',
      'seed.bitprim.org',
      'seed.deadalnix.me',
      'seeder.criptolayer.net',
    ],
    versions: {
      bip32: { private: 76066276, public: 76067358 },
      bip44: 145,
      private: 128,
      public: 0,
      scripthash: 5,
    },
    name: 'BitcoinCash',
    per1: 100000000,
    unit: 'BCH',
    testnet: false,
    messagePrefix: '\u0019BitcoinCash Signed Message:\n',
    bip32: { public: 76067358, private: 76066276 },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
    dustThreshold: null,
    bech32: 'bch',
  };
  verifyAddress(address: string): boolean {
    if (isValidAddress(address)) {
      return true;
    } else {
      return false;
    }
  }

  async getAddress(
    derivation: string,
    type: 'legacy' | 'p2sh' | 'bech32' | 'bech32m' | 'cashaddr' = 'cashaddr'
  ): Promise<string> {
    const transport = await Transport.create();
    try {
      const app = new BtcOld({ transport, currency: 'abc' });

      const address = await app.getWalletPublicKey(derivation, {
        format: type,
      });

      return address.bitcoinAddress;
    } catch (e) {
      throw e;
    } finally {
      await transport.close();
    }
  }

  async sign(msg: ChainMsg, derivation: string) {
    const transport = await Transport.create();
    try {
      const app = new BtcOld({ transport, currency: 'bch' });
      const { inputs, outputs, from } = await msg.buildTx();
      const psbt = new Bitcoin.Psbt({ network: this.network });

      inputs.forEach((utxo: UTXO) => {
        psbt.addInput({
          hash: utxo.hash,
          index: utxo.index,
          witnessUtxo: utxo.witnessUtxo,
        });
      });

      outputs.forEach((output: any) => {
        if (!output.address) {
          output.address = from;
        }

        psbt.addOutput({
          script: Bitcoin.address.toOutputScript(
            toLegacyAddress(output.address),
            this.network
          ),
          value: output.value,
        });
      });

      const outputWriter = new utils.BufferWriter();

      outputWriter.writeVarInt(psbt.txOutputs.length);

      psbt.txOutputs.forEach((output) => {
        outputWriter.writeUInt64(output.value);
        outputWriter.writeVarSlice(output.script);
      });

      const outputScriptHex = outputWriter.buffer().toString('hex');

      const data: CreateTransactionArg = {
        inputs: inputs.map((utxo: UTXO) => [
          app.splitTransaction(utxo.txHex),
          utxo.index,
          undefined,
        ]),
        associatedKeysets: [derivation],
        outputScriptHex,
        additionals: ['abc'],
        sigHashType: 0x41,
      };

      const signedTx = await app.createPaymentTransaction(data);

      msg.sign(signedTx);
    } catch (e) {
      throw e;
    } finally {
      await transport.close();
    }
  }
}

export default LedgerSigner;

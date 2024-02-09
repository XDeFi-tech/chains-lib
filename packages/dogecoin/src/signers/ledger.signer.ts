import BtcOld from '@ledgerhq/hw-app-btc';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator, utils } from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import * as Dogecoin from 'bitcoinjs-lib';
import { CreateTransactionArg } from '@ledgerhq/hw-app-btc/lib/createTransaction';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
  }

  network = {
    hashGenesisBlock:
      '1a91e3dace36e2be3bf030a65679fe821aa1d6ef92e7c9902eb318182c355691',
    port: 22556,
    protocol: { magic: 3233857728 },
    seedsDns: ['seed.multidoge.org', 'seed2.multidoge.org'],
    versions: {
      bip32: { private: 49988504, public: 49990397 },
      bip44: 3,
      private: 158,
      public: 30,
      scripthash: 22,
    },
    name: 'Dogecoin',
    unit: 'DOGE',
    testnet: false,
    messagePrefix: '\u0019Dogecoin Signed Message:\n',
    bip32: { public: 49990397, private: 49988504 },
    pubKeyHash: 30,
    scriptHash: 22,
    wif: 158,
    dustThreshold: null,
    bech32: '',
  };

  verifyAddress(address: string): boolean {
    try {
      Dogecoin.address.toOutputScript(address, this.network);
      return true;
    } catch (err) {
      return false;
    }
  }

  async getAddress(derivation: string): Promise<string> {
    const app = new BtcOld({
      transport: this.transport as Transport,
      currency: 'dogecoin',
    });

    const { bitcoinAddress } = await app.getWalletPublicKey(derivation);

    if (bitcoinAddress) {
      return bitcoinAddress;
    } else {
      throw new Error('Error getting Dogecoin address');
    }
  }

  async sign(msg: ChainMsg, derivation: string) {
    const app = new BtcOld({
      transport: this.transport as Transport,
      currency: 'dogecoin',
    });
    const { inputs, outputs, from } = await msg.buildTx();
    const psbt = new Dogecoin.Psbt({ network: this.network });

    inputs.forEach((utxo: UTXO) => {
      psbt.addInput({
        hash: utxo.hash,
        index: utxo.index,
        witnessUtxo: utxo.witnessUtxo,
      } as any);
    });

    outputs.forEach((output: any) => {
      if (!output.address) {
        output.address = from;
      }

      psbt.addOutput({
        script: Dogecoin.address.toOutputScript(output.address, this.network),
        value: output.value,
      });
    });

    const outputWriter = new utils.BufferWriter();

    outputWriter.writeVarInt(psbt.txOutputs.length);

    psbt.txOutputs.forEach((output: any) => {
      outputWriter.writeUInt64(output.value);
      outputWriter.writeVarSlice(output.script);
    });

    const outputScriptHex = outputWriter.buffer().toString('hex');

    const data: CreateTransactionArg = {
      inputs: inputs.map((utxo: UTXO) => [
        app.splitTransaction(utxo.txHex, true),
        utxo.index,
        utxo.witnessUtxo.script.toString('hex'),
      ]),
      associatedKeysets: [derivation],
      outputScriptHex,
      additionals: [],
    };

    const signedTx = await app.createPaymentTransaction(data);

    msg.sign(signedTx);
  }
}

export default LedgerSigner;

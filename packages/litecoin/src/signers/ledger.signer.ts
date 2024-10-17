import BtcOld from '@ledgerhq/hw-app-btc';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator, utils } from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import * as Litecoin from 'bitcoinjs-lib';
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
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bech32: 'ltc',
    bip32: {
      public: 0x019da462,
      private: 0x019d9cfe,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
  };

  async getAddress(
    derivation: string,
    type: 'legacy' | 'p2sh' | 'bech32' | 'bech32m' | 'cashaddr' = 'cashaddr'
  ): Promise<string> {
    const app = new BtcOld({
      transport: this.transport as Transport,
      currency: 'litecoin',
    });

    const { bitcoinAddress } = await app.getWalletPublicKey(derivation, {
      format: type,
    });

    if (bitcoinAddress) {
      return bitcoinAddress;
    } else {
      throw new Error('Error getting Litecoin address');
    }
  }

  async sign(msg: ChainMsg, derivation: string) {
    const app = new BtcOld({
      transport: this.transport as Transport,
      currency: 'litecoin',
    });
    const { inputs, outputs, from } = await msg.buildTx();
    const psbt = new Litecoin.Psbt({ network: this.network });

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
        script: Litecoin.address.toOutputScript(output.address, this.network),
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
    const additionals = await this.getTransactionAdditionals(derivation);

    const data: CreateTransactionArg = {
      inputs: inputs.map((utxo: UTXO) => [
        app.splitTransaction(utxo.txHex, true),
        utxo.index,
        undefined,
        undefined,
      ]),
      associatedKeysets: Array(inputs.length).fill(derivation),
      outputScriptHex,
      segwit: !derivation.startsWith(`m/44'`),
      additionals: additionals,
    };

    const signedTx = await app.createPaymentTransaction(data);

    msg.sign(signedTx);
  }

  private async getTransactionAdditionals(derivation: string) {
    const additionals = [];
    if (derivation.startsWith(`m/84'`)) {
      additionals.push('bech32');
    }

    return additionals;
  }
}

export default LedgerSigner;

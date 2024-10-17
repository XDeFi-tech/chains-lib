import Btc from '@ledgerhq/hw-app-btc';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator, utils } from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import * as Bitcoin from 'bitcoinjs-lib';
import { CreateTransactionArg } from '@ledgerhq/hw-app-btc/lib/createTransaction';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
  }

  async getAddress(
    derivation: string,
    type: 'legacy' | 'p2sh' | 'bech32' | 'bech32m' | 'cashaddr' = 'legacy'
  ): Promise<string> {
    const app = new Btc({
      transport: this.transport,
      currency: 'bitcoin',
    });

    const address = await app.getWalletPublicKey(derivation, { format: type });

    return address.bitcoinAddress;
  }

  async sign(msg: ChainMsg, derivation: string) {
    const app = new Btc({
      transport: this.transport,
      currency: 'bitcoin',
    });
    const { inputs, outputs, from } = await msg.buildTx();
    const psbt = new Bitcoin.Psbt({ network: Bitcoin.networks.bitcoin });

    psbt.addInputs(
      inputs.map((utxo: UTXO) => {
        return {
          hash: utxo.hash,
          index: utxo.index,
          witnessUtxo: utxo.witnessUtxo,
        };
      })
    );

    outputs.forEach((output: any) => {
      if (!output.address) {
        output.address = from;
      }

      psbt.addOutput({
        address: output.address,
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
        undefined,
      ]),
      associatedKeysets: Array(inputs.length).fill(derivation),
      outputScriptHex,
      additionals: ['bech32'],
    };

    const signedTx = await app.createPaymentTransaction(data);

    msg.sign(signedTx);
  }

  async signMessage(message: string, derivation: string): Promise<string> {
    const app = new Btc({
      transport: this.transport,
      currency: 'bitcoin',
    });
    const result = await app.signMessage(
      derivation,
      Buffer.from(message).toString('hex')
    );
    const v = result.v + 27 + 4;
    const signature = Buffer.from(
      v.toString(16) + result.r + result.s,
      'hex'
    ).toString('base64');
    return signature;
  }
}

export default LedgerSigner;

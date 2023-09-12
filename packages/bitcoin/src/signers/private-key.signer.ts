/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import * as Bitcoin from 'bitcoinjs-lib';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      Bitcoin.address.toOutputScript(address);
      return true;
    } catch (err) {
      return false;
    }
  }

  async getAddress(
    privateKey: string,
    type: 'p2ms' | 'p2pk' | 'p2pkh' | 'p2sh' | 'p2wpkh' | 'p2wsh' = 'p2wpkh'
  ): Promise<string> {
    const pk = Bitcoin.ECPair.fromWIF(privateKey);
    const { address } = Bitcoin.payments[type]({
      pubkey: pk.publicKey,
      network: Bitcoin.networks.bitcoin,
    });

    if (!address) throw new Error('BTC address is undefined');

    return address;
  }

  async sign(privateKey: string, message: ChainMsg) {
    const { inputs, outputs, compiledMemo, from } = await message.buildTx();
    const psbt = new Bitcoin.Psbt({ network: Bitcoin.networks.bitcoin });
    psbt.addInputs(
      inputs.map((utxo: UTXO) => ({
        hash: utxo.hash,
        index: utxo.index,
        witnessUtxo: utxo.witnessUtxo,
        nonWitnessUtxo: Buffer.from(utxo.txHex, 'hex'),
      }))
    );

    outputs.forEach((output: Bitcoin.PsbtTxOutput) => {
      if (!output.address) {
        output.address = from;
      }
      if (!output.script) {
        psbt.addOutput(output);
      } else {
        if (compiledMemo) {
          psbt.addOutput({ script: compiledMemo, value: 0 });
        }
      }
    });
    psbt.signAllInputs(Bitcoin.ECPair.fromWIF(privateKey));
    psbt.finalizeAllInputs();

    message.sign(psbt.extractTransaction(true).toHex());
  }
}

export default PrivateKeySigner;

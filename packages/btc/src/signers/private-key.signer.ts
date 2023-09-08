/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import * as UTXOLib from 'bitcoinjs-lib';
import coininfo from 'coininfo';

import { ChainMsg } from '../msg';
import { UTXO } from '../datasource';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      UTXOLib.address.toOutputScript(address);
      return true;
    } catch (err) {
      return false;
    }
  }

  async getAddress(
    privateKey: string,
    type: 'p2ms' | 'p2pk' | 'p2pkh' | 'p2sh' | 'p2wpkh' | 'p2wsh' = 'p2wpkh'
  ): Promise<string> {
    const pk = UTXOLib.ECPair.fromWIF(privateKey);
    const { address } = UTXOLib.payments[type]({
      pubkey: pk.publicKey,
      network: UTXOLib.networks.bitcoin,
    });

    if (!address) throw new Error('BTC address is undefined');

    return address;
  }

  async sign(privateKey: string, message: ChainMsg) {
    const { inputs, outputs, compiledMemo, from } = await message.buildTx();
    const network =
      coininfo[message.provider.manifest.chain].main.toBitcoinJS();
    const psbt = new UTXOLib.Psbt({ network });
    psbt.addInputs(
      inputs.map((utxo: UTXO) => ({
        hash: utxo.hash,
        index: utxo.index,
        witnessUtxo: utxo.witnessUtxo,
        nonWitnessUtxo: Buffer.from(utxo.txHex, 'hex'),
      }))
    );

    outputs.forEach((output: UTXOLib.PsbtTxOutput) => {
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
    psbt.signAllInputs(UTXOLib.ECPair.fromWIF(privateKey, network));
    psbt.finalizeAllInputs();

    message.sign(psbt.extractTransaction(true).toHex());
  }
}

export default PrivateKeySigner;

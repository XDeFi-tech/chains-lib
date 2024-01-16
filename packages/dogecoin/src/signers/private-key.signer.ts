/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import * as Dogecoin from 'bitcoinjs-lib';
import coininfo from 'coininfo';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      Dogecoin.address.toOutputScript(
        address,
        coininfo.dogecoin.main.toBitcoinJS()
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  async getPrivateKey(_derivation: string): Promise<string> {
    return this.key;
  }

  async getAddress(
    derivation: string,
    type: 'p2ms' | 'p2pk' | 'p2pkh' | 'p2sh' | 'p2wpkh' | 'p2wsh' = 'p2pkh'
  ): Promise<string> {
    const network = coininfo.dogecoin.main.toBitcoinJS();
    const pk = Dogecoin.ECPair.fromWIF(this.key);
    const { address } = Dogecoin.payments[type]({
      pubkey: pk.publicKey,
      network,
    });

    if (!address) throw new Error('DOGE address is undefined');

    return address;
  }

  async sign(message: ChainMsg) {
    const { inputs, outputs, compiledMemo, from } = await message.buildTx();
    const network = coininfo.dogecoin.main.toBitcoinJS();
    const psbt = new Dogecoin.Psbt({ network });
    psbt.setMaximumFeeRate(7500000);
    psbt.addInputs(
      inputs.map((utxo: UTXO) => ({
        hash: utxo.hash,
        index: utxo.index,
        nonWitnessUtxo: Buffer.from(utxo.txHex, 'hex'),
      }))
    );

    outputs.forEach((output: Dogecoin.PsbtTxOutput) => {
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
    psbt.signAllInputs(Dogecoin.ECPair.fromWIF(this.key));
    psbt.finalizeAllInputs();

    message.sign(psbt.extractTransaction(true).toHex());
  }
}

export default PrivateKeySigner;

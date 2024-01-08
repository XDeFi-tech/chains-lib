/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import * as Bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import * as HDKey from 'hdkey';
import CoinKey from 'coinkey';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      Bitcoin.address.toOutputScript(address);
      return true;
    } catch (err) {
      return false;
    }
  }

  async getPrivateKey(derivation: string): Promise<string> {
    if (!this._key) {
      throw new Error('Seed phrase not set!');
    }

    const seed = bip39.mnemonicToSeedSync(this._key);
    // throw new Error(seed.toString('hex'));
    const hdKey = HDKey.fromMasterSeed(seed);
    const child = hdKey.derive(derivation);
    const coinKey = new CoinKey(child.privateKey, Bitcoin.networks.bitcoin);

    return coinKey.privateWif;
  }

  async getAddress(
    derivation: string,
    type: 'p2ms' | 'p2pk' | 'p2pkh' | 'p2sh' | 'p2wpkh' | 'p2wsh' = 'p2wpkh'
  ): Promise<string> {
    const pk = Bitcoin.ECPair.fromWIF(await this.getPrivateKey(derivation));
    const { address } = Bitcoin.payments[type]({
      pubkey: pk.publicKey,
      network: Bitcoin.networks.bitcoin,
    });

    if (!address) throw new Error('BTC address is undefined');

    return address;
  }

  async sign(message: ChainMsg, derivation: string) {
    const { inputs, outputs, compiledMemo, from } = await message.buildTx();
    const psbt = new Bitcoin.Psbt({ network: Bitcoin.networks.bitcoin });
    psbt.setMaximumFeeRate(2_500_000);
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
    psbt.signAllInputs(
      Bitcoin.ECPair.fromWIF(await this.getPrivateKey(derivation))
    );
    psbt.finalizeAllInputs();

    message.sign(psbt.extractTransaction(true).toHex());
  }
}

export default SeedPhraseSigner;
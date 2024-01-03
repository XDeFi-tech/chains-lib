/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import * as bip39 from 'bip39';
import * as HDKey from 'hdkey';
import CoinKey from 'coinkey';
import * as Dogecoin from 'bitcoinjs-lib';
import coininfo from 'coininfo';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
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

  async getPrivateKey(derivation: string): Promise<string> {
    if (!this._key) {
      throw new Error('Seed phrase not set!');
    }

    const seed = bip39.mnemonicToSeedSync(this._key);
    const hdKey = HDKey.fromMasterSeed(seed);
    const child = hdKey.derive(derivation);
    const coinKey = new CoinKey(
      child.privateKey,
      coininfo.dogecoin.main.toBitcoinJS()
    );

    return coinKey.privateWif;
  }

  async getAddress(
    derivation: string,
    type: 'p2ms' | 'p2pk' | 'p2pkh' | 'p2sh' | 'p2wpkh' | 'p2wsh' = 'p2pkh'
  ): Promise<string> {
    const network = coininfo.dogecoin.main.toBitcoinJS();
    const pk = Dogecoin.ECPair.fromWIF(
      await this.getPrivateKey(derivation),
      network
    );

    const { address } = Dogecoin.payments[type]({
      pubkey: pk.publicKey,
      network,
    });

    if (!address) throw new Error('DOGE address is undefined');

    return address;
  }

  async sign(message: ChainMsg, derivation: string) {
    const { inputs, outputs, compiledMemo, from } = await message.buildTx();
    const network = coininfo.dogecoin.main.toBitcoinJS();
    const psbt = new Dogecoin.Psbt({ network });
    psbt.addInputs(
      inputs.map((utxo: UTXO) => ({
        hash: utxo.hash,
        index: utxo.index,
        witnessUtxo: utxo.witnessUtxo,
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
    psbt.signAllInputs(
      Dogecoin.ECPair.fromWIF(await this.getPrivateKey(derivation), network)
    );
    psbt.finalizeAllInputs();

    message.sign(psbt.extractTransaction(true).toHex());
  }
}

export default SeedPhraseSigner;

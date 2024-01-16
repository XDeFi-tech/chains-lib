/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import * as bip39 from 'bip39';
import * as HDKey from 'hdkey';
import CoinKey from 'coinkey';
/*eslint import/namespace: [2, { allowComputed: true }]*/
import * as BitcoinCash from '@psf/bitcoincashjs-lib';
import coininfo from 'coininfo';
import * as bchaddr from 'bchaddrjs';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      BitcoinCash.address.toOutputScript(address);
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
      coininfo.bitcoincash.main.toBitcoinJS()
    );

    return coinKey.privateWif;
  }

  async getAddress(derivation: string): Promise<string> {
    const network = coininfo.bitcoincash.main.toBitcoinJS();
    const pk = BitcoinCash.ECPair.fromWIF(
      await this.getPrivateKey(derivation),
      network
    );
    const address = pk.getAddress();

    if (!address) throw new Error('BCH address is undefined');

    return address;
  }

  private toLegacy(address: string) {
    return bchaddr.toLegacyAddress(address);
  }

  async sign(message: ChainMsg, derivation: string) {
    const { inputs, outputs, compiledMemo, from } = await message.buildTx();
    const network = coininfo.bitcoincash.main.toBitcoinJS();
    const builder = new BitcoinCash.TransactionBuilder(network);

    inputs.forEach((utxo: UTXO) => {
      builder.addInput(
        BitcoinCash.Transaction.fromBuffer(
          Buffer.from(utxo.txHex || '', 'hex')
        ),
        utxo.index
      );
    });

    outputs.forEach((output: any) => {
      const outAddress = this.toLegacy(output.address || from);
      const out = BitcoinCash.address.toOutputScript(outAddress, network);

      if (!output.script) {
        builder.addOutput(out, output.value);
      } else if (compiledMemo) {
        builder.addOutput(compiledMemo, 0);
      }
    });

    const pk = await this.getPrivateKey(derivation);

    inputs.forEach((utxo: UTXO, index: number) => {
      builder.sign(
        index,
        BitcoinCash.ECPair.fromWIF(pk, network),
        undefined,
        0x41,
        utxo.witnessUtxo.value
      );
    });
    message.sign(builder.build().toHex());
  }
}

export default SeedPhraseSigner;

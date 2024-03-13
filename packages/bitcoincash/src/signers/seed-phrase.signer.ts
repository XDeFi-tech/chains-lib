/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { secp256k1 } from '@noble/curves/secp256k1';
import * as btc from '@scure/btc-signer';
import coininfo from 'coininfo';
import * as bchaddr from 'bchaddrjs';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      const _address = bchaddr.toCashAddress(address);
      return bchaddr.isValidAddress(_address);
    } catch (err) {
      return false;
    }
  }

  async getPrivateKey(derivation: string): Promise<string> {
    if (!this.key) {
      throw new Error('Private key not set!');
    }

    const network = coininfo.bitcoincash.main.toBitcoinJS();
    const seed = await bip39.mnemonicToSeed(this.key);
    const root = bip32.fromSeed(seed, network);
    const master = root.derivePath(derivation);

    return Buffer.from(btc.WIF(network).decode(master.toWIF())).toString('hex');
  }

  async getAddress(derivation: string): Promise<string> {
    const network = coininfo.bitcoincash.main.toBitcoinJS();
    const privateKey = await this.getPrivateKey(derivation);
    const publicKey = secp256k1.getPublicKey(privateKey, true);
    const { address } = btc.p2pkh(publicKey, network);

    if (!address) throw new Error('BCH address is undefined');

    const adddressWithPrefix = bchaddr.toCashAddress(address);

    return adddressWithPrefix.replace(/(bchtest:|bitcoincash:)/, '');
  }

  private toLegacy(address: string): string {
    return bchaddr.toLegacyAddress(address);
  }

  async sign(message: ChainMsg, derivation: string) {
    const network = coininfo.bitcoincash.main.toBitcoinJS();

    const { inputs, outputs, from } = await message.buildTx();
    const txP2WPKH = new btc.Transaction();
    for (const input of inputs) {
      txP2WPKH.addInput({
        txid: input.hash,
        index: input.index,
        nonWitnessUtxo: input.txHex,
      });
    }
    for (const output of outputs) {
      if (!output.address) {
        output.address = from;
      }
      txP2WPKH.addOutputAddress(
        this.toLegacy(output.address),
        BigInt(output.value),
        network
      );
    }
    const privateKey = await this.getPrivateKey(derivation);
    txP2WPKH.sign(new Uint8Array(Buffer.from(privateKey, 'hex')));
    txP2WPKH.finalize();

    message.sign(txP2WPKH.hex);
  }
}

export default SeedPhraseSigner;

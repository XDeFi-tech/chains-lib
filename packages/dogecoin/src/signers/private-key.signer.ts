/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import * as Dogecoin from 'bitcoinjs-lib';
import coininfo from 'coininfo';
import { secp256k1 } from '@noble/curves/secp256k1';
import * as btc from '@scure/btc-signer';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      return btc.Address(coininfo.dogecoin.main.toBitcoinJS()).decode(address)
        ? true
        : false;
    } catch (err) {
      return false;
    }
  }

  async getPrivateKey(_derivation?: string): Promise<string> {
    if (!this.key) {
      throw new Error('Private key not set!');
    }

    return this.key;
  }

  async getAddress(_derivation?: string): Promise<string> {
    const network = coininfo.dogecoin.main.toBitcoinJS();
    const publicKey = secp256k1.getPublicKey(
      btc.WIF(network).decode(this.key),
      true
    );
    const { address } = btc.p2pkh(publicKey, network);

    if (!address) throw new Error('DOGE address is undefined');

    return address;
  }

  async sign(message: ChainMsg) {
    const { inputs, outputs, from } = await message.buildTx();
    const network = coininfo.dogecoin.main.toBitcoinJS();
    const psbt = new btc.Transaction();

    for (const utxo of inputs) {
      psbt.addInput({
        txid: utxo.hash,
        index: utxo.index,
        nonWitnessUtxo: utxo.txHex,
      });
    }

    for (const output of outputs) {
      if (!output.address) {
        output.address = from;
      }
      psbt.addOutputAddress(output.address, BigInt(output.value), network);
    }
    psbt.sign(btc.WIF(network).decode(this.key));
    psbt.finalize();

    message.sign(psbt.hex);
  }
}

export default PrivateKeySigner;

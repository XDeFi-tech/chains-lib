/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { secp256k1 } from '@noble/curves/secp256k1';
import * as btc from '@scure/btc-signer';
import coininfo from 'coininfo';
import * as bchaddr from 'bchaddrjs';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      const _address = bchaddr.toCashAddress(address);
      return bchaddr.isValidAddress(_address);
    } catch (err) {
      return false;
    }
  }

  async getPrivateKey(_derivation?: string): Promise<string> {
    if (!this.key) {
      throw new Error('Private key not set!');
    }

    const network = coininfo.bitcoincash.main.toBitcoinJS();
    return Buffer.from(btc.WIF(network).decode(this.key)).toString('hex');
  }

  async getAddress(_derivation?: string): Promise<string> {
    const network = coininfo.bitcoincash.main.toBitcoinJS();
    const privateKey = await this.getPrivateKey(_derivation);
    const publicKey = secp256k1.getPublicKey(privateKey, true);
    const { address } = btc.p2pkh(publicKey, network);

    if (!address) throw new Error('BCH address is undefined');

    const adddressWithPrefix = bchaddr.toCashAddress(address);

    return adddressWithPrefix.replace(/(bchtest:|bitcoincash:)/, '');
  }

  private toLegacy(address: string): string {
    return bchaddr.toLegacyAddress(address);
  }

  async sign(message: ChainMsg, _derivation?: string) {
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
    const privateKey = await this.getPrivateKey(_derivation);
    txP2WPKH.sign(new Uint8Array(Buffer.from(privateKey, 'hex')));
    txP2WPKH.finalize();

    message.sign(txP2WPKH.hex);
  }
}

export default PrivateKeySigner;

/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import * as bip39 from 'bip39';
import { secp256k1 } from '@noble/curves/secp256k1';
import { HDKey } from '@scure/bip32';
import * as btc from '@scure/btc-signer';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      if (btc.Address().decode(address)) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  async getPrivateKey(derivation: string): Promise<string> {
    if (!this.key) {
      throw new Error('Seed phrase not set!');
    }
    const seed = await bip39.mnemonicToSeed(this.key, '');
    const root = HDKey.fromMasterSeed(new Uint8Array(seed));
    const child = root.derive(derivation);
    const pk = child.privateKey;

    if (!pk) {
      throw new Error('Error generating private key!');
    }

    return Buffer.from(pk).toString('hex');
  }

  async getAddress(derivation: string): Promise<string> {
    const privateKey = await this.getPrivateKey(derivation);
    const publicKey = secp256k1.getPublicKey(privateKey, true);
    const { address } = btc.p2wpkh(publicKey);

    if (!address) throw new Error('BTC address is undefined');

    return address;
  }

  async sign(message: ChainMsg, derivation: string) {
    const { inputs, outputs, from } = await message.buildTx();
    const txP2WPKH = new btc.Transaction();
    for (const input of inputs) {
      txP2WPKH.addInput({
        txid: input.hash,
        index: input.index,
        witnessUtxo: {
          script: new Uint8Array(input.witnessUtxo.script),
          amount: BigInt(input.witnessUtxo.value),
        },
      });
    }
    for (const output of outputs) {
      if (!output.address) {
        output.address = from;
      }
      txP2WPKH.addOutputAddress(output.address, BigInt(output.value));
    }
    const privateKey = await this.getPrivateKey(derivation);
    txP2WPKH.sign(new Uint8Array(Buffer.from(privateKey, 'hex')));
    txP2WPKH.finalize();

    message.sign(txP2WPKH.hex);
  }
}

export default SeedPhraseSigner;

/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import { secp256k1 } from '@noble/curves/secp256k1';
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
    const root = bip32.fromSeed(seed);
    const master = root.derivePath(derivation);

    return master.toWIF();
  }

  async getAddress(derivation: string): Promise<string> {
    const wif = await this.getPrivateKey(derivation);
    const privateKey = Buffer.from(btc.WIF().decode(wif)).toString('hex');
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
    txP2WPKH.sign(new Uint8Array(Buffer.from(btc.WIF().decode(privateKey))));
    txP2WPKH.finalize();

    message.sign(txP2WPKH.hex);
  }

  async signRawTransaction(txHex: string, derivation: string): Promise<string> {
    const pk = Bitcoin.ECPair.fromWIF(await this.getPrivateKey(derivation));
    const psbt = Bitcoin.Psbt.fromHex(txHex);

    psbt.signAllInputs(pk);
    psbt.finalizeAllInputs();
    return psbt.extractTransaction(true).toHex();
  }
}

export default SeedPhraseSigner;

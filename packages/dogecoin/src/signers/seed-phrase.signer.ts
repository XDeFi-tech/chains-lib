/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import coininfo from 'coininfo';
import { secp256k1 } from '@noble/curves/secp256k1';
import * as btc from '@scure/btc-signer';
import * as bip32 from '@scure/bip32';
import * as bip39 from '@scure/bip39';
import * as Dogecoin from 'bitcoinjs-lib';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  async getPrivateKey(derivation: string): Promise<string> {
    if (!this.key) {
      throw new Error('Seed phrase not set!');
    }
    const seed = await bip39.mnemonicToSeed(this.key, '');
    const root = bip32.HDKey.fromMasterSeed(seed);
    const master = root.derive(derivation);
    const dogecoinNetwork = coininfo.dogecoin.main.toBitcoinJS();
    const wif = btc.WIF(dogecoinNetwork).encode(master.privateKey!);
    return wif;
  }

  async getAddress(derivation: string): Promise<string> {
    const network = coininfo.dogecoin.main.toBitcoinJS();
    const publicKey = secp256k1.getPublicKey(
      btc.WIF(network).decode(await this.getPrivateKey(derivation)),
      true
    );
    const { address } = btc.p2pkh(publicKey, network);

    if (!address) throw new Error('DOGE address is undefined');

    return address;
  }

  async sign(message: ChainMsg, derivation: string) {
    const { inputs, outputs, from } = await message.buildTx();
    const network = coininfo.dogecoin.main.toBitcoinJS();
    const psbt = new btc.Transaction({
      allowUnknownOutputs: true,
    });

    for (const utxo of inputs) {
      psbt.addInput({
        txid: utxo.hash,
        index: utxo.index,
        nonWitnessUtxo: utxo.txHex,
      });
    }

    for (const output of outputs) {
      // OP_RETURN always has value 0
      if (output.value === 0) {
        psbt.addOutput({
          script: output.script,
          amount: BigInt(0),
        });
        continue;
      }
      if (!output.address) {
        output.address = from;
      }
      psbt.addOutputAddress(output.address, BigInt(output.value), network);
    }
    psbt.sign(btc.WIF(network).decode(await this.getPrivateKey(derivation)));
    psbt.finalize();

    message.sign(psbt.hex);
  }

  async signRawTransaction(txHex: string, derivation: string): Promise<string> {
    const network = coininfo.dogecoin.main.toBitcoinJS();
    const pk = Dogecoin.ECPair.fromWIF(
      await this.getPrivateKey(derivation),
      network
    );
    const psbt = Dogecoin.Psbt.fromHex(txHex, { network });

    psbt.signAllInputs(pk);
    psbt.finalizeAllInputs();
    return psbt.extractTransaction(true).toHex();
    // const tx = Dogecoin.Transaction.fromHex(txHex);
    // const txb = Dogecoin.TransactionBuilder.fromTransaction(tx, network);
    // for (let i = 0; i < tx.ins.length; i++) {
    //   txb.sign(i, pk);
    // }

    // return txb.build().toHex();
  }
}

export default SeedPhraseSigner;

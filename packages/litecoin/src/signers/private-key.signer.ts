/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import coininfo from 'coininfo';
import { secp256k1 } from '@noble/curves/secp256k1';
import * as btc from '@scure/btc-signer';
import * as Litecoin from 'bitcoinjs-lib';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  async getPrivateKey(_derivation?: string): Promise<string> {
    if (!this.key) {
      throw new Error('Private key not set!');
    }

    return this.key;
  }

  async getAddress(_derivation?: string): Promise<string> {
    const network = coininfo.litecoin.main.toBitcoinJS();
    const publicKey = secp256k1.getPublicKey(
      btc.WIF(network).decode(await this.getPrivateKey()),
      true
    );
    const { address } = btc.p2wpkh(publicKey, network);

    if (!address) throw new Error('DOGE address is undefined');

    return address;
  }

  async sign(message: ChainMsg) {
    const { inputs, outputs, from } = await message.buildTx();
    const network = coininfo.litecoin.main.toBitcoinJS();
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
    psbt.sign(btc.WIF(network).decode(await this.getPrivateKey()));
    psbt.finalize();

    message.sign(psbt.hex);
  }

  async signRawTransaction(
    txHex: string,
    derivation?: string
  ): Promise<string> {
    const network = coininfo.litecoin.main.toBitcoinJS();
    const pk = Litecoin.ECPair.fromWIF(
      await this.getPrivateKey(derivation ?? ''),
      network
    );
    const psbt = Litecoin.Psbt.fromHex(txHex, { network });

    psbt.signAllInputs(pk);
    psbt.finalizeAllInputs();
    return psbt.extractTransaction(true).toHex();
  }
}

export default PrivateKeySigner;

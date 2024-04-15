/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import * as BitcoinCash from '@psf/bitcoincashjs-lib';
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

  async getPrivateKey(_derivation: string): Promise<string> {
    return this.key;
  }

  async getAddress(): Promise<string> {
    const network = coininfo.bitcoincash.main.toBitcoinJS();
    const pk = BitcoinCash.ECPair.fromWIF(this.key, network);
    const address = pk.getAddress();

    if (!address) throw new Error('BCH address is undefined');
    const adddressWithPrefix = bchaddr.toCashAddress(address); // bitcoincash:${address}

    return adddressWithPrefix.replace(/(bchtest:|bitcoincash:)/, '');
  }

  private toLegacy(address: string) {
    return bchaddr.toLegacyAddress(address);
  }

  async sign(message: ChainMsg) {
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

    inputs.forEach((utxo: UTXO, index: number) => {
      builder.sign(
        index,
        BitcoinCash.ECPair.fromWIF(this.key, network),
        undefined,
        0x41,
        utxo.witnessUtxo.value
      );
    });
    message.sign(builder.build().toHex());
  }
}

export default PrivateKeySigner;

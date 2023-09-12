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
      BitcoinCash.address.toOutputScript(address);
      return true;
    } catch (err) {
      return false;
    }
  }

  async getAddress(
    privateKey: string,
    type: 'p2ms' | 'p2pk' | 'p2pkh' | 'p2sh' | 'p2wpkh' | 'p2wsh' = 'p2wpkh'
  ): Promise<string> {
    const network = coininfo.dogecoin.main.toBitcoinJS();
    const pk = BitcoinCash.ECPair.fromWIF(privateKey, network);
    const { address } = BitcoinCash.payments[type]({
      pubkey: pk.publicKey,
      network,
    });

    if (!address) throw new Error('BTC address is undefined');

    return address;
  }

  private toLegacy(address: string) {
    return bchaddr.toLegacyAddress(address);
  }

  async sign(privateKey: string, message: ChainMsg) {
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
        BitcoinCash.ECPair.fromWIF(privateKey, network),
        undefined,
        0x41,
        utxo.witnessUtxo.value
      );
    });
    message.sign(builder.build().toHex());
  }
}

export default PrivateKeySigner;

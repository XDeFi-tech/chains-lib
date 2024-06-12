import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import * as UTXO from '@xdefi-tech/chains-utxo';
import { Address, PrivateKey, Transaction, Script, crypto } from 'dashcore-lib';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      return Address.isValid(address);
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
    const wif = await this.getPrivateKey(_derivation);
    const privateKey = PrivateKey.fromWIF(wif);
    const publicKey = privateKey.toPublicKey();
    const address = publicKey.toAddress('livenet');

    if (!address) throw new Error('DASH address is undefined');

    return address.toString();
  }

  async sign(message: UTXO.ChainMsg, _derivation?: string) {
    const { inputs, outputs, from } = await message.buildTx();

    const privateKey = new PrivateKey(
      await this.getPrivateKey(_derivation),
      'livenet'
    );

    const transaction = new Transaction();

    outputs.forEach((output: any) =>
      output.address
        ? transaction.to(output.address, output.value)
        : transaction.change(from)
    );

    transaction
      .from(
        inputs.map(
          (input: any) =>
            new Transaction.UnspentOutput({
              txId: input.hash,
              outputIndex: input.index,
              satoshis: input.value,
              script: Script.fromBuffer(input.witnessUtxo.script),
            })
        )
      )
      .change(from);

    transaction.sign(privateKey);

    message.sign(transaction.serialize());
  }
}

export default PrivateKeySigner;

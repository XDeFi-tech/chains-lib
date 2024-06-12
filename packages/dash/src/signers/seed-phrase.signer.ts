import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import * as bip39 from 'bip39';
import { Address, PrivateKey, HDPrivateKey } from 'dashcore-lib';

import { ChainMsg } from '../msg';

import PrivateKeySigner from './private-key.signer';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      return Address.isValid(address, 'livenet');
    } catch (err) {
      return false;
    }
  }

  async getPrivateKey(derivation: string): Promise<string> {
    if (!this.key) {
      throw new Error('Seed phrase not set!');
    }
    const seed = await bip39.mnemonicToSeed(this.key, '');
    const hdPrivateKey = HDPrivateKey.fromSeed(seed, 'livenet');

    return hdPrivateKey.derive(derivation).privateKey.toWIF();
  }

  async getAddress(derivation: string): Promise<string> {
    const wif = await this.getPrivateKey(derivation);

    const privateKey = PrivateKey.fromWIF(wif);

    const address = privateKey.toAddress('livenet').toString();

    if (!address) throw new Error('DASH address is undefined');

    return address;
  }

  async sign(message: ChainMsg, derivation: string) {
    const privateKey = await this.getPrivateKey(derivation);
    const signer = new PrivateKeySigner(privateKey);

    return signer.sign(message, derivation);
  }
}

export default SeedPhraseSigner;

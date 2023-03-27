/* eslint-disable @typescript-eslint/ban-ts-comment */
/*eslint import/namespace: [2, { allowComputed: true }]*/
import { Signer, SignerDecorator } from '@xdefi/chains-core';
import * as Bitcoin from 'bitcoinjs-lib';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1/index.js';
import { mnemonicToSeed } from 'bip39';
import { getSeed } from '@xchainjs/xchain-crypto';

import { BitcoinChainMessage } from '../bitcoinMessage';

const bip32Factory = BIP32Factory(ecc);

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner<S = string> extends Signer.Provider<S> {
  verifyAddress(address: string): boolean {
    try {
      Bitcoin.address.toOutputScript(address);
      return true;
    } catch (err) {
      return false;
    }
  }

  async getAddress(
    derivationPath: string,
    type: 'p2ms' | 'p2pk' | 'p2pkh' | 'p2sh' | 'p2wpkh' | 'p2wsh' = 'p2wpkh'
  ): Promise<string> {
    if (!this.key) {
      throw new Error('Key is required');
    }
    const seed = await mnemonicToSeed(this.key);
    const root = bip32Factory.fromSeed(seed);
    const account = root.derivePath(derivationPath);
    const { address } = Bitcoin.payments[type]({
      pubkey: account.publicKey,
      network: Bitcoin.networks.bitcoin,
    });

    if (!address) throw new Error('BTC address is undefined');

    return address;
  }

  async sign(derivationPath: string, message: BitcoinChainMessage): Promise<S> {
    if (!this.key) {
      throw new Error('Key is required');
    }
    const keys = this.getBitcoinKeys(this.key, derivationPath);
    message.setKeys(keys);
    return keys.publicKey.toString() as S;
  }

  private getBitcoinKeys(phrase: string, derivationPath: string) {
    const master = this.getMaster(phrase, derivationPath);

    if (!master.privateKey) {
      throw new Error('Could not get private key from phrase');
    }

    return Bitcoin.ECPair.fromPrivateKey(master.privateKey);
  }

  private getMaster(phrase: string, derivationPath: string) {
    const seed = getSeed(phrase);
    const master = Bitcoin.bip32.fromSeed(seed).derivePath(derivationPath);
    return master;
  }
}

export default PrivateKeySigner;

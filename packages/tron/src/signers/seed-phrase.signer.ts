import { Chain, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TronWeb from 'tronweb';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  constructor(key?: string) {
    super(key);
  }

  verifyAddress(address: string, manifest?: Chain.Manifest): boolean {
    const tronWeb = new TronWeb({
      fullHost: manifest?.rpcURL ? manifest.rpcURL : 'https://api.trongrid.io',
    });

    return tronWeb.isAddress(address);
  }

  async getPrivateKey(_derivation: string): Promise<string> {
    return this.key;
  }

  async getAddress(key: string | null, derivation: string): Promise<string> {
    const tronWeb = TronWeb.fromMnemonic(key ? key : this.key, derivation);

    const address = tronWeb.address;
    if (address) {
      return address;
    } else {
      throw new Error('Error Getting TRON Address');
    }
  }

  async sign(
    msg: ChainMsg,
    key: string | null,
    derivation: string,
    manifest: Chain.Manifest
  ): Promise<void> {
    const tronAccount = TronWeb.fromMnemonic(key ? key : this.key, derivation);
    const tronWeb = new TronWeb({
      fullHost: manifest.rpcURL,
      privateKey: tronAccount.privateKey.replace('0x', ''),
    });

    const txData = await msg.buildTx();
    const signature = await tronWeb.trx.sign(txData);
    msg.sign(signature);
  }
}

export default SeedPhraseSigner;

import { Chain, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TronWeb from 'tronweb';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
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

  async getAddress(
    key: string | null,
    manifest?: Chain.Manifest
  ): Promise<string> {
    const tronWeb = new TronWeb({
      fullHost: manifest?.rpcURL ? manifest.rpcURL : 'https://api.trongrid.io',
      privateKey: key ? key : this.key,
    });

    return tronWeb.defaultAddress.base58;
  }

  async sign(
    msg: ChainMsg,
    key: string | null,
    manifest: Chain.Manifest
  ): Promise<void> {
    const tronWeb = new TronWeb({
      fullHost: manifest.rpcURL,
      privateKey: key ? key : this.key,
    });

    const txData = await msg.buildTx();
    const signature = await tronWeb.trx.sign(txData);
    msg.sign(signature);
  }
}

export default PrivateKeySigner;

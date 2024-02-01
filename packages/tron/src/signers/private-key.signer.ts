import { Chain, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TronWeb from 'tronweb';
import type { TronManifest } from 'src/manifests';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  public manifest: TronManifest;

  constructor(key: string, manifest: TronManifest) {
    super(key);

    this.manifest = manifest;
  }

  verifyAddress(address: string, manifest: Chain.Manifest): boolean {
    const tronWeb = new TronWeb({
      fullHost: manifest.rpcURL,
    });

    return tronWeb.isAddress(address);
  }

  async getPrivateKey(_derivation: string): Promise<string> {
    return this.key;
  }

  async getAddress(): Promise<string> {
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey: this.key,
    });

    const address = tronWeb.defaultAddress.base58;
    if (address) {
      return address;
    } else {
      throw new Error('Error Getting TRON Address');
    }
  }

  async sign(msg: ChainMsg): Promise<void> {
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey: this.key,
    });

    const txData = await msg.buildTx();
    const signature = await tronWeb.trx.sign(txData);
    msg.sign(signature);
  }
}

export default PrivateKeySigner;

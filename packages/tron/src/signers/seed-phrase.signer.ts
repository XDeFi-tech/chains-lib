import { Chain, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TronWeb from 'tronweb';
import type { TronManifest } from 'src/manifests';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
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

  async getPrivateKey(derivation: string): Promise<string> {
    const tronWeb = TronWeb.fromMnemonic(this.key, derivation);
    return tronWeb.privateKey;
  }

  async getAddress(derivation: string): Promise<string> {
    const tronWeb = TronWeb.fromMnemonic(this.key, derivation);

    const address = tronWeb.address;
    if (address) {
      return address;
    } else {
      throw new Error('Error Getting TRON Address');
    }
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const tronAccount = TronWeb.fromMnemonic(this.key, derivation);
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey: tronAccount.privateKey.replace('0x', ''),
    });

    const txData = await msg.buildTx();
    const signature = await tronWeb.trx.sign(txData);
    msg.sign(signature);
  }
}

export default SeedPhraseSigner;

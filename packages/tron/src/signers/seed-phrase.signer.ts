import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TronWeb from 'tronweb';
import type { TronManifest } from 'src/manifests';

import { ChainMsg } from '../msg';

import { Bytes } from './types';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  public manifest: TronManifest;

  constructor(key: string, manifest: TronManifest) {
    super(key);

    this.manifest = manifest;
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

  async signMessage(txHex: string, derivation: string): Promise<string> {
    const tronAccount = TronWeb.fromMnemonic(this.key, derivation);
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey: tronAccount.privateKey.replace('0x', ''),
    });

    const signature = await tronWeb.trx.signMessage(
      txHex,
      tronAccount.privateKey.replace('0x', '')
    );

    return signature;
  }

  async signMessageV2(
    message: Bytes | string,
    derivation: string
  ): Promise<string> {
    const tronAccount = TronWeb.fromMnemonic(this.key, derivation);
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey: tronAccount.privateKey.replace('0x', ''),
    });

    const signature = await tronWeb.trx.signMessageV2(
      message,
      tronAccount.privateKey.replace('0x', '')
    );

    return signature;
  }

  async signTransaction(txHex: string, derivation: string): Promise<string> {
    const tronAccount = TronWeb.fromMnemonic(this.key, derivation);
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey: tronAccount.privateKey.replace('0x', ''),
    });

    const signature = await tronWeb.trx.signTransaction(
      txHex,
      tronAccount.privateKey.replace('0x', '')
    );

    return signature;
  }
}

export default SeedPhraseSigner;

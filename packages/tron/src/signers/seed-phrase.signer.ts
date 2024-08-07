import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TronWeb, { TronTransaction } from 'tronweb';
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

  async sign(
    msg: ChainMsg,
    derivation: string,
    useTronHeader?: boolean,
    multisig?: boolean
  ): Promise<void> {
    const tronAccount = TronWeb.fromMnemonic(this.key, derivation);
    const privateKey = tronAccount.privateKey.replace('0x', '');
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey,
    });

    const txData = await msg.buildTx();
    const signature = await tronWeb.trx.sign(
      txData,
      privateKey,
      useTronHeader,
      multisig
    );
    msg.sign(signature);
  }

  async signMessage(
    txHex: string,
    derivation: string,
    useTronHeader?: boolean,
    multisig?: boolean
  ): Promise<string> {
    const tronAccount = TronWeb.fromMnemonic(this.key, derivation);
    const privateKey = tronAccount.privateKey.replace('0x', '');
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey,
    });

    const signature = await tronWeb.trx.signMessage(
      txHex,
      privateKey,
      useTronHeader,
      multisig
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

  async signTransaction(
    txHex: string,
    derivation: string,
    useTronHeader?: boolean,
    multisig?: boolean
  ): Promise<string> {
    const tronAccount = TronWeb.fromMnemonic(this.key, derivation);
    const privateKey = tronAccount.privateKey.replace('0x', '');
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey,
    });

    const signature = await tronWeb.trx.signTransaction(
      txHex,
      privateKey,
      useTronHeader,
      multisig
    );

    return signature;
  }

  async multiSignTransaction(
    transaction: TronTransaction,
    derivation: string,
    permisionId?: number
  ): Promise<TronTransaction> {
    const tronAccount = TronWeb.fromMnemonic(this.key, derivation);
    const privateKey = tronAccount.privateKey.replace('0x', '');
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey,
    });
    const signature = await tronWeb.trx.multiSign(
      transaction,
      privateKey,
      permisionId
    );
    return signature;
  }
}

export default SeedPhraseSigner;

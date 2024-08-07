import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TronWeb, { TronTransaction } from 'tronweb';
import type { TronManifest } from 'src/manifests';

import { ChainMsg } from '../msg';

import { Bytes } from './types';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  public manifest: TronManifest;

  constructor(key: string, manifest: TronManifest) {
    super(key);

    this.manifest = manifest;
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

  async signMessage(
    txHex: string,
    useTronHeader?: boolean,
    multisig?: boolean
  ): Promise<string> {
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey: this.key,
    });
    const signature = await tronWeb.trx.signMessage(
      txHex,
      this.key,
      useTronHeader,
      multisig
    );
    return signature;
  }

  async signMessageV2(message: Bytes | string): Promise<string> {
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey: this.key,
    });
    const signature = await tronWeb.trx.signMessageV2(message, this.key);
    return signature;
  }

  async signTransaction(
    txHex: string,
    useTronHeader?: boolean,
    multisig?: boolean
  ): Promise<string> {
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey: this.key,
    });
    const signature = await tronWeb.trx.signTransaction(
      txHex,
      this.key,
      useTronHeader,
      multisig
    );
    return signature;
  }

  async multiSignTransaction(
    transaction: TronTransaction,
    permisionId?: number
  ): Promise<TronTransaction> {
    const tronWeb = new TronWeb({
      fullHost: this.manifest.rpcURL,
      privateKey: this.key,
    });
    const signedTx = await tronWeb.trx.multiSign(
      transaction,
      this.key,
      permisionId
    );
    return signedTx;
  }
}

export default PrivateKeySigner;

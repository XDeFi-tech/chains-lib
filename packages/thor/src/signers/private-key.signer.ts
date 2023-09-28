import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import cosmosclient from '@cosmos-client/core';
import { bech32 } from 'bech32';
import * as bip39 from 'bip39';
import { BIP32Factory, BIP32API } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import Long from 'long';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  private bip32?: BIP32API;

  constructor() {
    super();
    this.initBip32().then((secp256k1) => {
      this.bip32 = BIP32Factory(secp256k1);
    });
  }

  async initBip32() {
    return await ecc;
  }

  verifyAddress(address: string): boolean {
    try {
      const result = bech32.decode(address);
      return result.prefix === 'thor' && result.words.length === 32;
    } catch (err) {
      return false;
    }
  }

  async getPrivateKeyFromMnemonik(
    mnemonic: string,
    derivationPath: string
  ): Promise<cosmosclient.proto.cosmos.crypto.secp256k1.PrivKey> {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Invalid phrase');
    }
    const seed = await bip39.mnemonicToSeed(mnemonic);
    if (!this.bip32) {
      throw new Error('Invalid bip32');
    }
    const node = this.bip32.fromSeed(seed);
    const child = node.derivePath(derivationPath);

    if (!child.privateKey) {
      throw new Error('Invalid child');
    }
    //
    return new cosmosclient.proto.cosmos.crypto.secp256k1.PrivKey({
      key: new Uint8Array([]),
    });
  }

  async getAddress(mnemonic: string, derivationPath: any): Promise<string> {
    const privKey = await this.getPrivateKeyFromMnemonik(
      mnemonic,
      derivationPath
    );
    return cosmosclient.AccAddress.fromPublicKey(privKey.pubKey()).toString();
  }

  async sign(
    mnemonic: string,
    msg: ChainMsg,
    derivationPath: string
  ): Promise<void> {
    const { txBody, accountNumber, account, gasPrice, gasLimit } =
      await msg.buildTx();
    if (!txBody) {
      return;
    }
    const privKey = await this.getPrivateKeyFromMnemonik(
      mnemonic,
      derivationPath
    );
    const authInfo = new cosmosclient.proto.cosmos.tx.v1beta1.AuthInfo({
      signer_infos: [
        {
          public_key: cosmosclient.codec.instanceToProtoAny(privKey.pubKey()),
          mode_info: {
            single: {
              mode: cosmosclient.proto.cosmos.tx.signing.v1beta1.SignMode
                .SIGN_MODE_DIRECT,
            },
          },
          sequence: Long.fromString(account?.sequence || '0'),
        },
      ],
      fee: {
        amount: [
          {
            denom: msg.provider.manifest.denom,
            amount: gasPrice,
          },
        ],
        gas_limit: new Long(parseInt(gasLimit)),
      },
    });
    const tx = new cosmosclient.TxBuilder(
      msg.provider.dataSource.rpcProvider,
      txBody,
      authInfo
    );
    const signDocBytes = tx.signDocBytes(accountNumber);
    tx.addSignature(privKey.sign(signDocBytes));
    msg.sign(tx.txBytes());
  }
}

export default PrivateKeySigner;

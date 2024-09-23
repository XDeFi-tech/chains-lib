import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import cosmosclient from '@cosmos-client/core';
import Long from 'long';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  async getPrivateKey(_derivation?: string | null) {
    return this.key;
  }

  async getCosmosPrivateKey(): Promise<cosmosclient.proto.cosmos.crypto.secp256k1.PrivKey> {
    return new cosmosclient.proto.cosmos.crypto.secp256k1.PrivKey({
      key: Buffer.from(this.key, 'hex'),
    });
  }

  async getAddress(
    _derivation?: string | null,
    prefix?: string
  ): Promise<string> {
    if (!prefix) {
      prefix = 'thor';
    }
    this._setPrefix(prefix);

    const privateKey = await this.getCosmosPrivateKey();
    return cosmosclient.AccAddress.fromPublicKey(
      privateKey.pubKey()
    ).toString();
  }

  async sign(msg: ChainMsg, _derivation?: string | null): Promise<void> {
    const { txBody, accountNumber, account, gasPrice, gasLimit } =
      await msg.buildTx();
    if (!txBody) {
      return;
    }
    const privKey = await this.getCosmosPrivateKey();
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
        amount: [],
        gas_limit: new Long(parseInt(gasLimit)),
      },
    });

    const tx = new cosmosclient.TxBuilder(
      msg.provider.dataSource.rpcProvider ||
        msg.provider.dataSource.getProvider(), // cover FallbackDataSource
      txBody,
      authInfo
    );
    const signDocBytes = tx.signDocBytes(accountNumber);
    tx.addSignature(privKey.sign(signDocBytes));
    msg.sign(tx.txBytes());
  }

  _setPrefix(prefix: string): void {
    cosmosclient.config.setBech32Prefix({
      accAddr: prefix,
      accPub: prefix + 'pub',
      valAddr: prefix + 'valoper',
      valPub: prefix + 'valoperpub',
      consAddr: prefix + 'valcons',
      consPub: prefix + 'valconspub',
    });
  }
}

export default PrivateKeySigner;

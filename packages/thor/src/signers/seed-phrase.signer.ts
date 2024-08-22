import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import cosmosclient from '@cosmos-client/core';
import * as bip39 from '@scure/bip39';
import { wordlist as bip39WordList } from '@scure/bip39/wordlists/english';
import * as bip32 from '@scure/bip32';
import Long from 'long';
import { Secp256k1HdWallet } from '@cosmjs/launchpad';
import {
  stringToPath,
  HdPath,
} from '@cosmjs/launchpad/node_modules/@cosmjs/crypto';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  async getPrivateKey(derivation: string) {
    const cosmosPrivateKey = await this.getCosmosPrivateKey(derivation);
    return Buffer.from(cosmosPrivateKey.key).toString('hex');
  }

  async getCosmosPrivateKey(
    derivation: string
  ): Promise<cosmosclient.proto.cosmos.crypto.secp256k1.PrivKey> {
    if (!bip39.validateMnemonic(this.key, bip39WordList)) {
      throw new Error('Invalid phrase');
    }
    const seed = await bip39.mnemonicToSeed(this.key);
    const node = bip32.HDKey.fromMasterSeed(seed);
    const child = node.derive(derivation);

    if (!child.privateKey) {
      throw new Error('Invalid child');
    }

    return new cosmosclient.proto.cosmos.crypto.secp256k1.PrivKey({
      key: child.privateKey,
    });
  }

  async getAddress(derivation: string, prefix?: string): Promise<string> {
    const path: readonly HdPath[] = [stringToPath(derivation)];
    const wallet = await Secp256k1HdWallet.fromMnemonic(this.key, {
      hdPaths: path,
      prefix: prefix ?? 'thor',
    });
    const [{ address }] = await wallet.getAccounts();
    return address;
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const { txBody, accountNumber, account, gasPrice, gasLimit } =
      await msg.buildTx();
    if (!txBody) {
      return;
    }
    const privKey = await this.getCosmosPrivateKey(derivation);
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

export default SeedPhraseSigner;

import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { Secp256k1HdWallet } from '@cosmjs/launchpad';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { fromHex, toHex } from '@cosmjs/encoding';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { bech32 } from 'bech32';
import {
  stringToPath,
  pathToString,
  Keccak256,
} from '@cosmjs/launchpad/node_modules/@cosmjs/crypto';
import { getAddress } from 'ethers';
import { MnemonicKey, AccAddress } from '@terra-money/feather.js';

import { ChainMsg } from '../msg';
import { STARGATE_CLIENT_OPTIONS } from '../utils';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string, prefix?: string): boolean {
    try {
      if (address.substring(0, 2) === '0x') {
        getAddress(address);
        return true;
      } else if (address.substring(0, 5) === 'terra') {
        return AccAddress.validate(address);
      } else {
        const result = bech32.decode(address);
        return (
          result.prefix === (prefix ?? 'cosmos') && result.words.length === 32
        );
      }
    } catch (err) {
      return false;
    }
  }

  async getPrivateKey(_derivation?: string) {
    return this.key;
  }

  async getAddress(derivation: string, prefix?: string): Promise<string> {
    const hdPath = stringToPath(derivation);

    const wallet = await Secp256k1HdWallet.fromMnemonic(this.key, {
      prefix,
      hdPaths: [hdPath],
    });

    if (pathToString(hdPath).split('/')[2] == "60'") {
      const [{ pubkey }] = await wallet.getAccounts();
      const hash = new Keccak256(pubkey.slice(1)).digest();
      const lastTwentyBytes = toHex(hash.slice(-20));

      return getAddress('0x' + lastTwentyBytes);
    } else if (
      pathToString(hdPath).split('/')[2] == "330'" ||
      prefix === 'terra'
    ) {
      const wallet = new MnemonicKey({
        mnemonic: this._key,
        coinType: 330, // optional, default
        account: parseInt(pathToString(hdPath).split('/')[3]), // optional, default
        index: parseInt(pathToString(hdPath).split('/')[4]), // optional, default
      });

      return wallet.accAddress('terra');
    } else {
      if (!prefix) {
        prefix = 'cosmos';
      }

      const [{ address }] = await wallet.getAccounts();
      if (!this.verifyAddress(address, prefix)) {
        throw new Error('Invalid address');
      }
      return address;
    }
  }

  async sign(msg: ChainMsg): Promise<void> {
    const txData = await msg.buildTx();
    const wallet = await DirectSecp256k1Wallet.fromKey(
      fromHex(this.key),
      msg.provider.manifest.prefix
    );
    const [{ address: senderAddress }] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
      msg.provider.manifest.rpcURL,
      wallet,
      STARGATE_CLIENT_OPTIONS
    );
    const signedTx = await client.sign(
      senderAddress,
      txData.msgs,
      txData.fee,
      txData.memo
    );
    const txBytes = TxRaw.encode(signedTx as TxRaw).finish();
    const rawTx = Buffer.from(txBytes).toString('base64');
    msg.sign(rawTx);
  }
}

export default PrivateKeySigner;

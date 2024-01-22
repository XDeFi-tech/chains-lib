import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
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
import { AccAddress, RawKey, LCDClient } from '@terra-money/feather.js';

import { ChainMsg, CosmosChainType } from '../msg';
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
    const wallet = await DirectSecp256k1Wallet.fromKey(
      fromHex(this.key),
      prefix
    );
    if (pathToString(hdPath).split('/')[2] == "60'") {
      const [{ pubkey }] = await wallet.getAccounts();
      const hash = new Keccak256(pubkey.slice(1)).digest();
      const lastTwentyBytes = toHex(hash.slice(-20));

      return getAddress('0x' + lastTwentyBytes);
    } else if (
      pathToString(hdPath).split('/')[2] == "330'" ||
      prefix === 'terra'
    ) {
      const key = new RawKey(Buffer.from(this.key, 'hex'));

      return key.accAddress('terra');
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

  async sign(
    msg: ChainMsg,
    _derivation?: string,
    chainType?: CosmosChainType
  ): Promise<void> {
    const txData = await msg.buildTx();
    if (chainType === CosmosChainType.Cosmos || !chainType) {
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
      return;
    } else if (chainType === CosmosChainType.Terra) {
      const clientOptions: Record<string, any> = {};
      clientOptions[msg.provider.manifest.chainId] = {
        chainID: msg.provider.manifest.chainId,
        lcd: msg.provider.manifest.lcdURL,
        gasAdjustment: 1.75,
        gasPrices: {
          uluna: 0.015,
        },
        prefix: msg.provider.manifest.prefix, // bech32 prefix, used by the LCD to understand which is the right chain to query
      };
      const lcdClient = new LCDClient(clientOptions);
      const terraWallet = lcdClient.wallet(
        new RawKey(Buffer.from(this.key, 'hex'))
      );

      const tx = await terraWallet.createAndSignTx({
        msgs: [txData.msgs],
        chainID: msg.provider.manifest.chainId,
      });

      msg.sign(Buffer.from(tx.toBytes()).toString('base64'));
    }
  }
}

export default PrivateKeySigner;

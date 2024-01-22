import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { fromHex } from '@cosmjs/encoding';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { bech32 } from 'bech32';
import { getAddress } from 'ethers';
import { AccAddress } from '@terra-money/feather.js';

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

  async getAddress(derivation: string, prefix: string): Promise<string> {
    const wallet = await DirectSecp256k1Wallet.fromKey(
      fromHex(this.key),
      prefix
    );
    const [{ address }] = await wallet.getAccounts();
    if (!this.verifyAddress(address, prefix)) {
      throw new Error('Invalid address');
    }
    return address;
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

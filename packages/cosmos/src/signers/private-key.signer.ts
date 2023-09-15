import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { Secp256k1HdWallet } from '@cosmjs/launchpad';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { bech32 } from 'bech32';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string, prefix: string): boolean {
    try {
      const result = bech32.decode(address);
      return result.prefix === prefix && result.words.length === 32;
    } catch (err) {
      return false;
    }
  }

  async getAddress(mnemonic: string, prefix: string): Promise<string> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix,
    });
    const [{ address }] = await wallet.getAccounts();
    if (!this.verifyAddress(address, prefix)) {
      throw new Error('Invalid address');
    }
    return address;
  }

  async sign(mnemonic: string, msg: ChainMsg): Promise<void> {
    const txData = await msg.buildTx();
    const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: msg.provider.manifest.prefix,
    });
    const tendermintClient = await Tendermint34Client.connect(
      msg.provider.manifest.rpcURL
    );
    const [{ address: senderAddress }] = await wallet.getAccounts();
    const client = await SigningStargateClient.createWithSigner(
      tendermintClient,
      wallet
    );
    const msgs = [
      {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: txData.msgs,
      },
    ];
    const signedTx = await client.sign(
      senderAddress,
      msgs,
      txData.fee,
      txData.memo
    );
    const txBytes = TxRaw.encode(signedTx as TxRaw).finish();
    const rawTx = Buffer.from(txBytes).toString('base64');
    msg.sign(rawTx);
  }
}

export default PrivateKeySigner;

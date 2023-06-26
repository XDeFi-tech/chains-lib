import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { SigningCosmosClient, Secp256k1HdWallet } from '@cosmjs/launchpad';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { bech32 } from 'bech32';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      const result = bech32.decode(address);
      return result.prefix === 'cosmos' && result.words.length === 32;
    } catch (err) {
      return false;
    }
  }

  async getAddress(privateKey: string): Promise<string> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(privateKey);
    const [{ address }] = await wallet.getAccounts();
    if (!this.verifyAddress(address)) {
      throw new Error('Invalid address');
    }
    return address;
  }

  async sign(privateKey: string, msg: ChainMsg): Promise<void> {
    const txData = await msg.buildTx();
    const wallet = await Secp256k1HdWallet.fromMnemonic(privateKey);
    const [{ address: senderAddress }] = await wallet.getAccounts();
    const client = new SigningCosmosClient(
      msg.provider?.manifest.rpcURL as string,
      senderAddress,
      wallet
    );
    const signedTx = await client.sign(txData.msgs, txData.fee, txData.memo);
    msg.sign(signedTx);
  }
}

export default PrivateKeySigner;

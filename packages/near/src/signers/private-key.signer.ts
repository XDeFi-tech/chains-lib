import {
  ChainsException,
  Signer,
  SignerDecorator,
} from '@xdefi-tech/chains-core';
import { KeyPair, utils, transactions } from 'near-api-js';
import BN from 'bn.js';
import borsh from 'borsh';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(_address: string): boolean {
    throw new Error('Method not implemented.');
  }

  async getAddress(privateKey: string): Promise<string> {
    if (!this.verifyAddress(privateKey)) {
      throw new Error('Invalid address');
    }
    throw new Error('Method not implemented.');
  }

  async sign(privateKey: string, msg: ChainMsg): Promise<void> {
    const txData = await msg.buildTx();
    const keyPair = KeyPair.fromString(privateKey);
    const publicKey = keyPair.getPublicKey();
    const accountId = Buffer.from(
      utils.PublicKey.fromString(publicKey.toString()).data
    ).toString('hex');
    const client = msg.provider.rpcProvider;
    client.config.keyStore.setKey(
      msg.provider.manifest.chainId,
      accountId,
      keyPair
    );
    const account = await client.account(accountId);
    const accessKeyInfo = await account.findAccessKey(
      txData.to,
      txData.actions
    );
    if (!accessKeyInfo) {
      throw new ChainsException(
        `Can not sign transactions for account ${accountId} on network ${msg.provider.manifest.chainId}, no matching key pair exists for this account`
      );
    }
    const { accessKey } = accessKeyInfo;
    const block = await client.connection.provider.block({ finality: 'final' });
    const nonce = accessKey.nonce.add(new BN(1));
    const blockHash = block.header.hash;
    const [_txHash, signedTx] = await transactions.signTransaction(
      txData.to,
      nonce,
      txData.actions,
      borsh.baseDecode(blockHash),
      client.connection.signer,
      accountId,
      msg.provider.manifest.chainId
    );
    const buffer = signedTx.encode();
    msg.sign(Buffer.from(buffer).toString('base64'));
  }
}

export default PrivateKeySigner;

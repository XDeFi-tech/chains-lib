import {
  Chain,
  ChainDecorator,
  DataSource,
  MsgEncoding,
  Transaction,
  TransactionData,
} from '@xdefi-tech/chains-core';
import {
  IUtxoProvider,
  UtxoProvider,
  UtxoProviderOptions,
} from '@xdefi-tech/chains-utxo';
import * as Bitcoin from 'bitcoinjs-lib';
import * as BitcoinMessage from 'bitcoinjs-message';

import { IndexerDataSource } from './datasource';
import { ChainMsg, MsgBody } from './msg';
@ChainDecorator('BitcoinProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class BitcoinProvider
  extends UtxoProvider<ChainMsg>
  implements IUtxoProvider
{
  declare dataSource: IndexerDataSource;

  static get dataSourceList() {
    return {
      IndexerDataSource: IndexerDataSource,
    };
  }
  constructor(dataSource: IndexerDataSource, options?: UtxoProviderOptions) {
    super(dataSource, options);
  }

  createMsg(data: MsgBody, encoding: MsgEncoding = MsgEncoding.object) {
    return new ChainMsg(data, this, encoding);
  }

  async broadcast(messages: ChainMsg[]): Promise<Transaction[]> {
    return this.dataSource.broadcast(messages);
  }

  /**
   * Broadcast a PSBT transaction
   * @param psbt - @param psbt - a string representing the sign psbt, encoded in hex
   * @returns The transaction hash
   */
  async broadcastPsbt(psbt: string): Promise<Transaction> {
    return this.dataSource.broadcastPsbt(psbt);
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    return this.dataSource.getTransaction(txHash);
  }

  public async scanUTXOs(
    address: string,
    options?: { includeOrigins: boolean }
  ) {
    const utxos = await this.dataSource.scanUTXOs(address);
    if (options?.includeOrigins) {
      return utxos;
    }
    const ordinals = await this.getNFTBalance(address);
    return utxos.filter((utxo) =>
      (ordinals as any[]).every(
        (ordinals) =>
          !String(ordinals.location).startsWith(`${utxo.hash}:${utxo.index}`)
      )
    );
  }

  static verifyAddress(address: string): boolean {
    try {
      Bitcoin.address.toOutputScript(address);
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Verify a message signature
   * @param message - The message to verify
   * @param signature - The base64 signature to verify
   * @param address - The address that signed the message
   * @returns true if the signature is valid, false otherwise
   */
  static verifyMessageSignature(
    message: string,
    signature: string,
    address: string
  ): boolean {
    return BitcoinMessage.verify(
      message,
      address,
      Buffer.from(signature, 'base64'),
      undefined,
      true
    );
  }
}

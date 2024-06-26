import {
  Balance,
  Chain,
  ChainDecorator,
  Coin,
  DataSource,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
  Msg,
  MsgData,
  MsgEncoding,
  Response,
  Transaction,
  TransactionData,
  TransactionStatus,
} from '@xdefi-tech/chains-core';
import { Connection } from '@solana/web3.js';
import { some } from 'lodash';

import { IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';

@ChainDecorator('SolanaProvider', {
  deps: [],
  providerType: 'Solana',
  features: [Chain.ChainFeatures.TOKENS],
})
export class SolanaProvider extends Chain.Provider {
  declare rpcProvider: Connection;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    this.rpcProvider = new Connection(this.manifest.rpcURL);
  }

  createMsg(data: MsgData, encoding: MsgEncoding = MsgEncoding.object): Msg {
    return new ChainMsg(data, this, encoding);
  }

  async getTransactions(
    address: string,
    afterBlock?: number | string
  ): Promise<Response<Transaction[], Transaction>> {
    return new Response(
      () => this.dataSource.getTransactions({ address, afterBlock }),
      () => this.dataSource.subscribeTransactions({ address })
    );
  }

  async estimateFee(
    msgs: Msg[],
    speed: GasFeeSpeed = GasFeeSpeed.medium
  ): Promise<FeeData[]> {
    return this.dataSource.estimateFee(msgs, speed);
  }

  async getNFTBalance(address: string) {
    return this.dataSource.getNFTBalance(address);
  }

  async getBalance(address: string): Promise<Response<Coin[], Balance[]>> {
    return new Response(
      () => this.dataSource.getBalance({ address }),
      () => this.dataSource.subscribeBalance({ address })
    );
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    return this.dataSource.gasFeeOptions();
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async broadcast(msgs: ChainMsg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }

    const transactions: Transaction[] = [];
    for (const msg of msgs) {
      const hash = await this.rpcProvider.sendRawTransaction(
        msg.signedTransaction,
        {
          skipPreflight: true,
          maxRetries: 2,
        }
      );
      transactions.push(Transaction.fromData({ hash }));
    }

    return transactions;
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const tx = await this.rpcProvider.getTransaction(txHash);
    if (!tx) {
      return null;
    }
    const result = {
      hash: tx.transaction.message.recentBlockhash,
      status: TransactionStatus.pending,
      from: '',
      to: '',
    };

    if (tx.meta?.err) {
      result.status = TransactionStatus.failure;
    } else if (tx.slot) {
      result.status = TransactionStatus.success;
    }

    return result;
  }

  static get dataSourceList() {
    return {
      IndexerDataSource: IndexerDataSource,
    };
  }
}

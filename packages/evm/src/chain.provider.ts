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
  Response,
  Transaction,
  TransactionData,
  TransactionStatus,
} from '@xdefi-tech/chains-core';
import { providers } from 'ethers';
import { some } from 'lodash';

import { ChainDataSource, IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';
import { decryptParams, paramToString } from './utils';

@ChainDecorator('EvmProvider', {
  deps: [],
  providerType: 'EVM',
  features: [
    Chain.ChainFeatures.TOKENS,
    Chain.ChainFeatures.NFT,
    Chain.ChainFeatures.EIP1559,
  ],
})
export class EvmProvider extends Chain.Provider {
  rpcProvider: providers.StaticJsonRpcProvider;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    this.rpcProvider = new providers.StaticJsonRpcProvider(
      this.dataSource.manifest.rpcURL
    );
  }

  createMsg(data: MsgData): Msg {
    return new ChainMsg(data, this);
  }

  async broadcast(msgs: Msg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }

    const transactions = [];

    for (const msg of msgs) {
      const tx = await this.rpcProvider.sendTransaction(
        msg.signedTransaction as string
      );
      transactions.push(Transaction.fromData(tx));
    }

    return transactions;
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

  async estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<FeeData[]> {
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

  async getNonce(address: string): Promise<number> {
    return this.dataSource.getNonce(address);
  }

  static get dataSourceList() {
    return {
      IndexerDataSource: IndexerDataSource,
      ChainDataSource: ChainDataSource,
    };
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const tx = await this.rpcProvider.getTransaction(txHash);
    if (!tx) {
      return null;
    }

    const result: TransactionData = {
      hash: tx.hash,
      from: tx.from || '',
      to: tx.to || '',
      status: TransactionStatus.pending,
    };

    if (tx.blockNumber !== null) {
      const receipt = await this.rpcProvider.getTransactionReceipt(txHash);

      result.from = receipt.from;
      result.to = receipt.to;
      result.status =
        receipt.status === 1
          ? TransactionStatus.success
          : TransactionStatus.failure;
      result.data = tx.data;
    }

    return result;
  }

  static get staticUtils() {
    return {
      paramToString,
      decryptParams,
    };
  }
}

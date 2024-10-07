import {
  Balance,
  BalanceFilter,
  Coin,
  DataSource,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
  getSupportedIndexer,
  Transaction,
  TransactionsFilter,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';

import { COSMOS_INDEXER_CHAIN, CosmosManifest } from '../../manifests';
import { IndexerDataSource } from '../indexer/indexer.data-source';
import { ChainDataSource } from '../chain/chain.data-source';
import { ChainMsg } from '../../msg';

export class CtrlDataSource extends DataSource {
  public readonly indexerDataSource: IndexerDataSource;
  public readonly chainDataSource: ChainDataSource;

  constructor(manifest: CosmosManifest) {
    super(manifest);
    this.indexerDataSource = new IndexerDataSource(manifest);
    this.chainDataSource = new ChainDataSource(manifest);
  }

  async isSupportedChain() {
    if (COSMOS_INDEXER_CHAIN[this.manifest.chain]) {
      return true;
    }
    const result = await getSupportedIndexer(this.manifest.chainId);
    if (result && result.indexer && result.indexerName) {
      COSMOS_INDEXER_CHAIN[this.manifest.chain] = result.indexerName;
      return true;
    }
    return false;
  }

  async getNFTBalance(address: string): Promise<any> {
    const isSupportedChain = await this.isSupportedChain();
    if (isSupportedChain) {
      try {
        return await this.indexerDataSource.getNFTBalance(address);
      } catch (error) {
        return this.chainDataSource.getNFTBalance(address);
      }
    }
    return this.chainDataSource.getNFTBalance(address);
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const isSupportedChain = await this.isSupportedChain();
    if (isSupportedChain) {
      try {
        return await this.indexerDataSource.getBalance(filter);
      } catch (error) {
        return this.chainDataSource.getBalance(filter);
      }
    }
    return this.chainDataSource.getBalance(filter);
  }

  async subscribeBalance(
    filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    const isSupportedChain = await this.isSupportedChain();
    if (isSupportedChain) {
      return this.indexerDataSource.subscribeBalance(filter);
    }
    return this.chainDataSource.subscribeBalance(filter);
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const isSupportedChain = await this.isSupportedChain();
    if (isSupportedChain) {
      try {
        return await this.indexerDataSource.getTransactions(filter);
      } catch (error) {
        return this.chainDataSource.getTransactions(filter);
      }
    }
    return this.chainDataSource.getTransactions(filter);
  }

  async subscribeTransactions(
    filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    const isSupportedChain = await this.isSupportedChain();
    if (isSupportedChain) {
      return this.indexerDataSource.subscribeTransactions(filter);
    }
    return this.chainDataSource.subscribeTransactions(filter);
  }

  async estimateFee(msgs: ChainMsg[], speed: GasFeeSpeed): Promise<FeeData[]> {
    const isSupportedChain = await this.isSupportedChain();
    if (isSupportedChain) {
      return this.indexerDataSource.estimateFee(msgs, speed);
    }
    return this.chainDataSource.estimateFee(msgs, speed);
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    const isSupportedChain = await this.isSupportedChain();
    if (isSupportedChain) {
      return this.indexerDataSource.gasFeeOptions();
    }
    return this.chainDataSource.gasFeeOptions();
  }
}

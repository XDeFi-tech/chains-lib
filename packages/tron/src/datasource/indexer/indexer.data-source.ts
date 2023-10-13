import {
  DataSource,
  Coin,
  FeeOptions,
  GasFeeSpeed,
  Transaction,
  Injectable,
  Chain,
  TransactionsFilter,
  BalanceFilter,
  Balance,
  FeeData,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';

import { ChainMsg } from '../../msg';

@Injectable()
export class IndexerDataSource extends DataSource {
  constructor(manifest: Chain.Manifest) {
    super(manifest);
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
  }

  async getBalance(_filter: BalanceFilter): Promise<Coin[]> {
    throw new Error('Method not implemented.');
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactions(_filter: TransactionsFilter): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  async estimateFee(
    _msgs: ChainMsg[],
    _speed: GasFeeSpeed
  ): Promise<FeeData[]> {
    throw new Error('Method not implemented.');
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    throw new Error('Method not implemented.');
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

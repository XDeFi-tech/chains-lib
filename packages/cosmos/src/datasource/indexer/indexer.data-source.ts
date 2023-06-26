import {
  Asset,
  DataSource,
  Coin,
  GasFeeSpeed,
  Transaction,
  Injectable,
  TransactionsFilter,
  BalanceFilter,
  Balance,
  FeeOptions,
  FeeData,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';

import { ChainMsg } from '../../msg';
import { CosmosHubChains } from '../../manifests';
import * as manifests from '../../manifests';

import { getBalance, getTransactions } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  declare readonly manifest: manifests.CosmosManifest;

  constructor(manifest: manifests.CosmosManifest) {
    super(manifest);
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const {
      data: { cosmos },
    } = await getBalance(this.manifest.chain as CosmosHubChains, address);
    // cut off balances without asset
    const balances = cosmos.balances.filter(
      (b) => b.asset.symbol && b.asset.id
    );

    return balances.map((balance): Coin => {
      const { asset, amount } = balance;

      return new Coin(
        new Asset({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: asset.id!,
          chainId: this.manifest.chainId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          name: asset.name!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          symbol: asset.symbol!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          icon: asset.image!,
          native: !Boolean(asset.contract),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          address: asset.contract!,
          price: asset.price?.amount,
          decimals: asset.price?.scalingFactor,
        }),
        new BigNumber(amount.value).dividedBy(10 ** (asset.decimals as number))
      );
    });
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address } = filter;

    const {
      data: { cosmos },
    } = await getTransactions(this.manifest.chain as CosmosHubChains, address);

    return cosmos.transactions.edges.map((transaction) => {
      return Transaction.fromData(transaction);
    });
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
    return this.manifest.feeGasStep;
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

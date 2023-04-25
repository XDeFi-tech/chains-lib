import {
  Asset,
  DataSource,
  Coin,
  GasFeeSpeed,
  Transaction,
  Injectable,
  Chain,
  TransactionsFilter,
  BalanceFilter,
  Balance,
  FeeOptions,
  FeeData,
} from '@xdefi/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import { InputMaybe, BlockRange } from '@xdefi/graphql';

import { ChainMsg } from '../../msg';
import { CosmosHubChains } from '../../manifests';

import { getBalance, getTransactions, getStatus } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  constructor(manifest: Chain.Manifest) {
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
        new BigNumber(amount.value).dividedBy(10 ** amount.scalingFactor)
      );
    });
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address, afterBlock } = filter;
    let slotRange: InputMaybe<BlockRange> = null;

    if (afterBlock) {
      const {
        data: { cosmos },
      } = await getStatus(this.manifest.chain as CosmosHubChains);
      slotRange = {
        from: Number(afterBlock),
        to: Number(cosmos.status.lastBlock),
      };
    }

    const {
      data: { cosmos },
    } = await getTransactions(
      this.manifest.chain as CosmosHubChains,
      address,
      slotRange
    );

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
    throw new Error('Method not implemented.');
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

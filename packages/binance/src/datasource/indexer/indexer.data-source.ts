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
  FeeData,
  FeeOptions,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';

import { OptBlockRange } from '../../gql/graphql';
import { ChainMsg } from '../../msg';

import { getBalance, getFees, getStatus, getTransaction } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  constructor(manifest: Chain.Manifest) {
    super(manifest);
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const {
      data: { binance },
    } = await getBalance(address);

    return binance.balances.reduce((result, balance) => {
      const { asset, amount } = balance;
      if (asset.id && asset.symbol && asset.name) {
        result.push(
          new Coin(
            new Asset({
              id: asset.id,
              chainId: this.manifest.chainId,
              name: asset.name,
              symbol: asset.symbol,
              icon: asset.image,
              native: asset.contract === null || asset.contract === undefined,
              address: asset.contract,
              price: asset.price?.amount,
              decimals: asset.decimals || 0,
              priceChange: {
                dayPriceChange: asset.price?.dayPriceChange,
              },
              type: asset.type,
              categories: asset.categories,
            }),
            new BigNumber(amount.value)
              .dividedBy(10 ** (asset.decimals || 0))
              .toString()
          )
        );
      }
      return result;
    }, [] as Coin[]);
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  private async getBlockRange(
    afterBlock: TransactionsFilter['afterBlock']
  ): Promise<OptBlockRange> {
    if (afterBlock === undefined || afterBlock === null) return {};
    const { data } = await getStatus();

    return {
      from: parseInt(`${afterBlock}`),
      to: data.binance.status.lastBlock?.height,
    };
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address, afterBlock } = filter;
    const blockRange = await this.getBlockRange(afterBlock);
    const { data } = await getTransaction(address, blockRange);
    return data.binance.transactions.edges.map(({ node: transaction }) =>
      Transaction.fromData(transaction)
    );
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  async estimateFee(msgs: ChainMsg[], speed: GasFeeSpeed): Promise<FeeData[]> {
    const fees = await this.gasFeeOptions();
    if (!fees) {
      return [];
    }
    return msgs.map(() => ({
      gasLimit: 0,
      gasPrice: fees[speed] as number,
    }));
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    const { data } = await getFees();
    const sendFeeEntity = data.binance?.fee.find(
      (f: any) => f.fixedFeeParams && f.fixedFeeParams.msgType === 'send'
    );

    if (!sendFeeEntity) {
      return null;
    }

    return {
      [GasFeeSpeed.high]: sendFeeEntity.fixedFeeParams.fee,
      [GasFeeSpeed.medium]: sendFeeEntity.fixedFeeParams.fee,
      [GasFeeSpeed.low]: sendFeeEntity.fixedFeeParams.fee,
    };
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

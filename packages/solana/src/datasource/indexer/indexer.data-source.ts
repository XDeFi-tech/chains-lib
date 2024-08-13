import {
  Asset,
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
  NumberIsh,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';

import { ChainMsg } from '../../msg';
import { DEFAULT_FEE } from '../../constants';

import { getBalance, getTransactions, getFees, getNFTBalance } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  constructor(manifest: Chain.Manifest) {
    super(manifest);
  }

  async getNFTBalance(address: string) {
    return getNFTBalance(address);
  }

  async getBalance(_filter: BalanceFilter): Promise<Coin[]> {
    const { address } = _filter;
    const { data } = await getBalance(address);
    // cut off balances without asset
    const balances = data.solana.balances.filter(
      (b: any) => b.asset.symbol && b.asset.id
    );

    return balances.map((balance: any): Coin => {
      const { asset, amount } = balance;

      return new Coin(
        new Asset({
          id: asset.id,
          chainId: this.manifest.chainId,
          name: asset.name,
          symbol: asset.symbol,
          icon: asset.image,
          native: !Boolean(asset.contract),
          address: asset.contract,
          price: asset.price?.amount,
          decimals: asset.decimals,
          priceChange: {
            dayPriceChange: asset.price?.dayPriceChange,
          },
        }),
        new BigNumber(amount.value)
          .integerValue()
          .dividedBy(Math.pow(10, asset.decimals))
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
    const transactions = await getTransactions(address);

    return transactions.map((transaction) => {
      return Transaction.fromData(transaction);
    });
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  async estimateFee(msgs: ChainMsg[], speed: GasFeeSpeed): Promise<FeeData[]> {
    const feeOptions = await this.gasFeeOptions();
    if (!feeOptions) {
      return [];
    }

    return msgs.map(() => ({
      gasLimit: 0,
      gasPrice: feeOptions[speed] as NumberIsh,
    }));
  }

  async gasFeeOptions(): Promise<FeeOptions> {
    const result: FeeOptions = {
      [GasFeeSpeed.high]: DEFAULT_FEE,
      [GasFeeSpeed.medium]: DEFAULT_FEE,
      [GasFeeSpeed.low]: DEFAULT_FEE,
    };
    try {
      const { data } = await getFees();
      if (data.solana.fee) {
        result[GasFeeSpeed.high] = data.solana.fee.high || DEFAULT_FEE;
        result[GasFeeSpeed.medium] = data.solana.fee.medium || DEFAULT_FEE;
        result[GasFeeSpeed.low] = data.solana.fee.low || DEFAULT_FEE;
      }
    } catch (err) {
      console.error('Error while getting fees for solana');
      console.error(err);
    }
    return result;
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

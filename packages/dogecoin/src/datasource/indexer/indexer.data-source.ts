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
  FeeData,
  DefaultFeeOptions,
} from '@xdefi-tech/chains-core';
import type { UTXOManifest } from '@xdefi-tech/chains-utxo';
import { utils } from 'ethers';
import { Observable } from 'rxjs';
import { OptBlockRange } from '@xdefi-tech/chains-graphql';

import { ChainMsg } from '../../msg';

import { getBalance, getStatus, getTransactions, getFees } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  constructor(manifest: UTXOManifest) {
    super(manifest);
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const balances = await getBalance(address);

    return balances.reduce((result, balance) => {
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
            }),
            utils.formatUnits(amount.value, asset.decimals || 0)
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
    const status = await getStatus();

    return {
      from: parseInt(`${afterBlock}`),
      to: status.lastBlock,
    };
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address, afterBlock } = filter;
    let blockRange: OptBlockRange = {
      from: null,
      to: null,
    };

    if (afterBlock) {
      blockRange = await this.getBlockRange(afterBlock);
    }

    const transactions = await getTransactions(
      this.manifest.chain,
      address,
      blockRange
    );

    return transactions.map((transaction) => Transaction.fromData(transaction));
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  async estimateFee(
    messages: ChainMsg[],
    speed: GasFeeSpeed
  ): Promise<FeeData[]> {
    const feeOptions = await this.gasFeeOptions();
    if (!feeOptions) return [];
    return messages.map(() => {
      return {
        gasLimit: feeOptions[speed],
      };
    });
  }

  async gasFeeOptions(): Promise<DefaultFeeOptions | null> {
    return await getFees();
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

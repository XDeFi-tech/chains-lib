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
import {
  LcdClient,
  setupBankExtension,
  setupAuthExtension,
  SearchBySentFromOrToQuery,
} from '@cosmjs/launchpad';

import { ChainMsg } from '../../msg';

import { getAssets } from './queries';

@Injectable()
export class ChainDataSource extends DataSource {
  constructor(manifest: Chain.Manifest) {
    super(manifest);
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const client = LcdClient.withExtensions(
      { apiUrl: this.manifest.rpcURL },
      setupBankExtension,
      setupAuthExtension
    );
    const balances = await client.bank.balances(address);
    const contractAddresses = balances.result.map(({ denom }) => denom);
    const assets = await getAssets(contractAddresses);

    // todo try to get with CryptoAsset

    return balances.result.reduce((result: Coin[], { amount, denom }) => {
      const asset = assets.data.assets.tokens?.page?.edges?.find((a) =>
        a.node?.contracts?.some((c) => c.address === denom)
      );

      if (!asset) {
        return result;
      }

      const coin = new Coin(
        new Asset({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: asset.node!.id!,
          chainId: this.manifest.chainId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          name: asset.node!.name!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          symbol: asset.node!.symbol!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          icon: asset.node!.icon!,
          native: !Boolean(asset.node!.contracts),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          address: asset.node!.contracts![0].address!,
          price: asset.node!.price?.amount,
          decimals: asset.node!.price?.scalingFactor,
        }),
        new BigNumber(amount)
      );

      result.push(coin);
      return result;
    }, []);
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address } = filter;
    const lcdClient = new LcdClient(this.manifest.rpcURL);
    const searchTxQuery: SearchBySentFromOrToQuery = {
      sentFromOrTo: address,
    };
    const results = await lcdClient.txsQuery(JSON.stringify(searchTxQuery));
    // todo get assets for transactions
    return results.txs.map((tx) => Transaction.fromData(tx));
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

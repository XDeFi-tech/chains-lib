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
} from '@xdefi/chains-core';
import { utils } from 'ethers';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { EVMChains, EVM_MANIFESTS } from '../../manifests';
import { ChainMsg } from '../../msg';

import { subscribeBalances, subscribeTransactions } from './subscriptions';
import { getBalance, getFees, getStatus, getTransaction } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  constructor(manifest: Chain.Manifest) {
    super(manifest);
    if (!EVM_MANIFESTS[manifest.chain as EVMChains]) {
      throw new Error(
        'Please use EVM_MANIFESTS for indexer data source to avoid gql incompatibility'
      );
    }
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const { data } = await getBalance(
      this.manifest.chain as EVMChains,
      address
    );

    // cut off balances without asset
    const balances = data[this.manifest.chain].balances.filter(
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
          decimals: asset.price?.scalingFactor,
        }),
        utils.formatUnits(amount.value, amount.scalingFactor)
      );
    });
  }

  async subscribeBalance(
    filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    const { address } = filter;
    return from(
      subscribeBalances(this.manifest.chain as EVMChains, address)
    ).pipe(
      map((result: any) => {
        return result?.data?.ethereumBalances; // create coin
      }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { afterBlock, address } = filter;
    let blockRange = null;

    if (typeof afterBlock === 'number' || typeof afterBlock === 'string') {
      const { data } = await getStatus(this.manifest.chain);
      blockRange = {
        from: parseInt(String(afterBlock)),
        to: data[this.manifest.chain].status.lastBlock,
      };
    }

    const { data } = await getTransaction(
      this.manifest.chain as EVMChains,
      address,
      blockRange
    );

    return data[this.manifest.chain].transactions.map((transaction: any) => {
      return Transaction.fromData(transaction);
    });
  }

  async subscribeTransactions(
    filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    const { address } = filter;
    return from(
      subscribeTransactions(this.manifest.chain as EVMChains, address)
    ).pipe(
      map((result: any): Transaction => {
        const txData = result?.data.ethereumTransactions;
        return Transaction.fromData({
          from: txData.fromAddress,
          to: txData.toAddress,
          hash: txData.hash,
          status: txData.status,
        });
      }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  async estimateFee(
    msgs: ChainMsg[],
    speed: GasFeeSpeed = GasFeeSpeed.medium
  ): Promise<FeeData[]> {
    const { data } = await getFees(this.manifest.chain);
    const fee = data[this.manifest.chain].fee;
    const isEIP1559 = typeof fee[speed]?.priorityFeePerGas === 'number';
    const transactionFee = 21000; // Paid for every transaction

    // gasLimit = 21000 + 68 * dataByteLength
    // https://ethereum.stackexchange.com/questions/39401/how-do-you-calculate-gas-limit-for-transaction-with-data-in-ethereum

    return msgs.map((msg) => {
      const msgData = msg.toData().data;
      const feeForData =
        msgData && msgData !== '0x'
          ? 68 * new TextEncoder().encode(msgData.toString()).length
          : 0;
      const gasLimit = transactionFee + feeForData;
      return isEIP1559
        ? {
            gasLimit,
            gasPrice: undefined,
            maxFeePerGas: fee[speed]?.maxFeePerGas,
            maxPriorityFeePerGas: fee[speed]?.priorityFeePerGas,
          }
        : {
            gasLimit,
            gasPrice: fee[speed],
            maxFeePerGas: undefined,
            maxPriorityFeePerGas: undefined,
          };
    });
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    const { data } = await getFees(this.manifest.chain);
    return data[this.manifest.chain].fee;
  }

  async getNonce(address: string): Promise<number> {
    return this.rpcProvider.getTransactionCount(address);
  }
}
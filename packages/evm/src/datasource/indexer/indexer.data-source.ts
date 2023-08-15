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
} from '@xdefi-tech/chains-core';
import { utils, providers } from 'ethers';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { EVMChains, EVM_MANIFESTS } from '../../manifests';
import { ChainMsg } from '../../msg';
import { DEFAULT_CONTRACT_FEE, DEFAULT_TRANSACTION_FEE } from '../../constants';

import { subscribeBalances, subscribeTransactions } from './subscriptions';
import { getBalance, getFees, getStatus, getTransaction } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  declare rpcProvider: providers.StaticJsonRpcProvider;
  constructor(manifest: Chain.Manifest) {
    super(manifest);
    if (!EVM_MANIFESTS[manifest.chain as EVMChains]) {
      throw new Error(
        'Please use EVM_MANIFESTS for indexer data source to avoid gql incompatibility'
      );
    }
    this.rpcProvider = new providers.StaticJsonRpcProvider(
      this.manifest.rpcURL
    );
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
          decimals: asset.decimals,
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

    // gasLimit = 21000 + 68 * dataByteLength
    // https://ethereum.stackexchange.com/questions/39401/how-do-you-calculate-gas-limit-for-transaction-with-data-in-ethereum

    const feeData: FeeData[] = [];
    for (const msg of msgs) {
      const msgData = msg.toData();
      let gasLimit: number;

      if (msgData.contractAddress) {
        gasLimit = DEFAULT_CONTRACT_FEE;
      } else {
        const calculateData = msgData.data;
        const feeForData =
          calculateData && calculateData !== '0x'
            ? 68 * new TextEncoder().encode(calculateData.toString()).length
            : 0;
        gasLimit = Math.ceil((DEFAULT_TRANSACTION_FEE + feeForData) * 1.5); // 1.5 -> FACTOR_ESTIMATE
      }
      const msgFeeData = isEIP1559
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
      feeData.push(msgFeeData);
    }

    return feeData;
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    const { data } = await getFees(this.manifest.chain);
    return data[this.manifest.chain].fee;
  }

  async getNonce(address: string): Promise<number> {
    return this.rpcProvider.getTransactionCount(address);
  }
}

import {
  Asset,
  Balance,
  BalanceFilter,
  Chain,
  Coin,
  DataSource,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
  Injectable,
  MsgEncoding,
  Transaction,
  TransactionsFilter,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import {
  Connection,
  Transaction as SolanaTransaction,
  VersionedTransaction,
} from '@solana/web3.js';

import { ChainMsg } from '../../msg';

import { getBalance, getNFTBalance, getTransactions } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  declare rpcProvider: Connection;

  constructor(manifest: Chain.Manifest) {
    super(manifest);
    this.rpcProvider = new Connection(this.manifest.rpcURL);
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
          type: asset.type,
          categories: asset.categories,
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

  async estimateFee(
    msgs: ChainMsg[],
    _speed: GasFeeSpeed = GasFeeSpeed.medium
  ): Promise<FeeData[]> {
    const feeData: FeeData[] = [];

    for (const msg of msgs) {
      let dataForEstimate = null;
      const txData = await msg.buildTx();
      switch (txData.encoding) {
        case MsgEncoding.object:
          const transaction = txData.tx as SolanaTransaction;
          dataForEstimate = transaction.compileMessage();
          break;
        case MsgEncoding.base64:
        case MsgEncoding.base58:
          const versionedTransaction = txData.tx as VersionedTransaction;
          dataForEstimate = versionedTransaction.message;
          try {
            const slot = await this.rpcProvider.getSlot('finalized');
            // get the latest block (allowing for v0 transactions)
            const block = await this.rpcProvider.getBlock(slot, {
              maxSupportedTransactionVersion: 0,
            });
            if (block) {
              dataForEstimate.recentBlockhash = block.blockhash;
            }
          } catch (error) {
            console.warn('Block data for slot ${slot} is unavailable.');
          }
          break;
        default:
          throw new Error('Invalid encoding for solana transaction');
      }
      try {
        const fee = await this.rpcProvider.getFeeForMessage(
          dataForEstimate,
          'confirmed'
        );
        if (!fee) {
          throw new Error(
            `Cannot estimate fee for chain ${this.manifest.chain}`
          );
        }

        feeData.push({ gasLimit: fee.value ?? 0 });
      } catch (e) {
        console.warn(`Cannot estimate fee for chain ${this.manifest.chain}`, e);
        feeData.push({ gasLimit: 0 });
      }
    }

    return feeData;
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    return null;
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

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
  TransactionData,
  TransactionStatus,
} from '@xdefi-tech/chains-core';
import { UTXO, UTXOManifest } from '@xdefi-tech/chains-utxo';
import { utils } from 'ethers';
import { Observable } from 'rxjs';
import * as BitcoinCash from 'bitcoinjs-lib';

import { ChainMsg } from '../../msg';

import {
  getBalance,
  getTransactions,
  getFees,
  broadcast,
  scanUTXOs,
  getTransactionByHash,
} from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  constructor(manifest: UTXOManifest) {
    super(manifest);
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
  }

  async broadcast(messages: ChainMsg[]): Promise<Transaction[]> {
    const result: Transaction[] = [];
    for await (const message of messages) {
      const { signedTransaction } = message;

      if (!message.hasSignature || !signedTransaction) {
        throw new Error(`Message ${JSON.stringify(message)} is not signed`);
      }

      const txHash = await broadcast(signedTransaction);

      result.push(Transaction.fromData({ hash: txHash }));
    }

    return result;
  }

  async scanUTXOs(address: string): Promise<UTXO[]> {
    const utxos = await scanUTXOs(address);
    return utxos.map((utxo) => {
      const tx = BitcoinCash.Transaction.fromHex(utxo.oTxHex as string);
      const utxoMapped: UTXO = {
        hash: utxo.oTxHash,
        index: utxo.oIndex,
        value: parseInt(utxo.value.value),
        txHex: utxo.oTxHex as string,
        witnessUtxo: tx.outs[utxo.oIndex],
      };
      return utxoMapped;
    });
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
              priceChange: {
                dayPriceChange: asset.price?.dayPriceChange,
              },
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

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address } = filter;
    const transactions = await getTransactions(this.manifest.chain, address);

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

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const tx = await getTransactionByHash(txHash);
    let response = null;

    if (tx && tx.hash) {
      response = {
        hash: tx.hash,
        from: (tx.inputs && tx.inputs[0].address) || '',
        to: (tx.outputs && tx.outputs[0].address) || '',
        status:
          (tx.blockNumber || 0) > 0
            ? TransactionStatus.success
            : TransactionStatus.pending,
      };
    }

    return response;
  }
}

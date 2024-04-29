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
import Bitcoin from 'bitcoinjs-lib';
import {
  UTXO,
  UTXODataProvider,
  UTXOManifest,
  UTXOTransaction,
} from '@xdefi-tech/chains-utxo';
import { utils } from 'ethers';
import { Observable } from 'rxjs';

import { ChainMsg } from '../../msg';

import {
  getBalance,
  getTransactions,
  getFees,
  getNFTBalance,
  broadcast,
  scanUTXOs,
} from './queries';

@Injectable()
export class IndexerDataSource extends DataSource implements UTXODataProvider {
  constructor(manifest: UTXOManifest) {
    super(manifest);
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
      const tx = Bitcoin.Transaction.fromHex(utxo.oTxHex);
      const utxoMapped: UTXO = {
        hash: utxo.oTxHash,
        index: utxo.oIndex,
        value: utxo.value.value,
        txHex: utxo.oTxHex,
        witnessUtxo: tx.outs[utxo.oIndex],
      };
      return utxoMapped;
    });
  }

  getTransaction(txid: string): Promise<UTXOTransaction> {
    throw new Error('Method not implemented.');
  }

  async getNFTBalance(address: string) {
    return getNFTBalance(address);
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
}

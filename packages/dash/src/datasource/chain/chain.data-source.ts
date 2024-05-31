import {
  Asset,
  Balance,
  BalanceFilter,
  Chain,
  Coin,
  DataSource,
  DefaultFeeOptions,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
  Injectable,
  MethodNotImplementedException,
  Msg,
  Transaction,
  TransactionAction,
  TransactionData,
  TransactionsFilter,
  TransactionStatus,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import { providers } from 'ethers';
import axios, { Axios } from 'axios';
import { UTXO } from '@xdefi-tech/chains-utxo';
import BigNumber from 'bignumber.js';

@Injectable()
export class ChainDataSource extends DataSource {
  api: Axios;
  etherscanProvider: providers.EtherscanProvider;

  constructor(manifest: Chain.Manifest) {
    super(manifest);

    this.api = axios.create({
      baseURL: 'https://explorer.dash.org/insight-api/',
    });
    this.etherscanProvider = new providers.EtherscanProvider();
  }

  estimateFee(msg: Msg[], speed: GasFeeSpeed): Promise<FeeData[]> {
    throw new MethodNotImplementedException();
  }

  gasFeeOptions(): Promise<FeeOptions | null> {
    const defaultFee: DefaultFeeOptions = {
      high: 10,
      medium: 5,
      low: 0,
    };

    return Promise.resolve(defaultFee);
  }

  getBalance(filter: BalanceFilter): Promise<Coin[]>;
  getBalance(filter: BalanceFilter, tokenAddresses?: string[]): Promise<Coin[]>;
  async getBalance(
    filter: BalanceFilter,
    tokenAddresses?: string[]
  ): Promise<Coin[]> {
    const { address } = filter;

    const response = await this.api.get(`addr/${address}/balance`);

    return Promise.resolve(
      response.data
        ? [
            new Coin(
              new Asset({
                chainId: this.manifest.chainId,
                name: this.manifest.name,
                symbol: this.manifest.chainSymbol,
                native: true,
              }),
              new BigNumber(response.data)
                .integerValue()
                .dividedBy(Math.pow(10, this.manifest.decimals))
            ),
          ]
        : []
    );
  }

  getNFTBalance(address: string): Promise<any> {
    throw new MethodNotImplementedException();
  }

  async getRawTransaction(txid: string): Promise<string> {
    const { data } = await this.api.get(`/rawtx/${txid}`);

    return data.rawtx;
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const transactions = [];

    let page = 1;
    let response;

    do {
      response = await this.api.get(
        `/txs/?address=${filter.address}&pageNum=${page}`
      );

      transactions.push(...response.data.txs);

      page++;
    } while (page < response.data.pagesTotal);

    return Promise.resolve(transactions);
  }

  async getUnspentOutputs(address: string): Promise<UTXO[]> {
    const utxos = await this.api.get(`/addr/${address}/utxo`);

    return await Promise.all(
      utxos.data.map(async (utxo: any) => ({
        hash: utxo.txid,
        index: utxo.vout,
        value: utxo.satoshis,
        witnessUtxo: {
          script: utxo.scriptPubKey,
          value: utxo.satoshis,
        },
        txHex: await this.getRawTransaction(utxo.txid),
      }))
    );
  }

  public async getTransaction(
    _txHash: string
  ): Promise<TransactionData | null> {
    const { data } = await this.api.get(`tx/${_txHash}`);
    const { txid, vin, vout, time } = data;

    const from = (vin.length && vin[0].addr) || '';
    const to =
      (vout.length &&
        vout[0].scriptPubKey?.addresses?.length &&
        vout[0].scriptPubKey.addresses[0]) ||
      '';

    return Promise.resolve({
      hash: txid,
      to,
      from,
      status: TransactionStatus.success,
      action: TransactionAction.SEND,
      date: time * 1000,
    });
  }

  subscribeBalance(filter: BalanceFilter): Promise<Observable<Balance[]>> {
    throw new MethodNotImplementedException();
  }

  subscribeTransactions(
    filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new MethodNotImplementedException();
  }
}

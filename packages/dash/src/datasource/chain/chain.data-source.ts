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
    const feeOptions = this.gasFeeOptions();
    return Promise.resolve([]);
  }

  gasFeeOptions(): Promise<FeeOptions | null> {
    const defaultFee: DefaultFeeOptions = {
      high: 5,
      medium: 1,
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
    const { address, afterBlock } = filter;

    const response = await this.api.get(`addr/${address}/balance`);

    return Promise.resolve(
      response.data
        ? [
            new Coin(
              new Asset({
                chainId: 'dash',
                name: 'DASH',
                symbol: 'DASH',
                native: true,
              }),
              response.data
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
    // return Promise.resolve([{
    //   hash: string;
    //   to: string;
    //   from: string;
    //   status: TransactionStatus;
    //   data?: string;
    //   action?: TransactionAction;
    //   date?: number;
    //   amount?: string;
    //   contractAddress?: string;
    // }]);

    return Promise.resolve([]);
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

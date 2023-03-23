import {
  DataSource,
  Chain,
  ChainDecorator,
  Coin,
  GasFee,
  GasFeeSpeed,
  Msg,
  Response,
  Transaction,
  Balance,
} from '@xdefi/chains-core';
import { Axios } from 'axios';

import 'reflect-metadata';
import { BitcoinChainMessage, BitcoinMessageBody } from './bitcoinMessage';
import { HaskoinDataSource } from './datasource/haskoin/haskoin.data-source';

interface BitcoinOptions extends Chain.IOptions {
  haskoinUrl?: string;
  blockstreamBaseUrl?: string;
}

@ChainDecorator('BtcProvider', {
  deps: [],
  providerType: 'btc',
})
export class BtcProvider extends Chain.Provider {
  rpcProvider = null;
  api: Axios;
  haskoin: HaskoinDataSource;

  constructor(dataSource: DataSource, options?: BitcoinOptions) {
    super(dataSource, options);
    this.api = new Axios({
      baseURL: options?.blockstreamBaseUrl ?? 'https://blockstream.info',
    });
    this.haskoin = new HaskoinDataSource(options?.haskoinUrl);
  }

  createMsg(data: BitcoinMessageBody): BitcoinChainMessage {
    return new BitcoinChainMessage(this.haskoin, data);
  }

  async getTransactions(
    address: string,
    afterBlock?: number | string
  ): Promise<Response<Transaction[], Transaction>> {
    return new Response(
      () => this.dataSource.getTransactions({ address, afterBlock }),
      () => this.dataSource.subscribeTransactions({ address })
    );
  }

  async estimateFee(
    messages: BitcoinChainMessage[],
    speed: GasFeeSpeed
  ): Promise<Msg[]> {
    return this.dataSource.estimateFee(messages, speed);
  }

  async getBalance(address: string): Promise<Response<Coin[], Balance[]>> {
    return new Response(
      () => this.dataSource.getBalance({ address }),
      () => this.dataSource.subscribeBalance({ address })
    );
  }

  async gasFeeOptions(): Promise<GasFee> {
    return this.dataSource.gasFeeOptions();
  }

  async getNonce(address: string): Promise<number> {
    return this.dataSource.getNonce(address);
  }

  async broadcast(messages: BitcoinChainMessage[]): Promise<Transaction[]> {
    const result: Transaction[] = [];
    for await (const message of messages) {
      const { txHex } = await message.buildTx();

      const { data: txid } = await this.api.post<string>('/api/tx', txHex);
      const tx = await this.haskoin.getTransaction(txid);

      result.push(Transaction.fromData(tx));
    }

    return result;
  }
}

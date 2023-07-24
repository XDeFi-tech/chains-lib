import {
  Balance,
  Chain,
  ChainDecorator,
  Coin,
  DataSource,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
  Msg,
  MsgData,
  Response,
  Transaction,
  TransactionData,
  TransactionStatus,
} from '@xdefi-tech/chains-core';
import {
  LcdClient,
  setupAuthExtension,
  setupBankExtension,
} from '@cosmjs/launchpad';
import { BroadcastTxError } from '@cosmjs/stargate';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { some } from 'lodash';
import axios, { AxiosInstance } from 'axios';
import 'reflect-metadata';

import { ChainMsg } from './msg';
import * as manifests from './manifests';

@ChainDecorator('CosmosProvider', {
  deps: [],
  providerType: 'Cosmos',
})
export class CosmosProvider extends Chain.Provider {
  declare rpcProvider: LcdClient;
  private readonly lcdAxiosClient: AxiosInstance;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    const manifest = this.manifest as manifests.CosmosManifest;
    this.rpcProvider = LcdClient.withExtensions(
      { apiUrl: manifest.rpcURL },
      setupBankExtension,
      setupAuthExtension
    );
    this.lcdAxiosClient = axios.create({
      baseURL: manifest.lcdURL,
    });
  }

  createMsg(data: MsgData): Msg {
    return new ChainMsg(data, this);
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

  async estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<FeeData[]> {
    return this.dataSource.estimateFee(msgs, speed);
  }

  async getBalance(address: string): Promise<Response<Coin[], Balance[]>> {
    return new Response(
      () => this.dataSource.getBalance({ address }),
      () => this.dataSource.subscribeBalance({ address })
    );
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    return this.dataSource.gasFeeOptions();
  }

  async getNonce(_address: string): Promise<number> {
    // unused
    throw new Error('Method not implemented.');
  }

  async broadcast(msgs: Msg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }
    const transactions = [];

    for (const msg of msgs) {
      const tx = TxRaw.encode(msg.signedTransaction as TxRaw).finish();
      const { data } = await this.lcdAxiosClient.post(
        '/cosmos/tx/v1beta1/txs',
        {
          tx_bytes: Buffer.from(tx).toString('base64'),
          mode: 'BROADCAST_MODE_SYNC',
        }
      );
      if (data.tx_response.code) {
        throw new BroadcastTxError(
          data.tx_response.code,
          data.tx_response.codespace,
          data.tx_response.raw_log
        );
      }
      transactions.push(Transaction.fromData(data.tx_response));
    }

    return transactions;
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const { data: tx } = await this.lcdAxiosClient.get(
      `/cosmos/tx/v1beta1/txs/${txHash}`
    );

    if (!tx) {
      return null;
    }

    const result: TransactionData = {
      hash: tx.tx_response.txhash,
      from: tx.from || '',
      to: tx.to || '',
      status: TransactionStatus.pending,
    };

    if (tx.tx_response.code) {
      result.status = TransactionStatus.failure;
    } else {
      const { data } = await this.lcdAxiosClient.get('/blocks/latest');
      if (tx.tx_response.height <= data.block.header.height) {
        result.status = TransactionStatus.success;
        result.data = tx.tx_response.data;
      }
    }

    return result;
  }
}

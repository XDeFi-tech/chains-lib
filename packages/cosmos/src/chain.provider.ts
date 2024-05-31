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
  MsgEncoding,
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
import { BroadcastTxError, Account } from '@cosmjs/stargate';
import { some } from 'lodash';
import axios, { AxiosInstance } from 'axios';
import 'reflect-metadata';

import { ChainMsg } from './msg';
import * as manifests from './manifests';
import { ChainDataSource, IndexerDataSource } from './datasource';
import type { CosmosManifest } from './manifests';
import {
  createIBCTransferMsg,
  getIBCDestAsset,
  getIBCTokenInfo,
  getIBCTransferRouter,
  skipAxiosClient,
} from './utils';

export interface ChannelData {
  channelId: string;
  portId: string;
}

export interface IBCData {
  path: string;
  originDenom: string;
}

@ChainDecorator('CosmosProvider', {
  deps: [],
  providerType: 'Cosmos',
  features: [Chain.ChainFeatures.TOKENS],
})
export class CosmosProvider extends Chain.Provider {
  declare rpcProvider: LcdClient;
  private readonly lcdAxiosClient: AxiosInstance;
  declare dataSource: ChainDataSource | IndexerDataSource;

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

  createMsg(data: MsgData, encoding: MsgEncoding = MsgEncoding.object): Msg {
    return new ChainMsg(data, this, encoding);
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
    return this.dataSource.estimateFee(msgs as ChainMsg[], speed);
  }

  async getNFTBalance(address: string) {
    return this.dataSource.getNFTBalance(address);
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

  async broadcast(msgs: ChainMsg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }
    const transactions = [];

    for (const msg of msgs) {
      const { data } = await this.lcdAxiosClient.post(
        '/cosmos/tx/v1beta1/txs',
        {
          tx_bytes: msg.signedTransaction,
          mode: msg.toData().mode || 'BROADCAST_MODE_SYNC',
        }
      );
      if (data.tx_response.code) {
        throw new BroadcastTxError(
          data.tx_response.code,
          data.tx_response.codespace,
          data.tx_response.raw_log
        );
      }
      transactions.push(
        Transaction.fromData({
          hash: data.tx_response.txhash,
        })
      );
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

  async getAccount(address: string): Promise<null | Account> {
    return this.dataSource.getAccount(address);
  }

  /**
   *
   * @param denom the denom of IBC token
   * @returns information about the IBC token
   */
  async getIBCTransferInfo(denom: string): Promise<null | IBCData> {
    if (denom.startsWith('ibc/')) {
      return null;
    }

    const {
      data: { denom_traces },
    } = await this.lcdAxiosClient.get(
      `/ibc/apps/transfer/v1/denom_traces/${denom}`
    );

    if (!denom_traces) {
      return null;
    }

    return { path: denom_traces.path, originDenom: denom_traces.base_denom };
  }

  /**
   *
   * @param chanelId the ID of the channel
   * @param portId the port ID - defaults to 'transfer'
   * @returns information about the counterparty of a specific IBC channel
   */
  async getChannelCounterPatty(
    chanelId: `channel-${number}`,
    portId = 'transfer'
  ): Promise<null | ChannelData> {
    const {
      data: { channel },
    } = await this.lcdAxiosClient.get(
      `/ibc/core/channel/v1/channels/${chanelId}/port/${portId}`
    );

    if (channel) {
      return null;
    }

    return {
      portId: channel.counterparty.port_id,
      channelId: channel.counterparty.channel_id,
    };
  }

  public get manifest(): CosmosManifest {
    return this.dataSource.manifest as CosmosManifest;
  }

  static get dataSourceList() {
    return {
      IndexerDataSource: IndexerDataSource,
      ChainDataSource: ChainDataSource,
    };
  }

  static get utils() {
    return {
      skipAxiosClient,
      getIBCTokenInfo,
      getIBCTransferRouter,
      createIBCTransferMsg,
      getIBCDestAsset,
    };
  }
}

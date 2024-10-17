import {
  Balance,
  Chain,
  ChainDecorator,
  Coin,
  DataSource,
  FeeData,
  FeeOptions,
  FeeParams,
  GasFeeSpeed,
  Msg,
  MsgData,
  MsgEncoding,
  Response,
  Transaction,
  TransactionData,
  TransactionStatus,
} from '@xdefi-tech/chains-core';
import { providers, utils } from 'ethers';
import { some } from 'lodash';

import { ChainDataSource, IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';
import {
  decryptParams,
  paramToString,
  getFeesFromRPC,
  getGasLimitFromRPC,
} from './utils';
import { CtrlDataSource } from './datasource/ctrl/ctrl.data-source';

@ChainDecorator('EvmProvider', {
  deps: [],
  providerType: 'EVM',
  features: [
    Chain.ChainFeatures.TOKENS,
    Chain.ChainFeatures.NFT,
    Chain.ChainFeatures.EIP1559,
  ],
})
export class EvmProvider extends Chain.Provider<ChainMsg> {
  public readonly rpcProvider: providers.StaticJsonRpcProvider;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    this.rpcProvider = new providers.StaticJsonRpcProvider(
      this.dataSource.manifest.rpcURL
    );
  }

  public get manifest(): Chain.Manifest & { maxGapAmount?: number } {
    return this.dataSource.manifest;
  }

  createMsg(data: MsgData, encoding: MsgEncoding = MsgEncoding.object) {
    return new ChainMsg(data, this, encoding);
  }

  async broadcast(msgs: Msg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }

    const transactions = [];

    for (const msg of msgs) {
      const tx = await this.rpcProvider.sendTransaction(
        msg.signedTransaction as string
      );
      transactions.push(Transaction.fromData(tx));
    }

    return transactions;
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

  async _getFeesFromRpc(
    msgs: ChainMsg[],
    speed: GasFeeSpeed,
    isEIP1559: undefined | boolean = undefined
  ) {
    const promises = msgs.map((msg) =>
      getFeesFromRPC(msg, speed, this.manifest.feeGasStep, isEIP1559)
    );
    return Promise.all(promises);
  }

  async estimateFee(
    msgs: ChainMsg[],
    speed: GasFeeSpeed,
    options?: { forceUseRpc: boolean; isEIP1559?: boolean } // useful for custom chains
  ): Promise<FeeData[]> {
    if (options?.forceUseRpc) {
      return this._getFeesFromRpc(msgs, speed, options?.isEIP1559);
    }

    try {
      return await this.dataSource.estimateFee(msgs, speed);
    } catch (err) {
      console.warn('Failed to estimate fee. Fallback to RFC method', err);
      return this._getFeesFromRpc(msgs, speed);
    }
  }

  async getNFTBalance(address: string) {
    return this.dataSource.getNFTBalance(address);
  }

  async getBalance(
    address: string,
    tokenList?: string[]
  ): Promise<Response<Coin[], Balance[]>> {
    return new Response(
      () => this.dataSource.getBalance({ address }, tokenList),
      () => this.dataSource.subscribeBalance({ address })
    );
  }

  async gasFeeOptions(options?: FeeParams): Promise<FeeOptions | null> {
    return this.dataSource.gasFeeOptions(options);
  }

  async getNonce(address: string): Promise<number> {
    return this.dataSource.getNonce(address);
  }

  static get dataSourceList() {
    return {
      IndexerDataSource: IndexerDataSource,
      ChainDataSource: ChainDataSource,
      CtrlDataSource: CtrlDataSource,
    };
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const tx = await this.rpcProvider.getTransaction(txHash);
    if (!tx) {
      return null;
    }

    // TODO TEMP LOG, remove after 16.10.2024
    // eslint-disable-next-line no-console
    console.debug(`[CHAINSLIB] EVM getTransaction`, JSON.stringify(tx));

    const result: TransactionData = {
      hash: tx.hash,
      from: tx?.from || '',
      to: tx?.to || '',
      status: TransactionStatus.pending,
    };

    if (tx.blockNumber !== null) {
      const receipt = await this.rpcProvider.getTransactionReceipt(txHash);

      result.from = receipt.from;
      result.to = receipt.to;
      result.status =
        receipt.status === 1
          ? TransactionStatus.success
          : TransactionStatus.failure;
      result.data = tx.data;
    }

    return result;
  }

  static get staticUtils() {
    return {
      paramToString,
      decryptParams,
      getFeesFromRPC,
      getGasLimitFromRPC,
    };
  }

  static verifyAddress(address: string): boolean {
    try {
      return utils.isAddress(address);
    } catch (e) {
      return false;
    }
  }
}

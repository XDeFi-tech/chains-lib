import 'reflect-metadata';
import {
  DataSource,
  Chain,
  ChainDecorator,
  Coin,
  GasFee,
  GasFeeSpeed,
  Msg,
  MsgData,
  Response,
  Transaction,
  Balance,
  FeeData,
} from '@xdefi/chains-core';
import { providers } from 'ethers';
import { some } from 'lodash';
import { ChainMsg } from 'msg';

@ChainDecorator('EvmProvider', {
  deps: [],
  providerType: 'EVM',
})
export class EvmProvider extends Chain.Provider {
  rpcProvider: providers.StaticJsonRpcProvider;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    this.rpcProvider = new providers.StaticJsonRpcProvider(
      this.dataSource.manifest.rpcURL
    );
  }

  createMsg(data: MsgData): Msg {
    return new ChainMsg(data, this);
  }

  async broadcast(msgs: Msg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }

    const transactions = [];

    for (const msg of msgs) {
      const tx = await this.rpcProvider.sendTransaction(
        msg.signature as string
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

  async estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<FeeData[]> {
    return this.dataSource.estimateFee(msgs, speed);
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
}

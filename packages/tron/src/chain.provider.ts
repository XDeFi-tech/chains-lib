import {
  DataSource,
  Chain,
  ChainDecorator,
  Coin,
  FeeOptions,
  GasFeeSpeed,
  Msg,
  MsgData,
  Response,
  Transaction,
  Balance,
  FeeData,
  TransactionData,
  TransactionStatus,
} from '@xdefi-tech/chains-core';
import { some } from 'lodash';
import TronWeb from 'tronweb';
import { AbiCoder } from 'ethers';

import { ChainMsg } from './msg';

@ChainDecorator('TronProvider', {
  deps: [],
  providerType: 'Tron',
})
export class TronProvider extends Chain.Provider {
  declare rpcProvider: any;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    this.rpcProvider = new TronWeb({
      fullHost: dataSource.manifest.rpcURL,
    });

    // Doesnt matter what this address is, just needs to be valid.
    // USDT is used. Required or some requests fail.
    this.rpcProvider.setAddress('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
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

  async estimateFee(_msgs: Msg[], _speed: GasFeeSpeed): Promise<FeeData[]> {
    throw new Error('Method not implemented.');
  }

  async getBalance(address: string): Promise<Response<Coin[], Balance[]>> {
    return new Response(
      () => this.dataSource.getBalance({ address }),
      () => this.dataSource.subscribeBalance({ address })
    );
  }

  async getNFTBalance(_address: string) {
    throw new Error('Method not implemented.');
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    throw new Error('Method not implemented.');
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error("Tron chain doesn't use nonce");
  }

  async broadcast(msgs: Msg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }

    const transactions = [];

    for (const msg of msgs) {
      const tx = await this.rpcProvider.trx.sendRawTransaction(
        msg.signedTransaction
      );
      transactions.push(Transaction.fromData(tx));
    }

    return transactions;
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const tx = await this.rpcProvider.trx.getTransaction(txHash);
    if (!tx) {
      return null;
    }

    const result: TransactionData = {
      hash: tx.txID,
      from: '',
      to: '',
      status: tx.blockNumber
        ? TransactionStatus.success
        : TransactionStatus.pending,
      date: tx.blockTimeStamp,
      amount: '',
    };

    if (
      tx.raw_data.contract.length > 0 &&
      tx.raw_data.contract[0].type === 'TransferContract'
    ) {
      const transferData = tx.raw_data.contract[0].parameter.value;

      result.to = this.rpcProvider.address.fromHex(transferData.to_address);
      result.from = this.rpcProvider.address.fromHex(
        transferData.owner_address
      );
      result.amount = transferData.amount.toString();
    } else if (
      tx.raw_data.contract.length > 0 &&
      tx.raw_data.contract[0].type === 'TriggerSmartContract'
    ) {
      const params = await this.decodeParams(
        ['address', 'uint256'],
        tx.raw_data.contract[0].parameter.value.data,
        true
      );

      result.to = this.rpcProvider.address.fromHex(params[0]);
      result.amount = params[1].toString();
      result.from = this.rpcProvider.address.fromHex(
        tx.raw_data.contract[0].parameter.value.owner_address
      );
      result.contractAddress = this.rpcProvider.address.fromHex(
        tx.raw_data.contract[0].parameter.value.contract_address
      );
    }

    return result;
  }

  // https://developers.tron.network/v3.7/docs/parameter-and-return-value-encoding-and-decoding-1#parameter-decoding
  async decodeParams(
    types: string[],
    output: string,
    ignoreMethodHash: boolean
  ) {
    const ADDRESS_PREFIX = '41';
    if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8)
      output = '0x' + output.replace(/^0x/, '').substring(8);

    const abiCoder = new AbiCoder();

    if (output.replace(/^0x/, '').length % 64)
      throw new Error(
        'The encoded string is not valid. Its length must be a multiple of 64.'
      );
    return abiCoder.decode(types, output).reduce((obj, arg, index) => {
      if (types[index] == 'address')
        arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
      obj.push(arg);
      return obj;
    }, []);
  }
}

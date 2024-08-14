import {
  DataSource,
  Chain,
  ChainDecorator,
  Coin,
  FeeOptions,
  Msg,
  MsgData,
  Response,
  Transaction,
  Balance,
  TransactionData,
  TransactionStatus,
} from '@xdefi-tech/chains-core';
import { some } from 'lodash';
import TronWeb, { TronTransaction, TronTransactionRawData } from 'tronweb';
import { AbiCoder } from 'ethers';

import { ChainMsg, MsgBody, TokenType, TronFee } from './msg';
import { IndexerDataSource, ChainDataSource } from './datasource';

@ChainDecorator('TronProvider', {
  deps: [],
  providerType: 'Tron',
})
export class TronProvider extends Chain.Provider<ChainMsg> {
  declare rpcProvider: any;
  declare dataSource: ChainDataSource | IndexerDataSource;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    this.rpcProvider = new TronWeb({
      fullHost: dataSource.manifest.rpcURL,
    });

    // Doesnt matter what this address is, just needs to be valid.
    // USDT is used. Required or some requests fail.
    this.rpcProvider.setAddress('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
  }

  createMsg(data: MsgData) {
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

  async estimateFee(msgs: Msg[]): Promise<TronFee[]> {
    const feeData: TronFee[] = [];

    // Can change with a network update / fork, but not worth using an API call here.
    // 1000 SUN (not TRX) for bandwidth and 420 SUN for energy per unit.
    const bandwidthPrice = 1000;
    const energyPrice = 420;

    for (let i = 0; i < msgs.length; i++) {
      const msg = msgs[i];

      const msgBody = msg.toData() as MsgBody;
      const { freeBandwidth, freeEnergy } =
        await this.dataSource.getAccountResource(msgBody.from);

      let tx: TronTransaction;

      if (!msg.hasSignature) {
        const originalAddress = msg.data.from;
        const account = await this.rpcProvider.createAccount();
        msg.data.from = account.address.base58;
        const dummyTx = await msg.buildTx();
        tx = await this.rpcProvider.trx.sign(
          dummyTx as TronTransaction,
          account.privateKey
        );
        msg.data.from = originalAddress;
      } else {
        tx = msg.signedTransaction as TronTransaction;
      }

      // Reference: https://developers.tron.network/docs/faq#5-how-to-calculate-the-bandwidth-and-energy-consumed-when-callingdeploying-a-contract
      const DATA_HEX_PROTOBUF_LENGTH = 3;
      const MAX_RESULT_SIZE_IN_TX = 64;
      const A_SIGNATURE = 67;
      const signatureListSize = tx.signature?.length ?? 1;
      const bandwidthUsed =
        tx.raw_data_hex.length / 2 +
        DATA_HEX_PROTOBUF_LENGTH +
        MAX_RESULT_SIZE_IN_TX +
        signatureListSize * A_SIGNATURE;

      // Reference: https://developers.tron.network/docs/tron-protocol-transaction#bandwidth-fee
      const bandwidthConsumed =
        Math.max(bandwidthUsed - freeBandwidth, 0) * bandwidthPrice; // in SUN

      // Native token and TRC10 only use bandwidth
      if (
        !msgBody.tokenType ||
        msgBody.tokenType === TokenType.None ||
        msgBody.tokenType === TokenType.TRC10
      ) {
        feeData.push({
          bandwidth: bandwidthUsed,
          energy: 0,
          fee: Number(this.rpcProvider.fromSun(bandwidthConsumed)),
          willRevert: false,
        });
      } else if (
        msgBody.tokenType === TokenType.TRC20 &&
        msgBody.contractAddress
      ) {
        // Reference: https://developers.tron.network/docs/tron-protocol-transaction#energy-fee
        const { energy, willRevert } = await (
          this.dataSource as ChainDataSource
        ).estimateEnergy(
          msgBody.from,
          msgBody.contractAddress,
          'transfer(address,uint256)',
          (
            tx.raw_data as unknown as TronTransactionRawData
          ).contract[0].parameter.value.data.substring(8)
        );

        feeData.push({
          bandwidth: bandwidthUsed,
          energy: energy,
          fee: Number(
            this.rpcProvider.fromSun(
              bandwidthConsumed + Math.max(energy - freeEnergy, 0) * energyPrice
            )
          ),
          willRevert,
        });
      }
    }

    return feeData;
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

  static verifyAddress(address: string): boolean {
    try {
      return TronWeb.isAddress(address);
    } catch (e) {
      return false;
    }
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
      status: tx.raw_data.ref_block_num
        ? TransactionStatus.success
        : TransactionStatus.pending,
      date: tx.raw_data.timestamp,
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

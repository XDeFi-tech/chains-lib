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
import { some } from 'lodash';
import * as Near from 'near-api-js';
import { keyStores } from 'near-api-js';
import { SignedTransaction } from 'near-api-js/lib/transaction';
import BN from 'bn.js';
import axios, { Axios } from 'axios';

import { ChainMsg } from './msg';
import { NearManifest } from './manifests';
import { nearToLittleEndianHexString } from './utils';
import {
  FT_MINIMUM_STORAGE_BALANCE,
  FT_MINIMUM_STORAGE_BALANCE_LARGE,
  FT_STORAGE_DEPOSIT_GAS,
} from './constants';

@ChainDecorator('NearProvider', {
  deps: [],
  providerType: 'Near',
})
export class NearProvider extends Chain.Provider {
  declare rpcProvider: Near.Near;
  declare rest: Axios;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    const manifest = this.manifest as NearManifest;
    this.rest = axios.create({ baseURL: manifest.rpcURL });
    Near.connect({
      networkId: manifest.chainId,
      keyStore: new keyStores.InMemoryKeyStore(),
      nodeUrl: manifest.rpcURL,
      walletUrl: manifest.walletUrl,
      helperUrl: manifest.helperUrl,
    }).then((provider) => {
      this.rpcProvider = provider;
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

  async estimateFee(
    msgs: Msg[],
    speed: GasFeeSpeed = GasFeeSpeed.medium
  ): Promise<FeeData[]> {
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

  async getNonce(address: string): Promise<any> {
    const { data: response } = await this.rest.post('/', {
      jsonrpc: '2.0',
      id: '',
      method: 'query',
      params: {
        request_type: 'view_access_key_list',
        finality: 'final',
        account_id: address,
      },
    });
    const keys = response.result.keys;

    return {
      blockHash: response.result.block_hash,
      nonce: keys && keys.length > 0 ? keys[0].access_key.nonce : 0,
    };
  }

  async broadcast(msgs: ChainMsg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }
    const transactions: Transaction[] = [];
    for (const msg of msgs) {
      const response =
        await this.rpcProvider.connection.provider.sendTransaction(
          SignedTransaction.decode(
            Buffer.from(msg.signedTransaction as string, 'base64')
          )
        );
      transactions.push(
        Transaction.fromData({ hash: response.transaction.hash })
      );
    }

    return transactions;
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    try {
      const tx = await this.rpcProvider.connection.provider.txStatus(
        txHash,
        '132073ac670f80cccf1ebe37a9bd1c94c2f6f98aba241185a582ab8759c83081'
      );
      let status = TransactionStatus.pending;
      const isSuccess = tx.status.hasOwnProperty('SuccessValue');
      const isFailure = tx.status.hasOwnProperty('Failure');
      if (isSuccess) {
        status = TransactionStatus.success;
      } else if (isFailure) {
        status = TransactionStatus.failure;
      }
      return {
        hash: tx.transaction.hash,
        to: tx.transaction.receiver_id,
        from: tx.transaction.signer_id,
        status,
      };
    } catch (err) {
      console.error('Error while getting tx');
      console.error(err);
      return null;
    }
  }

  async getStorageBalance(address: string, contractAddress: string) {
    const account = await this.rpcProvider.account('dontcare');

    return account.viewFunction({
      contractId: contractAddress,
      methodName: 'storage_balance_of',
      args: {
        account_id: address,
      },
    });
  }

  async transferStorageDeposit(
    account: Near.Account,
    contractAddress: string,
    receiverAddress: string,
    storageDepositAmount: string
  ) {
    return account.signAndSendTransaction({
      receiverId: contractAddress,
      actions: [
        Near.transactions.functionCall(
          'storage_deposit',
          {
            account_id: receiverAddress,
            registration_only: true,
          },
          new BN(FT_STORAGE_DEPOSIT_GAS),
          new BN(storageDepositAmount)
        ),
      ],
    });
  }

  async checkStorageBalance(msg: ChainMsg) {
    const msgData = msg.toData();

    if (msgData.contractAddress) {
      const storageBalance = await this.getStorageBalance(
        msgData.to,
        msgData.contractAddress
      );
      if (!storageBalance || storageBalance.total === undefined) {
        const account = await this.rpcProvider.account(msgData.from);
        try {
          await msg.provider.transferStorageDeposit(
            account,
            msgData.contractAddress,
            msgData.to,
            FT_MINIMUM_STORAGE_BALANCE
          );
        } catch (e: any) {
          if (e.message.includes('attached deposit is less than')) {
            await msg.provider.transferStorageDeposit(
              account,
              msgData.contractAddress,
              msgData.to,
              FT_MINIMUM_STORAGE_BALANCE_LARGE
            );
          }
        }
      }
    }
  }

  static get staticUtils() {
    return {
      nearToLittleEndianHexString,
    };
  }
}

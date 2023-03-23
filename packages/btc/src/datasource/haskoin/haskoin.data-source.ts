import { Injectable } from '@xdefi/chains-core';
import { Axios } from 'axios';
import { UTXO } from '@xchainjs/xchain-bitcoin';
import * as Bitcoin from 'bitcoinjs-lib';

export declare type HaskoinAddressBalance = {
  received: number;
  utxo: number;
  address: string;
  txs: number;
  unconfirmed: number;
  confirmed: number;
};

export declare type HaskoinTxUnspent = {
  pkscript: string;
  value: number;
  address: string;
  block: {
    height: number;
    position: number;
  };
  index: number;
  txid: string;
};

export type HaskoinTransaction = {
  block: {
    heigh: number;
    position: number;
  };
  deleted: false;
  fee: number;
  inputs: {
    address: string;
    coinbase: boolean;
    output: number;
    pkscript: number;
    sequence: number;
    sigscript: number;
    txid: string;
    value: number;
  }[];
  outputs: {
    address: string;
    pkscript: string;
    spender: { input: number; txid: string };
    spent: true;
    value: number;
  }[];
  rbf: boolean;
  size: number;
  time: number;
  txid: string;
  version: number;
  weight: number;
};

@Injectable()
export class HaskoinDataSource {
  api: Axios;
  baseURL: string;

  constructor(baseURL = 'https://api.haskoin.com/') {
    this.api = new Axios({ baseURL });
    this.baseURL = baseURL;
  }

  async getAccount(address: string): Promise<HaskoinAddressBalance> {
    const { data: result } = await this.api.get(`/address/${address}/balance`);
    return result;
  }

  async getUnspentTransactions(address: string): Promise<HaskoinTxUnspent[]> {
    const account = await this.getAccount(address);

    const result = await this.api.get(
      `/address/${address}/unspent?limit=${account?.utxo}`
    );

    return result.data;
  }

  async getRawTransaction(txId: string): Promise<string> {
    const { data } = await this.api.get(`/transaction/${txId}/raw`);

    return data.result;
  }

  async getTransaction(txId: string): Promise<HaskoinTransaction> {
    const { data } = await this.api.get(`/transaction/${txId}`);

    return data;
  }

  async scanUTXOs(address: string) {
    const unspents = (await this.getUnspentTransactions(address)) || [];
    const utxos: UTXO[] = [];

    for (const utxo of unspents) {
      utxos.push({
        hash: utxo.txid,
        value: utxo.value,
        index: utxo.index,
        witnessUtxo: {
          value: utxo.value,
          script: Bitcoin.script.compile(Buffer.from(utxo.pkscript, 'hex')),
        },
        address: utxo.address,
        txHex: await this.getRawTransaction(utxo.txid),
      } as UTXO);
    }

    return utxos;
  }
}

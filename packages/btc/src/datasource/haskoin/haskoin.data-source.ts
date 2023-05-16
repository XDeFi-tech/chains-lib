import { Injectable } from '@xdefi-tech/chains-core';
import { Axios } from 'axios';
import * as Bitcoin from 'bitcoinjs-lib';

import { DEFAULT_HASKOIN_URL } from '../../manifests';
import { UTXODataSource, Transaction, UTXO } from '../utxo/utxo.data-source';

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

export type HaskoinTransaction = Transaction;

@Injectable()
export class HaskoinDataSource implements UTXODataSource {
  private api: Axios;
  private baseURL: string;

  constructor(baseURL = DEFAULT_HASKOIN_URL) {
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
        txHex: await this.getRawTransaction(utxo.txid),
      });
    }

    return utxos;
  }
}

import {
  Injectable,
  Transaction,
  TransactionData,
} from '@xdefi-tech/chains-core';
import axios, { Axios } from 'axios';
import * as UTXOLib from 'bitcoinjs-lib';

import { ChainMsg } from '../../msg';
import {
  UTXODataProvider,
  UTXOTransaction,
  UTXO,
} from '../utxo/utxo.data-provider';

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
  locktime: number;
  inputs: {
    address: string;
    coinbase: boolean;
    output: number;
    pkscript: string;
    sequence: number;
    sigscript: string;
    txid: string;
    value: number;
    witness: string[];
  }[];
  outputs: {
    address: string;
    pkscript: string;
    spender: { input: number; txid: string } | null;
    spent: boolean;
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
export class HaskoinDataProvider implements UTXODataProvider {
  private api: Axios;

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });
  }
  broadcast(messages: ChainMsg[]): Promise<Transaction<TransactionData>[]> {
    throw new Error('Method not implemented.');
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

  async getTransaction(txId: string): Promise<UTXOTransaction> {
    const { data } = await this.api.get<HaskoinTransaction>(
      `/transaction/${txId}`
    );

    return {
      blockId: data.block.heigh,
      weight: data.weight,
      size: data.size,
      rbf: data.rbf,
      version: data.version,
      lockTime: data.locktime,
      fee: data.fee,
      date: new Date(data.time).toLocaleDateString('en-EU'),
      time: data.time,
      hash: data.txid,
      inputs: data.inputs.map((i) => ({
        hash: i.txid,
        index: i.output,
        pkscript: i.pkscript,
        spendingSequence: i.sequence,
        spendingWitness: i.witness,
        value: i.value,
        address: i.address,
      })),
      outputs: data.outputs.map((o) => ({
        address: o.address,
        pkscript: o.pkscript,
        value: o.value,
        spent: o.spent,
      })),
    };
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
          script: UTXOLib.script.compile(Buffer.from(utxo.pkscript, 'hex')),
        },
        txHex: await this.getRawTransaction(utxo.txid),
      });
    }

    return utxos;
  }
}

import { Injectable } from '@xdefi-tech/chains-core';
import axios, { Axios } from 'axios';
import * as UTXOLib from 'bitcoinjs-lib';

import {
  UTXODataSource,
  UTXOTransaction,
  UTXO,
} from '../utxo/utxo.data-source';

export declare type BlockchairAddress = {
  type: string;
  script_hex: string;
  balance: number;
  balance_usd: number;
  received: number;
  received_usd: number;
  spent: number;
  spent_usd: number;
  output_count: number;
  unspent_output_count: number;
  first_seen_receiving: string;
  last_seen_receiving: string;
  first_seen_spending: string;
  last_seen_spending: string;
  transaction_count: number;
};

export type BlockchairUTXO = {
  block_id: number;
  transaction_hash: string;
  index: number;
  value: number;
};

export type BlockchairAddressResponse = {
  address: BlockchairAddress;
  transactions: string[]; // latest transaction hashes
  utxo: BlockchairUTXO[];
};

export type BlockchairTransaction = {
  block_id: number;
  id: number;
  hash: string;
  date: string;
  time: string;
  size: number;
  weight: number;
  version: number;
  lock_time: number;
  is_coinbase: boolean;
  has_witness: boolean;
  input_count: number;
  output_count: number;
  input_total: number;
  input_total_usd: number;
  output_total: number;
  output_total_usd: number;
  fee: number;
  fee_usd: number;
  fee_per_kb: number;
  fee_per_kb_usd: number;
  fee_per_kwu: number;
  fee_per_kwu_usd: number;
  cdd_total: number;
  is_rbf: boolean;
};

export type BlockchairTransactionInput = {
  block_id: number;
  transaction_id: number;
  index: number;
  transaction_hash: string;
  date: string;
  time: string;
  value: number;
  value_usd: number;
  recipient: string;
  type: string;
  script_hex: string;
  is_from_coinbase: boolean;
  is_spendable: boolean | null;
  is_spent: boolean;
  spending_block_id: number;
  spending_transaction_id: number;
  spending_index: number;
  spending_transaction_hash: string;
  spending_date: string;
  spending_time: string;
  spending_value_usd: number;
  spending_sequence: number;
  spending_signature_hex: string;
  spending_witness: string;
  lifespan: number;
  cdd: number;
};

export type BlockchairTransactionOutput = {
  block_id: number;
  transaction_id: number;
  index: number;
  transaction_hash: string;
  date: string;
  time: string;
  value: number;
  value_usd: number;
  recipient: string;
  type: string;
  script_hex: string;
  is_from_coinbase: boolean;
  is_spendable: boolean | null;
  is_spent: boolean;
  spending_block_id: null | number;
  spending_transaction_id: null | number;
  spending_index: null | number;
  spending_transaction_hash: null | string;
  spending_date: null | string;
  spending_time: null | string;
  spending_value_usd: null | number;
  spending_sequence: null | number;
  spending_signature_hex: null | string;
  spending_witness: null | string;
  lifespan: null | number;
  cdd: null | number;
};

export type BlockchairTransactionResponse = {
  transaction: BlockchairTransaction;
  inputs: BlockchairTransactionInput[];
  outputs: BlockchairTransactionOutput[];
};

@Injectable()
export class BlockChairDataSource implements UTXODataSource {
  private api: Axios;

  constructor(baseURL: string, apiKey?: string) {
    this.api = axios.create({ baseURL });
    if (apiKey) {
      this.api.interceptors.request.use((config) => {
        config.params = config.params || {};
        config.params['key'] = apiKey;
        return config;
      });
    }
  }

  async getAccount(address: string): Promise<BlockchairAddressResponse> {
    // https://api.blockchair.com/{:btc_chain}/dashboards/address/{:address}
    const { data: result } = await this.api.get(
      `/dashboards/address/${address}`
    );
    return result.data[address];
  }

  async getTransaction(txId: string): Promise<UTXOTransaction> {
    // https://api.blockchair.com/{:chain}/dashboards/transaction/{:hash}
    const {
      data: { data },
    } = await this.api.get<{ data: BlockchairTransactionResponse }>(
      `/dashboards/transaction/${txId}`
    );

    return {
      blockId: data.transaction.block_id,
      weight: data.transaction.weight,
      size: data.transaction.size,
      rbf: data.transaction.is_rbf,
      version: data.transaction.version,
      lockTime: data.transaction.lock_time,
      fee: data.transaction.fee,
      date: new Date(data.transaction.date).toLocaleDateString('en-EU'),
      time: new Date(data.transaction.time).valueOf() / 1000,
      hash: data.transaction.hash,
      inputs: data.inputs.map((i) => ({
        hash: i.transaction_hash,
        index: i.index,
        pkscript: i.script_hex,
        spendingSequence: i.spending_sequence,
        spendingWitness: i.spending_witness.split(','),
        value: i.value,
        address: i.recipient,
      })),
      outputs: data.inputs.map((o) => ({
        address: o.recipient,
        pkscript: o.script_hex,
        value: o.value,
        spent: o.is_spent,
      })),
    };
  }

  async getRawTransaction(txId: string): Promise<string> {
    // https://api.blockchair.com/{:btc_chain}/raw/transaction/{:hash}
    const { data: response } = await this.api.get(`/raw/transaction/${txId}`);

    return response.data[txId].raw_transaction;
  }

  async broadcast(rawTx: string) {
    // https://api.blockchair.com/{:btc_chain}/push/transaction?data={:raw_transaction}
    const {
      data: { data },
    } = await this.api.post(`/push/transaction?data=${rawTx}`);
    return data.transaction_hash;
  }

  async scanUTXOs(address: string) {
    const account = await this.getAccount(address);
    const utxos: UTXO[] = [];

    for (const utxo of account.utxo) {
      utxos.push({
        hash: utxo.transaction_hash,
        value: utxo.value,
        index: utxo.index,
        witnessUtxo: {
          value: utxo.value,
          script: UTXOLib.script.compile(
            Buffer.from(account.address.script_hex, 'hex')
          ),
        },
        txHex: await this.getRawTransaction(utxo.transaction_hash),
      });
    }

    return utxos;
  }
}

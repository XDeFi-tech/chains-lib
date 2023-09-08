export declare type Witness = {
  value: number;
  script: Buffer;
};

export declare type UTXO = {
  hash: string;
  index: number;
  value: number;
  witnessUtxo: Witness;
  txHex: string;
};

export type UTXOTransactionInput = {
  hash: string;
  index: number;
  pkscript: string;
  spendingSequence: number;
  spendingWitness: string[];
  value: number;
  address: string;
};

export type UTXOTransactionOutput = {
  address: string;
  pkscript: string;
  value: number;
  spent: boolean;
};

export type UTXOTransaction = {
  blockId: number;
  weight: number;
  size: number;
  rbf: boolean;
  version: number;
  lockTime: number;
  fee: number;
  date: string;
  time: number; // seconds
  hash: string;
  inputs: UTXOTransactionInput[];
  outputs: UTXOTransactionOutput[];
};

export abstract class UTXODataProvider {
  abstract scanUTXOs(address: string): Promise<UTXO[]>;

  abstract getTransaction(txid: string): Promise<UTXOTransaction>;
}

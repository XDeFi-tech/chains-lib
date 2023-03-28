export declare type Witness = {
  value: number;
  script: Buffer;
};

export declare type UTXO = {
  hash: string;
  index: number;
  value: number;
  witnessUtxo: Witness;
  txHex?: string;
};

export type Transaction = {
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

export abstract class UTXODataSource {
  abstract scanUTXOs(address: string): Promise<UTXO[]>;

  abstract getTransaction(txid: string): Promise<Transaction>;
}

export type NumberIsh = string | number | bigint; // 1 || '1' || 0x1

export type HexString = string; // '0x...'

export interface FeeData {
  gasLimit: NumberIsh;
  gasPrice?: NumberIsh;
  maxFeePerGas?: NumberIsh;
  baseFeePerGas?: NumberIsh;
  maxPriorityFeePerGas?: NumberIsh;
}

export interface TronFee {
  bandwidth: number;
  energy: number;
  fee: number;
  willRevert: boolean;
}

export enum MsgEncoding {
  buffer = 'buffer',
  object = 'object',
  base64 = 'base64',
  base58 = 'base58',
  string = 'string',
  unsigned = 'unsigned',
}

import { GasFeeSpeed } from '@xdefi-tech/chains-core';

export type Base58String = string;

export interface SolanaSignature {
  pubKey: string;
  sig: Base58String;
}

export type PriorityFeeLevelParam =
  | 'UnsafeMax' // 100%
  | 'Min' // 0%
  | 'Low' // 25%
  | 'Medium' // 50%
  | 'High' // 75%
  | 'VeryHigh'; // 95%

export type PriorityFeeLevelResponse =
  | 'unsafeMax'
  | 'min'
  | 'low'
  | 'medium'
  | 'high'
  | 'veryHigh';

export const PriorityFeeLevelParamsMapping: Record<
  GasFeeSpeed,
  PriorityFeeLevelParam
> = {
  [GasFeeSpeed.low]: 'Low',
  [GasFeeSpeed.medium]: 'Medium',
  [GasFeeSpeed.high]: 'High',
};

export interface PriorityFeeEstimateParams {
  transaction?: string; // Serialized transaction
  accountKeys?: string[]; // Account keys list
  options?: {
    transactionEncoding?: 'base64' | 'base58'; // Default: base58
    recommended?: boolean; // Use median fee
    includeAllPriorityFeeLevels?: boolean; // All priority fees
    includeVote?: boolean; // Include votes
    priorityLevel?: PriorityFeeLevelParam;
    lookbackSlots?: number; // Analyzed slots (1-300, default: 50)
    evaluateEmptySlotAsZero?: boolean; // Count empty as 0
  };
}

export interface PriorityFeeEstimateResponse {
  result?: {
    priorityFeeEstimate: number | Record<PriorityFeeLevelResponse, number>;
  };
  error?: {
    code: number;
    message: string;
  };
}

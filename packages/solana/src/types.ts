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

export interface NftAsset {
  interface: string;
  id: string;
  authorities: {
    address: string;
    scopes: string[];
  }[];
  compression: {
    eligible: boolean;
    compressed: boolean;
    data_hash: string;
    creator_hash: string;
    asset_hash: string;
    tree: string;
    seq: number;
    leaf_id: number;
  };
  royalty: {
    royalty_model: string;
    target: null;
    percent: number;
    basis_points: number;
    primary_sale_happened: boolean;
    locked: boolean;
  };
  creators: {
    address: string;
    share: number;
    verified: boolean;
  }[];
  ownership: {
    frozen: boolean;
    delegated: boolean;
    delegate: string | null;
    ownership_model: string;
    owner: string;
  };
  supply: {
    print_max_supply: number;
    print_current_supply: number;
    edition_nonce: null;
  };
  mutable: boolean;
  burnt: boolean;
}

export interface NftAssetProof {
  root: string;
  proof: string[];
  node_index: number;
  leaf: string;
  tree_id: string;
}

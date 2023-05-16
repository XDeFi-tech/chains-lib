export type ChainID = string;

export enum ChainFeatures {
  NFT = 'NFT',
  TOKENS = 'TOKENS',
  EIP1559 = 'EIP1559',
  CUSTOM_RPC = 'CUSTOM_RPC',
}

/**
 * Interface defining options that can be passed to `@Chain()` decorator
 */
export interface ChainOptions {
  deps: any[];
  providerType?: string;
  features?: ChainFeatures[];
}

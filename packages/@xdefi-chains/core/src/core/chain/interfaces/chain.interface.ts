export type ChainID = string;

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

/**
 * Interface defining options that can be passed to `@Chain()` decorator
 */
export interface ChainOptions {
  deps: any[];
}


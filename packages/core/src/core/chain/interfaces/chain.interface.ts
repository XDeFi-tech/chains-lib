export type ChainID = string;

/**
 * Interface defining options that can be passed to `@Chain()` decorator
 */
export interface ChainOptions {
  deps: any[];
  providerType?: string;
}

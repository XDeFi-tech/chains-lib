import { Chain } from '@ctrl-tech/chains-core';

export interface UTXOManifest extends Chain.Manifest {
  dataProviderType?: 'haskoin' | 'blockchair' | 'custom';
  dataProviderURL?: string;
  maxGapAmount: 0;
}

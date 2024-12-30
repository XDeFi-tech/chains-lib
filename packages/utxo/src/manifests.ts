import { Chain } from '@xdefi-tech/chains-core';

export interface UTXOManifest extends Chain.Manifest {
  dataProviderType?: 'haskoin' | 'blockchair' | 'custom';
  dataProviderURL?: string;
  maxGapAmount: 0;
  feeBounds: {
    lower: number;
    upper: number;
  };
}

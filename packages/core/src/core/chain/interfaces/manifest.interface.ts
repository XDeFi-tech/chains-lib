import { ChainID } from 'core/chain';

export interface Manifest {
  name: string;
  description: string;
  rpcURL: string;
  chainSymbol: string;
  blockExplorerURL: string;
  chainId: ChainID;
  chain: string;
}

import { getChainByName } from 'core/chain';

export const useChain = (name: string) => {
  return getChainByName(name);
};

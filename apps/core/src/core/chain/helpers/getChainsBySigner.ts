import { SignerType } from 'core/signer';
import { getAllChains } from './getAllChains';

export const getChainsBySigner = (type: SignerType) => {
  try {
    const chains = getAllChains();
    return chains.filter((chain) => {
      return chain.hasSigner(type);
    });
  } catch (e) {
    return [];
  }
};

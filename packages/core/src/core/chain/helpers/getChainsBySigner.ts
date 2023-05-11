import { SignerType } from '../../signer';
import { getAllChains } from '../helpers';

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

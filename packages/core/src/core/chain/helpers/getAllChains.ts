import { DiContainer } from 'common/di';
import * as Chain from 'core/chain';
import { CHAIN_SCOPE_NAME } from 'core/constants';

export const getAllChains = () => {
  try {
    return DiContainer.getAll<Chain.Provider>(CHAIN_SCOPE_NAME);
  } catch (e) {
    return [];
  }
};

import { DiContainer } from '../../../common/di';
import * as Chain from '../../chain';
import { CHAIN_SCOPE_NAME } from '../../constants';

export const getAllChains = () => {
  try {
    return DiContainer.getAll<Chain.Provider>(CHAIN_SCOPE_NAME);
  } catch (e) {
    return [];
  }
};

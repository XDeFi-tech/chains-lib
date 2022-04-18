import { DiContainer } from 'common/di';
import * as Chain from 'core/chain';

export const getAllChains = () => {
  return DiContainer.getAll<Chain.Provider>(Chain.SCOPE_NAME);
};

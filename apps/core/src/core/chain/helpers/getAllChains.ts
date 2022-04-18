import { DiContainer } from 'common/di';
import * as Chain from 'core/chain';

export const getAllChains = () => {
  return DiContainer.getAll<Chain.Controller>(Chain.SCOPE_NAME);
};

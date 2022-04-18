import { DiContainer } from '../../../common/di';
import * as Chain from '../chain.provider';

export const getChainByName = (name: string) => {
  return DiContainer.get<Chain.Provider>(name);
};

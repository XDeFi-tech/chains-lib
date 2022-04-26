import { DiContainer } from '../../../common/di';
import * as Chain from '../chain.provider';

export const getChainByName = (name: string | symbol) => {
  try {
    return DiContainer.get<Chain.Provider>(name);
  } catch (e) {
    return undefined;
  }
};

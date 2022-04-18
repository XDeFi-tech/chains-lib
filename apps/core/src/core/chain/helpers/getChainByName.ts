import { DiContainer } from '../../../common/di';
import { Controller } from '../chain.provider';
// import { ChainProvider } from '../interfaces';

export const getChainByName = (name: string) => {
  return DiContainer.get<Controller>(name);
};

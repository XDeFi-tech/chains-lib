import { DiContainer } from 'common';
import { Provider } from 'core/chain';

export const getChainByName = (name: string | symbol) => {
  try {
    return DiContainer.get<Provider>(name);
  } catch (e) {
    return undefined;
  }
};

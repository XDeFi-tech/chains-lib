import { DiContainer } from '../../../common/di';
import { Provider } from '../../chain';

export const getChainByName = (name: string | symbol) => {
  try {
    return DiContainer.get<Provider>(name);
  } catch (e) {
    return undefined;
  }
};

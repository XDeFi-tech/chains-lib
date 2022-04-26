import { DiContainer } from 'common/di';
import { Decorator } from '../chain.decorator';
import { getAllChains } from './getAllChains';

describe('getAllChains', () => {
  beforeEach(() => {
    DiContainer.unbindAll();
  });

  it('should return 0 chain provides', () => {
    expect(getAllChains()).toHaveLength(0);
  });

  it('should return 2 chain providers', () => {
    Decorator('firstChainProvider')(class {});
    Decorator('secondChainProvider')(class {});

    expect(getAllChains()).toHaveLength(2);
  });
});

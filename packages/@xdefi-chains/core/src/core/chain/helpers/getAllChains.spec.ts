import { DiContainer } from 'common/di';
import { ChainDecorator } from 'core/decorators';
import { getAllChains } from 'core/chain/helpers';

describe('getAllChains', () => {
  beforeEach(() => {
    DiContainer.unbindAll();
  });

  it('should return 0 chain provides', () => {
    expect(getAllChains()).toHaveLength(0);
  });

  it('should return 2 chain providers', () => {
    ChainDecorator('firstChainProvider')(class {});
    ChainDecorator('secondChainProvider')(class {});

    expect(getAllChains()).toHaveLength(2);
  });
});

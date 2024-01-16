import { DiContainer } from '../../../common/di';
import { getAllChains } from '../helpers';

describe('getAllChains', () => {
  beforeEach(() => {
    DiContainer.unbindAll();
  });

  it('should return 0 chain provides', () => {
    expect(getAllChains()).toHaveLength(0);
  });
});

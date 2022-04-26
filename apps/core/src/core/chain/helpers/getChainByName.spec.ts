import { Decorator } from '../chain.decorator';
import { getChainByName } from './getChainByName';

describe('getChainByName', () => {
  it('should return undefined if chain does not exist', () => {
    expect(getChainByName('MyChain')).toBeUndefined();
  });

  it('should return chain with specified name', () => {
    const decorator = Decorator('MyChain');
    const MyChain = class {};
    decorator(MyChain);

    expect(getChainByName('MyChain')).toBeInstanceOf(MyChain);
  });
});

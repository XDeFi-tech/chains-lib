import { getChainByName } from 'core/chain/helpers';
import { ChainDecorator } from 'core/decorators';

describe('getChainByName', () => {
  it('should return undefined if chain does not exist', () => {
    expect(getChainByName('MyChain')).toBeUndefined();
  });

  it('should return chain with specified name', () => {
    const decorator = ChainDecorator('MyChain');
    const MyChain = class {};
    decorator(MyChain);

    expect(getChainByName('MyChain')).toBeInstanceOf(MyChain);
  });
});

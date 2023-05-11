import { DiContainer } from '../../../common/di';
import { ChainDecorator, SignerDecorator } from '../../decorators';
import { getAllChains } from '../helpers';
import * as Signer from '../../signer';

describe('getAllChains', () => {
  beforeEach(() => {
    DiContainer.unbindAll();
  });

  it('should return 0 chain provides', () => {
    expect(getAllChains()).toHaveLength(0);
  });

  it('should return 2 chain providers', () => {
    @ChainDecorator('firstChainProvider')
    // @ts-ignore
    class TestProvider{}
    const firstSigner = SignerDecorator(Signer.SignerType.LEDGER)(class {});
    ChainDecorator('secondChainProvider', { deps: [firstSigner]})(class {});
    const chains = getAllChains();

    expect(chains).toHaveLength(2);
  });
});

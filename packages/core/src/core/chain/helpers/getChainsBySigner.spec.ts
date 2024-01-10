import { DiContainer } from '../../../common/di';
import * as Signer from '../../signer';
import { getChainsBySigner } from '../../chain/helpers';

describe('getChainsBySigner', () => {
  beforeEach(() => {
    DiContainer.unbindAll();
  });

  it('should return 0 chains', () => {
    expect(getChainsBySigner(Signer.SignerType.LEDGER)).toHaveLength(0);
  });
});

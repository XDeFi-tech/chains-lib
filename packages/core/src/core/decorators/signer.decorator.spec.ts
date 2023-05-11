import { DiContainer } from '../../common';
import { SignerDecorator } from '../decorators';
import { SignerType } from '../signer/interfaces';
import { SIGNER_SCOPE_NAME } from '../constants';

describe('signer.decorator', () => {
  beforeEach(() => {
    DiContainer.unbindAll();
  });

  it('should bind target symbol to DI container', () => {
    const decorator = SignerDecorator(SignerType.LEDGER);
    const MySigner = class {};

    decorator(MySigner);

    expect(DiContainer.getAll(MySigner)[0]).toBeInstanceOf(MySigner);
  });

  it('should bind target with provided type to DI container', () => {
    const decorator = SignerDecorator(SignerType.LEDGER);
    const MySigner = class {};

    decorator(MySigner);

    expect(DiContainer.getAll(SignerType.LEDGER)[0]).toBeInstanceOf(MySigner);
  });

  it('should bind target to signers scope', () => {
    const decorator = SignerDecorator(SignerType.LEDGER);
    const MySigner = class {};

    decorator(MySigner);

    expect(DiContainer.getAll(SIGNER_SCOPE_NAME)[0]).toBeInstanceOf(MySigner);
  });
});

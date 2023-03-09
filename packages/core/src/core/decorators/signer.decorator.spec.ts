import 'reflect-metadata';
import { DiContainer } from 'common';
import { SignerDecorator } from 'core/decorators';
import { SignerType } from 'core/signer/interfaces';
import { SIGNER_SCOPE_NAME } from 'core/constants';

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

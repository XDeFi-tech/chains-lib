import 'reflect-metadata';
import { DiContainer } from 'common';
import { ChainDecorator } from 'core/decorators';

import { CHAIN_SCOPE_NAME, METADATA_KEY } from '../constants';

describe('chain.decorator', () => {
  beforeEach(() => {
    DiContainer.unbindAll();
  });

  it('should have metadata name', () => {
    const decorator = ChainDecorator('MyName');
    const MyChain = class {};

    const result = decorator(MyChain);
    expect(Reflect.get(result, 'name')).toEqual('MyChain');
  });

  it('should save options in metadata', () => {
    const options = {
      deps: [jest.fn()],
    };
    const decorator = ChainDecorator('MyName', options);
    const MyChain = class {};

    const result = decorator(MyChain);
    expect(Reflect.getMetadata(METADATA_KEY.CHAIN_OPTIONS, result)).toEqual(options);
  });

  it('should init class based dependencies', () => {
    const options = {
      deps: [jest.fn()],
    };
    const decorator = ChainDecorator('MyChain', options);
    const MyChain = class {};

    decorator(MyChain);
    const target = DiContainer.get('MyChain');

    expect(options.deps[0]).toBeCalledTimes(1);
    expect(target).toBeInstanceOf(MyChain);
  });

  it('should init object based dependency', () => {
    const options = {
      deps: [new (class {})()],
    };
    const decorator = ChainDecorator('MyChain', options);
    const MyChain = class {};

    decorator(MyChain);
    const target = DiContainer.get('MyChain');

    expect(target).toBeInstanceOf(MyChain);
  });

  it('should init factory based dependencies', () => {
    const action = jest.fn();
    const options = {
      deps: [
        () => {
          action();
        },
      ],
    };

    const decorator = ChainDecorator('MyChain', options);
    const MyChain = class {};

    decorator(MyChain);
    DiContainer.get('MyChain');

    expect(action).toBeCalledTimes(1);
  });

  it('should bind self to DI container', () => {
    const decorator = ChainDecorator('MyChain');
    const MyChain = class {};

    decorator(MyChain);

    expect(DiContainer.getAll(MyChain)[0]).toBeInstanceOf(MyChain);
  });

  it('should bind self using scope name to DI container', () => {
    const decorator = ChainDecorator('MyChain');
    const MyChain = class {};

    decorator(MyChain);

    expect(DiContainer.getAll(CHAIN_SCOPE_NAME)[0]).toBeInstanceOf(MyChain);
  });
});

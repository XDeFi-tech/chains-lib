import 'reflect-metadata';
import { DiContainer } from '../../common/di/container';
import { METADATA_KEY } from '../constants';

export const SCOPE_NAME = 'CHAIN';

/**
 * Interface defining options that can be passed to `@Chain()` decorator
 */
export interface ChainOptions {
  deps: any[];
}

/**
 * Decorator that marks a class as Chain provider that handles implementation of chain
 * logic.
 *
 * A class should implement ChainProvider interface to be consider as a Chain.
 *
 * @params `name` a chain name used to identify chain provider
 * @param `options` an `ChainOptions` object
 *  - `deps` - Array of dependant classes
 */
export function Decorator(name: string, options?: ChainOptions) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.set(target, 'name', name);
    Reflect.defineMetadata(METADATA_KEY.CHAIN_OPTIONS, options, target);

    if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
      throw new Error('Cannot apply @Chain() decorator multiple times.');
    }

    const types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
    Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);

    // Auto-bind provided chain to di-container
    DiContainer.bind(name)
      .to(target)
      .inSingletonScope()
      .onActivation((_context, obj) => {
        // Init dependencies
        options?.deps?.forEach((dep: any) => {
          new dep();
        });

        return obj;
      });

    // Bind all wallet provider to same scope name
    DiContainer.bind(SCOPE_NAME).toService(name);

    return target;
  };
}

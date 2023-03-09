import 'reflect-metadata';
import { DiContainer } from 'common/di/container';
import { CHAIN_SCOPE_NAME, METADATA_KEY } from 'core/constants';
import { ChainOptions } from 'core/chain/interfaces';

/**
 * Decorator that marks a class as Chain provider that handles implementation of chain
 * logic.
 *
 * A class should implement ChainProvider interface to be consider as a Chain.
 *
 * @param `name` a chain name used to identify chain provider
 * @param `options` an `ChainOptions` object
 *  - `deps` - Array of dependant classes
 */
export function ChainDecorator(name: string, options?: ChainOptions) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
      throw new Error('Cannot apply @Chain() decorator multiple times.');
    }

    Reflect.defineMetadata(METADATA_KEY.CHAIN_OPTIONS, options, target);

    const types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
    Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);

    // Auto-bind provided chain to di-container
    DiContainer.bind(name).to(target).inSingletonScope();
    DiContainer.onActivation(name, (_context, obj: any) => {
      // Init dependencies
      options?.deps?.forEach((dep: any) => {
        if (typeof dep === 'function') {
          new dep();
        }
      });

      return obj;
    });

    // Bind all wallet provider to same scope name
    DiContainer.bind(CHAIN_SCOPE_NAME).toService(name);

    return target;
  };
}

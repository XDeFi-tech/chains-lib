import { DiContainer } from '../../common';
import { METADATA_KEY } from '../constants';

export const SIGNER_SCOPE_NAME = 'SIGNER';

export enum SignerType {
  LEDGER = 'LEDGER',
  TREZOR = 'TREZOR',
}

export function Decorator(type: SignerType) {
  return function <T extends { new (...args: []): {} }>(target: T) {
    if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
      throw new Error('Cannot apply @Signer.Decorator() decorator multiple times.');
    }

    Reflect.defineMetadata(METADATA_KEY.SCOPE, SIGNER_SCOPE_NAME, target);
    Reflect.defineMetadata(METADATA_KEY.SIGNER_TYPE, type, target);

    const types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
    Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);

    DiContainer.bind(target).to(target).inSingletonScope();

    DiContainer.bind(type).toService(target);
    DiContainer.bind(SIGNER_SCOPE_NAME).toService(target);

    return target;
  };
}

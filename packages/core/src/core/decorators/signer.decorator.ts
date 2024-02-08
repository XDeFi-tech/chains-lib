import { DiContainer } from '../../common/di/container';
import { METADATA_KEY, SIGNER_SCOPE_NAME } from '../constants';
import { TrezorProvider } from '../signer';
import { SignerType } from '../signer/interfaces';

export function SignerDecorator(type: SignerType) {
  return function <T extends new (...args: any[]) => object>(target: T) {
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

export function IsTrezorInitialized(target: any, key: string, descriptor: PropertyDescriptor): void {
  const originalMethod = descriptor.value;

  descriptor.value = function () {
    if (!TrezorProvider.getInstance().initialized) {
      throw new Error('Trezor connection is not initialized yet!');
    }

    // eslint-disable-next-line prefer-rest-params
    return originalMethod.apply(this, arguments);
  };
}

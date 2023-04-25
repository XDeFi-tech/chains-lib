import { Signer, SignerDecorator } from '@xdefi/chains-core';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(_address: string): boolean {
    throw new Error('Method not implemented.');
  }

  async getAddress(privateKey: string): Promise<string> {
    if (!this.verifyAddress(privateKey)) {
      throw new Error('Invalid address');
    }
    throw new Error('Method not implemented.');
  }

  async sign(_privateKey: string, _msg: ChainMsg): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default PrivateKeySigner;

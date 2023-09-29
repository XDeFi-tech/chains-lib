import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TronWeb from 'tronweb';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      solidityNode: 'https://api.trongrid.io',
      eventServer: 'https://api.trongrid.io',
    });

    return tronWeb.isAddress(address);
  }

  async getPrivateKey(_derivation: string): Promise<string> {
    return this.key;
  }

  async getAddress(_derivation: string): Promise<string> {
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      solidityNode: 'https://api.trongrid.io',
      eventServer: 'https://api.trongrid.io',
      privateKey: this.key,
    });

    return tronWeb.defaultAddress.base58;
  }

  async sign(_msg: ChainMsg): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default PrivateKeySigner;

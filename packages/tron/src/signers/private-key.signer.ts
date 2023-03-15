import { Signer, SignerDecorator } from '@xdefi/chains-core'
import { ChainMsg } from '../msg'
import TronWeb from 'tronweb'

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner<S = string> extends Signer.Provider<S> {
  verifyAddress(address: string): boolean {
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      solidityNode: 'https://api.trongrid.io',
      eventServer: 'https://api.trongrid.io',
    })

    return tronWeb.isAddress(address)
  }

  async getAddress(privateKey: string): Promise<string> {
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      solidityNode: 'https://api.trongrid.io',
      eventServer: 'https://api.trongrid.io',
      privateKey: privateKey,
    })

    return tronWeb.defaultAddress.base58
  }

  async sign(privateKey: string, msg: ChainMsg): Promise<S> {
    throw new Error('Method not implemented.')
  }
}

export default PrivateKeySigner

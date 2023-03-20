import { Signer, SignerDecorator } from '@xdefi/chains-core'
import * as Bitcoin from 'bitcoinjs-lib'

import { BitcoinChainMessage } from '../bitcoinMessage'

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner<S = string> extends Signer.Provider<S> {
  verifyAddress(address: string): boolean {
    try {
      Bitcoin.address.toOutputScript(address)
      return true
    } catch (err) {
      return false
    }
  }

  async getAddress(privateKey: string): Promise<string> {
    if (!this.verifyAddress(privateKey)) {
      throw new Error('Invalid address')
    }
    throw new Error('Method not implemented.')
  }

  async sign(_privateKey: string, _msg: BitcoinChainMessage): Promise<S> {
    throw new Error('Method not implemented.')
  }
}

export default PrivateKeySigner

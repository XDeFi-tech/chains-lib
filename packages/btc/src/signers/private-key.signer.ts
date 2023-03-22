import { Signer, SignerDecorator } from '@xdefi/chains-core'
import * as Bitcoin from 'bitcoinjs-lib'
import { getSeed } from '@xchainjs/xchain-crypto'

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

  async sign(derivationPath: string, message: BitcoinChainMessage): Promise<S> {
    if (!this.key) {
      throw new Error('Key is required')
    }
    const keys = this.getBitcoinKeys(this.key, derivationPath)
    message.setKeys(keys)
    return keys.publicKey.toString() as S
  }

  private getBitcoinKeys(phrase: string, derivationPath: string) {
    const seed = getSeed(phrase)
    const master = Bitcoin.bip32.fromSeed(seed).derivePath(derivationPath)

    if (!master.privateKey) {
      throw new Error('Could not get private key from phrase')
    }

    return Bitcoin.ECPair.fromPrivateKey(master.privateKey)
  }
}

export default PrivateKeySigner

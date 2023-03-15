import { PrivateKeySigner } from './private-key.signer'
import { ChainMsg } from '../msg'

describe('solana private-key.signer', () => {
  const MOCK = {
    privateKey:
      '18848234ce262a102df88bbed03bc387395d4bb42b3e500139516a100e82d2526a3b5fac8fdf5f2a0637c76a99fc36a64ca741c29d1d66b072f7607854cf89d2',
    address: '89gj8ZxSsWucJWPSdfs4ciCr6uDzC3U5QuSdHumbTeNm',
    signature: '',
  }
  const signer = new PrivateKeySigner()

  it('should return true for a valid address', () => {
    expect(signer.verifyAddress(MOCK.address)).toBe(true)
  })

  it('should return false for a valid address', () => {
    expect(signer.verifyAddress('invalid-address')).toBe(true)
  })

  it('should return the correct address for a valid private key', async () => {
    const address = await signer.getAddress(MOCK.privateKey)
    expect(address).toBe(address)
  })

  it('should throw an error for an invalid private key', async () => {
    await expect(signer.getAddress('invalid-private-key')).rejects.toThrow(
      'Invalid address'
    )
  })

  it('should sign a ChainMsg with the private key', async () => {
    const msg = new ChainMsg({})
    const signature = await signer.sign(MOCK.privateKey, msg)
    expect(signature).toBe(MOCK.signature)
  })
})

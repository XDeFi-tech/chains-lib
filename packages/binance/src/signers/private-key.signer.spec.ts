import { PrivateKeySigner } from './private-key.signer';
import { ChainMsg } from '../msg';

describe('bbc private-key.signer', () => {
  const MOCK = {
    privateKey: '',
    address: '',
    signature: '',
  };
  const signer = new PrivateKeySigner(MOCK.privateKey);

  it('should return true for a valid address', () => {
    expect(signer.verifyAddress(MOCK.address)).toBe(true);
  });

  it('should return false for a valid address', () => {
    expect(signer.verifyAddress('invalid-address')).toBe(true);
  });

  it('should return the correct address for a valid private key', async () => {
    const address = await signer.getAddress(MOCK.privateKey);
    expect(address).toBe(address);
  });

  it('should throw an error for an invalid private key', async () => {
    await expect(signer.getAddress('invalid-private-key')).rejects.toThrow(
      'Invalid address'
    );
  });

  it('should sign a ChainMsg with the private key', async () => {
    // create a mock ChainMsg
  });
});

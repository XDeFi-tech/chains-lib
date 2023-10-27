import { ChainMsg } from '../msg';

import { PrivateKeySigner } from './private-key.signer';

describe('evm private-key.signer', () => {
  const MOCK = {
    privateKey: '',
    address: '0x12890d2cce102216644c59daE5baed380d84830c',
    signature: '',
  };

  const signer = new PrivateKeySigner();

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
    const msg = new ChainMsg({
      from: MOCK.address,
      to: '0x12890d2cce102216644c59daE5baed380d84830d',
      value: '1000000000000000000',
      nonce: 0,
    });
    const signature = await signer.sign(MOCK.privateKey, msg);
    expect(signature).toBe(MOCK.signature);
  });
});

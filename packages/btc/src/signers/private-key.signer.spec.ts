import { PrivateKeySigner } from './private-key.signer';
import { BitcoinChainMessage } from '../bitcoinMessage.js';
import { HaskoinDataSource } from '../datasource/haskoin/haskoin.data-source.js';

describe('btc private-key.signer', () => {
  const MOCK = {
    privateKey: '',
    address: '',
    signature: '',
  };
  const haskoin = new HaskoinDataSource();
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
    const msg = new BitcoinChainMessage(haskoin, {});
    const signature = await signer.sign(MOCK.privateKey, msg);
    expect(signature).toBe(MOCK.signature);
  });
});

import { PrivateKeySigner } from './private-key.signer';
import { BitcoinChainMessage } from '../msg';
import { HaskoinDataSource } from '../datasource/haskoin/haskoin.data-source';
import BigNumber from 'bignumber.js';

describe('btc private-key.signer', () => {
  const MOCK = {
    privateKey: "84'/0'/0'/0/0",
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    signature: '',
  };
  const haskoin = new HaskoinDataSource();
  const signer = new PrivateKeySigner();

  signer.withPhrase(
    'cannon hard jungle anchor field unknown sketch habit chapter loan judge rebuild'
  );

  it('should return true for a valid address', () => {
    expect(signer.verifyAddress(MOCK.address)).toBe(true);
  });

  it('should return false for a valid address', () => {
    expect(signer.verifyAddress('invalid-address')).toBe(false);
  });

  it('should sign a ChainMsg with the private key', async () => {
    const msg = new BitcoinChainMessage(haskoin, {
      amount: new BigNumber(1),
      recipient: 'bc1q7cyrfmck2ffu2ud3rn5l5a8yv6f0chkp0zpemf',
      sender: '39ACoGCp4riBaXQ5mfHMF4mi1Ztia2SZxQ',
    });
    await signer.sign(MOCK.privateKey, msg);
    expect(msg.hasSignature).toBe(true);
  });
});

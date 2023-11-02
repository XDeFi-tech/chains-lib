import { Msg } from '@xdefi-tech/chains-core';

import { LitecoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { LITECOIN_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import PrivateKeySigner from './private-key.signer';

jest.mock('../datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('private-key.signer', () => {
  let privateKey: string;
  let signer: PrivateKeySigner;
  let provider: LitecoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    privateKey = 'Kz1YMmxrFVd2uyCnEHT546Bjw3Wime47AoTQeYATUCSsuirJczu5';
    signer = new PrivateKeySigner(privateKey);

    provider = new LitecoinProvider(new IndexerDataSource(LITECOIN_MANIFEST), {
      apiKey: process.env.BLOCKCHAIR_API_KEY,
    });

    txInput = {
      from: 'ltc1qpupdklp8e0txax205h6yympf3mezyh5xqzlvu8',
      to: 'ltc1qpupdklp8e0txax205h6yympf3mezyh5xqzlvu8',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a private key', async () => {
    expect(await signer.getAddress('', 'p2wpkh')).toBe(txInput.from);
  });

  it('should sign a transaction using a private key', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction).toEqual(
      '020000000001015180a4dd2b9379088a771b5819013a3d4e22b34ef953b31e6fc7992bd61a358e0000000000ffffffff0264000000000000001600140f02db7c27cbd66e994fa5f4426c298ef2225e86ca250000000000001600140f02db7c27cbd66e994fa5f4426c298ef2225e8602483045022100fe59d5606ddafe3ef04e23cff91a7f767e471e6f5fc25335cfa27c2b5b648ec8022024ef38a9f19cd7feb1bce41694aa51baf3b95f5a7acae170609675aace41600101210398c7d1ac211564fa1243fa250debac08f822a0e98490ac365d528918b019da1b00000000'
    );
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey('')).toEqual(
      'Kz1YMmxrFVd2uyCnEHT546Bjw3Wime47AoTQeYATUCSsuirJczu5'
    );
  });
});

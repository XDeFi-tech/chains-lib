import { Msg } from '@xdefi-tech/chains-core';

import { BitcoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BITCOIN_MANIFEST } from '../manifests';
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
  let provider: BitcoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    privateKey = 'Kz1YMmxrFVd2uyCnEHT546Bjw3Wime47AoTQeYATUCSsuirJczu5';
    signer = new PrivateKeySigner(privateKey);

    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));

    txInput = {
      from: '12NNZQp2sWJ4r31XjfR3z56suZxp3gHDnJ',
      to: '12NNZQp2sWJ4r31XjfR3z56suZxp3gHDnJ',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress('', 'p2pkh')).toBe(txInput.from);
  });

  it('should sign a transaction using a ledger device', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction).toBeTruthy();
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

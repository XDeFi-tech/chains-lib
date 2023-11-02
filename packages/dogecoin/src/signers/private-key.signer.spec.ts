import { Msg } from '@xdefi-tech/chains-core';

import { DogecoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { DOGECOIN_MANIFEST } from '../manifests';
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
  let provider: DogecoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    privateKey = 'Kz1YMmxrFVd2uyCnEHT546Bjw3Wime47AoTQeYATUCSsuirJczu5';
    signer = new PrivateKeySigner(privateKey);

    provider = new DogecoinProvider(new IndexerDataSource(DOGECOIN_MANIFEST), {
      apiKey: process.env.BLOCKCHAIR_API_KEY,
    });

    txInput = {
      from: 'D6WU6fkgAvCMP3C8UFQcXqGUnhh7NhfMEF',
      to: 'D6WU6fkgAvCMP3C8UFQcXqGUnhh7NhfMEF',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress('', 'p2pkh')).toBe(txInput.from);
  });

  it('should sign a transaction using a ledger device', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction).toEqual(
      '02000000012520cff3828ea70561e6440da74a6cfeb2cc29bd911f90174c3bd877e6f3eb84000000006a47304402206c031dd64f2cf7c89c46fc0fbb5415ea8abcb29f8f2a743630f75afd70f56b9c02200fb249eeb984e544f1ef81ad313dea79906db1063555d0ec5f81deb2dcb823f201210398c7d1ac211564fa1243fa250debac08f822a0e98490ac365d528918b019da1bffffffff0264000000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688acca250000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688ac00000000'
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

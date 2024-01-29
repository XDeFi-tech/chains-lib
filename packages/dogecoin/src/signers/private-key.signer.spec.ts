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
    privateKey = 'QSyxzBP6nd6bUCqNE11fNBK4MTB7BVPvLMJy6NuveCSUUhACNHSH';
    signer = new PrivateKeySigner(privateKey);

    provider = new DogecoinProvider(new IndexerDataSource(DOGECOIN_MANIFEST), {
      apiKey: process.env.BLOCKCHAIR_API_KEY,
    });

    txInput = {
      from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
      to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the private key', async () => {
    expect(await signer.getAddress('')).toBe(txInput.from);
  });

  it('should sign a transaction using the private key', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction).toEqual(
      '0200000001ad2c88f940cd48f724d667e58323efd048bdea62e32f426cf04b8fdf87071216000000006a4730440220226fd616a55dcb2145c64b4ce70edb033f903be70e723d60577f264f77f09cff022031905b794c212df669c395b747606c3b172f96fcf1ae70844b76ba7f1aadd8cf0121037e6c9ff86d24858e73a75d08d1c4270cf3aa56d421e362eacdd063e264e5b12cffffffff0264000000000000001976a914c602dc308aa94acd75537757eeca791da957e4f188ac3a959800000000001976a914c602dc308aa94acd75537757eeca791da957e4f188ac00000000'
    );
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey('')).toEqual(privateKey);
  });
});

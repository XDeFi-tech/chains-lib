import { Msg } from '@xdefi-tech/chains-core';

import { LitecoinProvider } from '../chain.provider';
import { LITECOIN_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import { SeedPhraseSigner } from './seed-phrase.signer';

jest.mock('../datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('seed-phrase.signer', () => {
  let privateKey: string;
  let derivation: string;
  let seedPhrase: string;
  let signer: SeedPhraseSigner;
  let provider: LitecoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    seedPhrase =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    privateKey = 'T4gbj9QbHwmYkUMS5edgsjN8e1aYvh19d9jWAMeXQMUBZh9mNJwM';
    derivation = "m/84'/2'/0'/0/0";
    signer = new SeedPhraseSigner(seedPhrase);

    provider = new LitecoinProvider(
      new LitecoinProvider.dataSourceList.IndexerDataSource(LITECOIN_MANIFEST)
    );

    txInput = {
      from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
      to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
      amount: 0.000001,
    };
    message = provider.createMsg(txInput);
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation)).toBe(txInput.from);
  });

  it('should sign a transaction using the seed phrase', async () => {
    await signer.sign(message as ChainMsg, derivation);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key from a seed phrase', async () => {
    expect(await signer.getPrivateKey(derivation)).toEqual(privateKey);
  });
});

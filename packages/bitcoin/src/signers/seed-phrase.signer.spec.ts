import { Msg } from '@xdefi-tech/chains-core';

import { BitcoinProvider } from '../chain.provider';
import { BITCOIN_MANIFEST } from '../manifests';
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
  let provider: BitcoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    seedPhrase =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    privateKey = 'KyaowqfYE7mJmTYEpxPJmAXwErQQY6KdDRynbg7SQPTAvC3bLNmF';
    derivation = "m/84'/0'/0'/0/0";
    signer = new SeedPhraseSigner(seedPhrase);
    provider = new BitcoinProvider(
      new BitcoinProvider.dataSourceList.IndexerDataSource(BITCOIN_MANIFEST)
    );

    txInput = {
      from: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      to: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      amount: 0.000001,
      memo: 'test',
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

describe('seed-phase.addressGeneration', () => {
  let derivation: (index: number) => string;
  let seedPhrase: string;
  let signer: SeedPhraseSigner;
  let firstAddress: string;
  let secondAddress: string;

  beforeEach(() => {
    seedPhrase =
      'access before split cram spoon snap secret month sphere fog embark donor';
    derivation = (index) => `m/84'/0'/0'/0/${index}`;
    signer = new SeedPhraseSigner(seedPhrase);

    firstAddress = 'bc1qyfeeuvkq27fcqvpzj4ghkh0je2r8wd8tt53nfd';
    secondAddress = 'bc1q060agetr28x693v4d2y46usd06zyrd9mvc8e95';
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation(0))).toBe(firstAddress);
  });

  it('should get the second address form the seed phrase', async () => {
    expect(await signer.getAddress(derivation(1))).toBe(secondAddress);
  });
});

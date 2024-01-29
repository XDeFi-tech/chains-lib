import { MsgBody } from '../msg';

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
  let txInput: MsgBody;

  beforeEach(() => {
    seedPhrase =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    privateKey = 'QSyxzBP6nd6bUCqNE11fNBK4MTB7BVPvLMJy6NuveCSUUhACNHSH';
    derivation = "m/44'/3'/0'/0/0";
    signer = new SeedPhraseSigner(seedPhrase);

    txInput = {
      from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
      to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
      amount: 0.000001,
    };
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation)).toBe(txInput.from);
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

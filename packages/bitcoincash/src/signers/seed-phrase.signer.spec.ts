import { Msg } from '@xdefi-tech/chains-core';

import { BitcoinCashProvider } from '../chain.provider';
import { BITCOINCASH_MANIFEST } from '../manifests';
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
  let provider: BitcoinCashProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    seedPhrase =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    privateKey = 'Kz1YMmxrFVd2uyCnEHT546Bjw3Wime47AoTQeYATUCSsuirJczu5';
    derivation = "m/44'/145'/0'/0/0";
    signer = new SeedPhraseSigner(seedPhrase);

    provider = new BitcoinCashProvider(
      new BitcoinCashProvider.dataSourceList.IndexerDataSource(
        BITCOINCASH_MANIFEST
      )
    );

    txInput = {
      from: 'qq8s9kmuyl9avm5ef7jlgsnv9x80ygj7scyzcr6vad',
      to: 'qq8s9kmuyl9avm5ef7jlgsnv9x80ygj7scyzcr6vad',
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

  it('should sign a raw transaction using a seed phrase', async () => {
    const txHex =
      '020000000186339733afada6e9c280ed345dba8c67388066e3a0cd887edbc4c4eff3a436950000000000ffffffff0264000000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688acca250000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688ac00000000';
    const signedTx = await signer.signRawTransaction(txHex, derivation);

    expect(signedTx).toEqual(
      '02000000000101a841c88e7ac355b1f4af08ec8b26ca6c9e1cee86b7f1f2d355d75597461a73a80000000000ffffffff0364000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a530000000000000000066a0474657374ac260000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5302483045022100883119b3ba1fccb4ca79d6df974018bba0c838ffc1fbb4abb959e8685a03931002204e40ee30fdb35513f194e55878b79eaa81fde381cc93a0c97f35788ac8f48857012103e389368c5d8bd73599616a574d9b74bf77cb5aee13692e5a3855a7fd2b945f9200000000'
    );
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
    derivation = (index) => `m/44'/145'/0'/0/${index}`;
    signer = new SeedPhraseSigner(seedPhrase);

    firstAddress = 'qp02q64reu5z594wah4kmdajxel5dc0rgg3cd8tu0c';
    secondAddress = 'qqvxlytmvhgpj752jfmm42d5qarx224d35uhllujvl';
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation(0))).toBe(firstAddress);
  });

  it('should get the second address form the seed phrase', async () => {
    expect(await signer.getAddress(derivation(1))).toBe(secondAddress);
  });
});

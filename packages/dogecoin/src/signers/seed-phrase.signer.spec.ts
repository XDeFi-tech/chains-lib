import { Msg } from '@xdefi-tech/chains-core';
import { BlockchairDataProvider } from '@xdefi-tech/chains-utxo';

import { DogecoinProvider } from '../chain.provider';
import { DOGECOIN_MANIFEST } from '../manifests';
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
  let provider: DogecoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeAll(() => {
    jest
      .spyOn(BlockchairDataProvider.prototype, 'scanUTXOs')
      .mockResolvedValue([
        {
          hash: '16120787df8f4bf06c422fe362eabd48d0ef2383e567d624f748cd40f9882cad',
          value: 10000000,
          index: 0,
          witnessUtxo: {
            value: 10000000,
            script: Buffer.from([
              118, 169, 20, 198, 2, 220, 48, 138, 169, 74, 205, 117, 83, 119,
              87, 238, 202, 121, 29, 169, 87, 228, 241, 136, 172,
            ]),
          },
          txHex:
            '010000000102a95e8c5a5ebefa6431867f1e1691e5dd9cad10b2d1e8efce9b15c48c86f68d000000006b483045022100f21d3cac7d1332fdea2b33b8dd9859743b923dfa42431b49512d8dbb81acce5702204d2a009e45657147acf1b23204bc01a0d338e86c8cad458a394d933e2b3f24f20121031db6a1e76aad4f63aaea779d05a15a5619749a808c8d5b6856ae449b503e1d58ffffffff0280969800000000001976a914c602dc308aa94acd75537757eeca791da957e4f188ac700c4c05000000001976a91447542a50d8d84ed278690657e36bdda110f0181688ac00000000',
        },
      ]);
  });

  beforeEach(() => {
    seedPhrase =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    privateKey = 'QSyxzBP6nd6bUCqNE11fNBK4MTB7BVPvLMJy6NuveCSUUhACNHSH';
    derivation = "m/44'/3'/0'/0/0";
    signer = new SeedPhraseSigner(seedPhrase);
    provider = new DogecoinProvider(
      new DogecoinProvider.dataSourceList.IndexerDataSource(DOGECOIN_MANIFEST)
    );

    txInput = {
      from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
      to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
      amount: 0.000001,
    };
    message = provider.createMsg(txInput);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation)).toBe(txInput.from);
  });

  it('should sign a transaction using the seed phrase', async () => {
    await signer.sign(message as ChainMsg, derivation);

    expect(message.signedTransaction).toEqual(
      '0200000001ad2c88f940cd48f724d667e58323efd048bdea62e32f426cf04b8fdf87071216000000006a473044022068b491ee366b00d7ee0643111977b4f9d69d280446e4672c25f91e137f82ca5702205ce414f90daa6cb99f79ad80db6b2fb6cc700dcb74594e57b4f87b72d60260bf0121037e6c9ff86d24858e73a75d08d1c4270cf3aa56d421e362eacdd063e264e5b12cffffffff0164000000000000001976a914c602dc308aa94acd75537757eeca791da957e4f188ac00000000'
    );
  });

  it('should sign a raw transaction using a seed phrase', async () => {
    const txHex =
      '70736274ff0100800200000001a841c88e7ac355b1f4af08ec8b26ca6c9e1cee86b7f1f2d355d75597461a73a80000000000ffffffff0364000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a530000000000000000066a0474657374ac260000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5300000000000100de01000000000101426c66ff1f3b908caa99e2added93d818408c6df40448262b3fdb3b1ea934a9c0100000000ffffffff0210270000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a53017a1400000000001600148f8c74cae629eb02883b3d70ac030617fd2e1a6602473044022045b7469de22230b35493fab0f2c5ca4ae3ac84c9c14c9530ea40ada7fa9e1f9c02203efa57d574ffd1a816e58f69cd7b05e7ce42c66167378f0eaed90cee8552ebc20121025182c020a60cdf306deb7a9b3eb4ed26656864e7a3969b6e372323b29d0666a30000000001011f10270000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5300000000';
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
    derivation = (index) => `m/44'/3'/0'/0/${index}`;
    signer = new SeedPhraseSigner(seedPhrase);

    firstAddress = 'DARHZHj9nAo3wJeTk3iTBDTPyXKK4kEDkt';
    secondAddress = 'D6aKxv5tZLoao6JtBj7pb53ApZCeL4cqRF';
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation(0))).toBe(firstAddress);
  });

  it('should get the second address form the seed phrase', async () => {
    expect(await signer.getAddress(derivation(1))).toBe(secondAddress);
  });
});

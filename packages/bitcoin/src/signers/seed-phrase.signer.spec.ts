import { BitcoinProvider } from '../chain.provider';
import { BITCOIN_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import { SeedPhraseSigner } from './seed-phrase.signer';

jest.mock('../datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [
      {
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        amount: {
          value: '0',
        },
        asset: {
          chain: 'Bitcoin',
          contract: null,
          id: 'bcafa2bf-d442-483a-96a4-0199f4371678',
          name: 'Bitcoin',
          symbol: 'BTC',
          image:
            'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
          decimals: 8,
          price: {
            amount: '67310',
          },
          type: 'CRYPTOCURRENCY',
        },
      },
    ];
  },
}));

jest.mock('../datasource/indexer/queries/scanUTXOs.query', () => ({
  scanUTXOs: () => {
    return [
      {
        oTxHash:
          'e4b7161d1b26d3eee736adc70c42f7c47c901ac3bede07de2c0e002d3ead6afb',
        oIndex: 0,
        oTxHex:
          '0200000000010109e9e018877c28b71477cb885c040920169c66a2b21c3454412dd76d5d6c192a0000000000ffffffff02d0070000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a538e71000000000000160014d52ed37779898f360848ae49bb0ee089b6d36d2c024830450221009ecbf782d2a671cc369af031fd66fb83a291cbb1ec0b8ba3fe30970c437834a502203a91029d6a4a480e35a1eef9a69131cfa0159d02767fb8fe179363d23c6f66f70121022a6b486ca1b607a767fb1bf9432fa0b5031d9d1ece37ae02bc31d749d5ae65d500000000',
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        scriptHex: '00144e209aaf99f4b08cb5b583f4e87b546b00ea5a53',
        isCoinbase: null,
        value: {
          value: '2000',
        },
      },
    ];
  },
}));

jest.mock('../datasource/indexer/queries/fees.query', () => ({
  getFees: jest.fn().mockResolvedValue({
    low: 3000,
    medium: 3000,
    high: 3000,
  }),
}));

describe('seed-phrase.signer', () => {
  let privateKey: string;
  let derivation: string;
  let seedPhrase: string;
  let signer: SeedPhraseSigner;
  let provider: BitcoinProvider;
  let txInput: MsgBody;
  let message: ChainMsg;

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

  jest.setTimeout(15000);

  it('should sign a transaction using the seed phrase', async () => {
    await signer.sign(message, derivation);

    expect(message.signedTransaction).toEqual(
      '02000000000101fb6aad3e2d000e2cde07debec31a907cc4f7420cc7ad36e7eed3261b1d16b7e40000000000ffffffff0364000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a530000000000000000066a047465737498050000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a530247304402205867a1f3301c27ec8bd311dfed940f030fa6700b19b4b14c841153bc086a6b2d0220724fac48d0680bab9ac836c01a34ab951aa4ce42b51edd337f46ea47f73052e6012103e389368c5d8bd73599616a574d9b74bf77cb5aee13692e5a3855a7fd2b945f9200000000'
    );
  });

  it('should sign a raw transaction using the seed phrase', async () => {
    const txHex =
      '70736274ff0100800200000001a841c88e7ac355b1f4af08ec8b26ca6c9e1cee86b7f1f2d355d75597461a73a80000000000ffffffff0364000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a530000000000000000066a0474657374ac260000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5300000000000100de01000000000101426c66ff1f3b908caa99e2added93d818408c6df40448262b3fdb3b1ea934a9c0100000000ffffffff0210270000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a53017a1400000000001600148f8c74cae629eb02883b3d70ac030617fd2e1a6602473044022045b7469de22230b35493fab0f2c5ca4ae3ac84c9c14c9530ea40ada7fa9e1f9c02203efa57d574ffd1a816e58f69cd7b05e7ce42c66167378f0eaed90cee8552ebc20121025182c020a60cdf306deb7a9b3eb4ed26656864e7a3969b6e372323b29d0666a30000000001011f10270000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5300000000';
    const signedTx = await signer.signRawTransaction(txHex, derivation);

    expect(signedTx).toEqual(
      '02000000000101a841c88e7ac355b1f4af08ec8b26ca6c9e1cee86b7f1f2d355d75597461a73a80000000000ffffffff0364000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a530000000000000000066a0474657374ac260000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5302483045022100883119b3ba1fccb4ca79d6df974018bba0c838ffc1fbb4abb959e8685a03931002204e40ee30fdb35513f194e55878b79eaa81fde381cc93a0c97f35788ac8f48857012103e389368c5d8bd73599616a574d9b74bf77cb5aee13692e5a3855a7fd2b945f9200000000'
    );
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

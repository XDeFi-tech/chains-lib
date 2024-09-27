import { Msg } from '@ctrl-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';

import { BitcoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BITCOIN_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import LedgerSigner from './ledger.signer';

jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@ledgerhq/hw-app-btc', () => {
  return jest.fn().mockImplementation(() => ({
    splitTransaction: jest.fn().mockReturnValue({}),
    createPaymentTransaction: jest
      .fn()
      .mockResolvedValue(
        '02000000000101fb6aad3e2d000e2cde07debec31a907cc4f7420cc7ad36e7eed3261b1d16b7e40000000000ffffffff0364000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5300000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a536c070000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5302483045022100aebc0d5d7ae241077cb33e635ef36cf347674c0468051e5c4fab6d919d52ddf102203609428e2d61c4ab7208ab78801f45215d5a32b037be4257ca22fb85f585188f012103e389368c5d8bd73599616a574d9b74bf77cb5aee13692e5a3855a7fd2b945f9200000000'
      ),
    getWalletPublicKey: jest.fn().mockResolvedValue({
      bitcoinAddress: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      publicKey: 'PUBKEY',
      chainCode: 'code',
    }),
  }));
});

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

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: BitcoinProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
    derivationPath = "m/84'/0'/0'/0/0";

    txInput = {
      from: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      to: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      amount: 0.000001,
      memo: 'test',
    };

    message = provider.createMsg(txInput);
  });

  afterEach(() => {
    externalTransport.close();
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  });

  it('should sign a transaction using a ledger device', async () => {
    await signer.sign(message as ChainMsg, derivationPath);

    expect(message.signedTransaction).toEqual(
      '02000000000101fb6aad3e2d000e2cde07debec31a907cc4f7420cc7ad36e7eed3261b1d16b7e40000000000ffffffff0364000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5300000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a536c070000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5302483045022100aebc0d5d7ae241077cb33e635ef36cf347674c0468051e5c4fab6d919d52ddf102203609428e2d61c4ab7208ab78801f45215d5a32b037be4257ca22fb85f585188f012103e389368c5d8bd73599616a574d9b74bf77cb5aee13692e5a3855a7fd2b945f9200000000'
    );
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});

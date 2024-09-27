import { Msg } from '@ctrl-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';

import { LitecoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { LITECOIN_MANIFEST } from '../manifests';
import { MsgBody, ChainMsg } from '../msg';

import LedgerSigner from './ledger.signer';
jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@ledgerhq/hw-app-btc', () => {
  return jest.fn().mockImplementation(() => ({
    signMessage: jest.fn().mockResolvedValue({
      v: 1,
      r: '0x2284d1273433b82201150965837d843b4978d50a26f1a93be3ee686c7f36ee6c',
      s: '0x40aafc22ba5cb3d5147e953af0acf45d768d8976dd61d8917118814302680421',
    }),
    splitTransaction: jest.fn().mockResolvedValue({}),
    getWalletPublicKey: jest.fn().mockResolvedValue({
      bitcoinAddress: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      publicKey: 'PUBKEY',
      chainCode: 'code',
    }),
    createPaymentTransaction: jest.fn().mockResolvedValue('SIGNEDTX'),
  }));
});

jest.mock('../datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [
      {
        address: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        amount: {
          value: '10000',
        },
        asset: {
          chain: 'Litecoin',
          contract: null,
          id: 'f8e964b8-2df8-4039-8e6d-013e84dc8d07',
          name: 'Litecoin',
          symbol: 'LTC',
          image:
            'https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580',
          decimals: 8,
          price: {
            amount: '84.87',
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
  let provider: LitecoinProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    const dataSource = new IndexerDataSource(LITECOIN_MANIFEST);

    provider = new LitecoinProvider(dataSource, {
      apiKey: process.env.BLOCKCHAIR_API_KEY,
    });

    derivationPath = "m/44'/2'/0'/0/0";

    txInput = {
      from: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      to: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      amount: 0.000001,
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

    expect(message.signedTransaction).toEqual('SIGNEDTX');
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

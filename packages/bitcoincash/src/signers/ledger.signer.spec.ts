import { Msg } from '@xdefi-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';

import { BitcoinCashProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BITCOINCASH_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

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
      bitcoinAddress: '1FS3yCCpo5sebDoMBeLe8p6CWBpzS3bXEj',
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
        address: 'qq8s9kmuyl9avm5ef7jlgsnv9x80ygj7scyzcr6vad',
        amount: {
          value: '200000',
        },
        asset: {
          chain: 'BitcoinCash',
          contract: null,
          id: '2570e861-d543-4ccf-a9a8-105f77dd746a',
          name: 'Bitcoin Cash',
          symbol: 'BCH',
          image:
            'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1594689492',
          decimals: 8,
          price: {
            amount: '493.5',
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
  let provider: BitcoinCashProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    provider = new BitcoinCashProvider(
      new IndexerDataSource(BITCOINCASH_MANIFEST)
    );
    derivationPath = "m/44'/145'/0'/0/0";

    txInput = {
      from: '1FS3yCCpo5sebDoMBeLe8p6CWBpzS3bXEj',
      to: '1FS3yCCpo5sebDoMBeLe8p6CWBpzS3bXEj',
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

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});

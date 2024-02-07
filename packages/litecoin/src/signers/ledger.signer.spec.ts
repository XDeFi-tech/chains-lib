import { Msg } from '@xdefi-tech/chains-core';
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
    return [];
  },
}));

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let signerWithExternalTransport: LedgerSigner;
  let derivationPath: string;
  let provider: LitecoinProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signerWithExternalTransport = new LedgerSigner(externalTransport);

    signer = new LedgerSigner();

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

  it('should sign a transaction using a ledger device and external transport', async () => {
    await signerWithExternalTransport.sign(message as ChainMsg, derivationPath);

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

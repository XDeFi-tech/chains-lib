import { Msg } from '@xdefi-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';
import { BlockchairDataProvider } from '@xdefi-tech/chains-utxo';
import * as Dogecoin from 'bitcoinjs-lib';

import { DogecoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { DOGECOIN_MANIFEST } from '../manifests';
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
      bitcoinAddress: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
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

jest.mock('coinselect/accumulative', () => ({
  __esModule: true,
  default: () => ({
    inputs: [{ value: 1000, witnessUtxo: { script: '' } }],
    outputs: [{ value: 100 }],
  }),
}));

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: DogecoinProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeAll(() => {
    jest
      .spyOn(BlockchairDataProvider.prototype, 'scanUTXOs')
      .mockResolvedValue([
        {
          hash: 'hash1',
          value: 10000,
          index: 0,
          witnessUtxo: {
            value: 10000,
            script: Buffer.from('0x0', 'hex'),
          },
          txHex: 'raw_transaction',
        },
      ]);

    jest
      .spyOn(Dogecoin.Psbt.prototype, 'addInput')
      .mockReturnValue({} as Dogecoin.Psbt);
  });

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    const dataSource = new IndexerDataSource(DOGECOIN_MANIFEST);

    provider = new DogecoinProvider(dataSource, {
      apiKey: process.env.BLOCKCHAIR_API_KEY,
    });

    derivationPath = "m/44'/3'/0'/0/0";

    txInput = {
      from: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      to: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  afterEach(() => {
    externalTransport.close();
    jest.clearAllMocks();
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

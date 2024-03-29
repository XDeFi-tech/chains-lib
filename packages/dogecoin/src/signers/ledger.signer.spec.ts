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

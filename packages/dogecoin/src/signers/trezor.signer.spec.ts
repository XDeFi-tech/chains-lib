import {
  SignedTransaction,
  GetAddress,
  Params,
  Success,
} from '@trezor/connect-web';
import { ChainMsg, MsgBody } from '@xdefi-tech/chains-utxo';

import { DogecoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { DOGECOIN_MANIFEST } from '../manifests';

jest.setTimeout(10000);

import TrezorSigner from './trezor.signer';
jest.mock('@trezor/connect-web', () => ({
  init: jest.fn().mockImplementation(),
  signTransaction: jest.fn().mockImplementation(() => {
    const txResponse: Success<SignedTransaction> = {
      success: true,
      payload: {
        signatures: [],
        serializedTx: 'TESTTX',
      },
    };

    return txResponse;
  }),
  getAddress: jest.fn().mockImplementation((params: Params<GetAddress>) => {
    const addressResponse: Success<GetAddress> = {
      success: true,
      payload: {
        address: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
        path: params.path,
      },
    };

    return addressResponse;
  }),
}));

jest.mock('../datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('trezor.signer', () => {
  let signer: TrezorSigner;
  let derivationPath: string;
  let provider: DogecoinProvider;
  let txInput: MsgBody;
  let message: ChainMsg;

  beforeAll(() => {
    jest.spyOn(IndexerDataSource.prototype, 'scanUTXOs').mockResolvedValue([
      {
        hash: '16120787df8f4bf06c422fe362eabd48d0ef2383e567d624f748cd40f9882cad',
        value: 10000000,
        index: 0,
        witnessUtxo: {
          value: 10000000,
          script: Buffer.from([
            118, 169, 20, 198, 2, 220, 48, 138, 169, 74, 205, 117, 83, 119, 87,
            238, 202, 121, 29, 169, 87, 228, 241, 136, 172,
          ]),
        },
        txHex:
          '010000000102a95e8c5a5ebefa6431867f1e1691e5dd9cad10b2d1e8efce9b15c48c86f68d000000006b483045022100f21d3cac7d1332fdea2b33b8dd9859743b923dfa42431b49512d8dbb81acce5702204d2a009e45657147acf1b23204bc01a0d338e86c8cad458a394d933e2b3f24f20121031db6a1e76aad4f63aaea779d05a15a5619749a808c8d5b6856ae449b503e1d58ffffffff0280969800000000001976a914c602dc308aa94acd75537757eeca791da957e4f188ac700c4c05000000001976a91447542a50d8d84ed278690657e36bdda110f0181688ac00000000',
      },
    ]);
  });

  beforeEach(() => {
    signer = new TrezorSigner();

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
    jest.clearAllMocks();
  });

  it('should fail signing if trezor device is not initialized', async () => {
    expect(async () => {
      await signer.sign(message as ChainMsg, derivationPath);
    }).rejects.toThrow('Trezor connection is not initialized yet!');
  });

  it('should fail getting addresses if trezor device is not initialized', async () => {
    expect(async () => {
      await signer.getAddress(derivationPath);
    }).rejects.toThrow('Trezor connection is not initialized yet!');
  });

  it('should get an address from the trezor device', async () => {
    await signer.initTrezor('test@test.com', 'localhost');

    expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  });

  it('should sign a transaction using a trezor device', async () => {
    await signer.sign(message as ChainMsg, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});

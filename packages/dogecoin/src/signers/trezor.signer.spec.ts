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

  beforeEach(() => {
    signer = new TrezorSigner();

    const dataSource = new IndexerDataSource(DOGECOIN_MANIFEST);

    provider = new DogecoinProvider(dataSource, {
      apiKey: process.env.BLOCKCHAIR_API_KEY
    });
    derivationPath = "m/44'/0'/0'/0/0";

    txInput = {
      from: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      to: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
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

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('btc123')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});

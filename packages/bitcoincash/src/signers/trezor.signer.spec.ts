import {
  SignedTransaction,
  GetAddress,
  Params,
  Success,
  parseConnectSettings,
} from '@trezor/connect-web';
import { ChainMsg, MsgBody } from '@xdefi-tech/chains-utxo';

import { BitcoinCashProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BITCOINCASH_MANIFEST } from '../manifests';

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
        address: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
        path: params.path,
      } as any,
    };

    return addressResponse;
  }),
  parseConnectSettings: jest.fn().mockImplementation(() => {
    return {
      configSrc: './data/config.json',
      version: '9.4.1',
      debug: false,
      priority: 2,
      trustedHost: true,
      connectSrc: undefined,
      iframeSrc: 'https://connect.trezor.io/9/iframe.html',
      popup: false,
      popupSrc: 'https://connect.trezor.io/9/popup.html',
      webusbSrc: 'https://connect.trezor.io/9/webusb.html',
      transports: undefined,
      pendingTransportEvent: true,
      env: 'web',
      lazyLoad: false,
      timestamp: 1720698767783,
      interactionTimeout: 600,
    };
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
  let provider: BitcoinCashProvider;
  let txInput: MsgBody;
  let message: ChainMsg;

  beforeEach(() => {
    signer = new TrezorSigner();

    const dataSource = new IndexerDataSource(BITCOINCASH_MANIFEST);

    provider = new BitcoinCashProvider(dataSource);
    derivationPath = "m/44'/145'/0'/0/0";

    txInput = {
      from: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      to: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should fail signing if trezor device is not initialized', async () => {
    expect(async () => {
      await signer.sign(message, derivationPath);
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
    await signer.sign(message, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});

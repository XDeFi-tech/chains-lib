import {
  GetAddress,
  Params,
  Success,
  PROTO,
  parseConnectSettings,
} from '@trezor/connect-web';

import { ChainMsg, MsgBody } from '../msg';
import { BinanceProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BINANCE_MANIFEST } from '../manifests';

import TrezorSigner from './trezor.signer';
jest.mock('@trezor/connect-web', () => ({
  init: jest.fn().mockImplementation(),
  binanceSignTransaction: jest.fn().mockImplementation(() => {
    const txResponse: Success<PROTO.BinanceSignedTx> = {
      success: true,
      payload: {
        signature: 'SIGNED',
        public_key: 'PUBKEY',
      },
    };

    return txResponse;
  }),
  binanceGetAddress: jest
    .fn()
    .mockImplementation((params: Params<GetAddress>) => {
      const addressResponse: Success<GetAddress> = {
        success: true,
        payload: {
          address: 'bnb1l2zmxlheuk2u0wfy3l6czskp0z5sa4qklgdfzm',
          path: params.path,
        },
      };

      return addressResponse;
    }),
  parseConnectSettings: jest.fn().mockImplementation(() => {
    return {
      configSrc: './data/config.json',
      version: '9.1.4',
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
  let provider: BinanceProvider;
  let txInput: MsgBody;
  let message: ChainMsg;

  beforeEach(() => {
    signer = new TrezorSigner();

    const dataSource = new IndexerDataSource(BINANCE_MANIFEST);

    provider = new BinanceProvider(dataSource);
    derivationPath = "m/84'/0'/0'/0/0";

    txInput = {
      from: 'bnb1l2zmxlheuk2u0wfy3l6czskp0z5sa4qklgdfzm',
      to: 'bnb1l2zmxlheuk2u0wfy3l6czskp0z5sa4qklgdfzm',
      amount: 0.000001,
      denom: 'bnb',
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
    await signer.initTrezor('test@test.com', 'localhost', {
      ...parseConnectSettings(),
      lazyLoad: true,
    });

    expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  });

  it('should sign a transaction using a trezor device', async () => {
    await signer.sign(message, derivationPath);

    expect(message.signedTransaction).toEqual('SIGNED');
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});

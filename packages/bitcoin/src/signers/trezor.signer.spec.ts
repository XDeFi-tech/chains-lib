import {
  SignedTransaction,
  GetAddress,
  Params,
  Success,
  parseConnectSettings,
  SignMessage,
  PROTO,
} from '@trezor/connect-web';

import { BitcoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BITCOIN_MANIFEST } from '../manifests';
import { MsgBody, ChainMsg } from '../msg';

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
  signMessage: jest.fn().mockImplementation((params: Params<SignMessage>) => {
    const signatureResponse: Success<PROTO.MessageSignature> = {
      success: true,
      payload: {
        address: 'bc1qyfeeuvkq27fcqvpzj4ghkh0je2r8wd8tt53nfd',
        signature:
          'H/6H/Liqxk5YDaZqdhGL8xFCDpOwy3Yg3tVjt4eZiCcdbQ+vpXRs5IwtEiCbGGdykwRflwIK0IoR1SLTfm1oCWM=',
      },
    };
    return Promise.resolve(signatureResponse);
  }),
  getAddress: jest.fn().mockImplementation((params: Params<GetAddress>) => {
    const addressResponse: Success<GetAddress> = {
      success: true,
      payload: {
        address: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
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

jest.mock('../datasource/indexer/queries/fees.query', () => {
  const originalModule = jest.requireActual(
    '../datasource/indexer/queries/fees.query'
  );
  return {
    __esModule: true,
    ...originalModule,
    getFees: jest.fn().mockResolvedValue({
      high: 3000,
      medium: 3000, // 3000 sat/kvB => 3 sat/vB
      low: 3000,
    }),
  };
});

describe('trezor.signer', () => {
  let signer: TrezorSigner;
  let derivationPath: string;
  let provider: BitcoinProvider;
  let txInput: MsgBody;
  let message: ChainMsg;

  beforeEach(() => {
    signer = new TrezorSigner();

    const dataSource = new IndexerDataSource(BITCOIN_MANIFEST);

    provider = new BitcoinProvider(dataSource);
    derivationPath = "m/84'/0'/0'/0/0";

    txInput = {
      from: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
      to: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
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

  jest.setTimeout(15000);

  it('should sign a transaction using a trezor device', async () => {
    await signer.sign(message, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });

  it('should sign a message using a trezor device', async () => {
    const message = 'Hello World';
    const signature = await signer.signMessage(message, derivationPath);

    expect(signature).toEqual(
      'H/6H/Liqxk5YDaZqdhGL8xFCDpOwy3Yg3tVjt4eZiCcdbQ+vpXRs5IwtEiCbGGdykwRflwIK0IoR1SLTfm1oCWM='
    );
  });
});

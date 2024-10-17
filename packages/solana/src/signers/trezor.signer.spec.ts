import base58 from 'bs58';

import { ChainMsg, MsgBody } from '../msg';
import { SolanaProvider } from '../chain.provider';
import { SOLANA_MANIFEST } from '../manifests';

import TrezorSigner from './trezor.signer';

jest.mock('@trezor/connect-web', () => ({
  init: jest.fn().mockImplementation(),
  solanaSignTransaction: jest.fn().mockResolvedValue({
    id: 3,
    success: true,
    payload: {
      signature:
        '13e8093196ff3f015e9ac69dba2d428b2def80f2a06608e6b92e1c99825b6eb24f19eee253c4edf79ec7accf82f65cc32fbba98cdc61f2dcdc5396d349b16400',
    },
  }),
  solanaGetPublicKey: jest.fn().mockResolvedValue({
    id: 2,
    success: true,
    payload: {
      path: [2147483692, 2147484149, 2147483648, 2147483648],
      serializedPath: "m/44'/501'/0'/0'",
      publicKey:
        '7937cd83d21bf64163ee2440bb749e1b51ae7cfd0aca7c816fa23f8b0c79cd42',
    },
  }),
  parseConnectSettings: jest.fn().mockImplementation(() => {
    return {
      id: 5,
      success: true,
      payload: {
        configSrc: './data/config.json',
        version: '9.4.1',
        debug: false,
        priority: 0,
        trustedHost: true,
        iframeSrc: 'https://connect.trezor.io/9/iframe.html',
        popup: true,
        popupSrc: 'https://connect.trezor.io/9/popup.html',
        webusbSrc: 'https://connect.trezor.io/9/webusb.html',
        transports: ['BridgeTransport'],
        pendingTransportEvent: true,
        env: 'web',
        lazyLoad: false,
        timestamp: 1727773309742,
        interactionTimeout: 600,
        sharedLogger: true,
        manifest: {
          email: 'example@test.com',
          appUrl: 'localhost',
        },
        coreMode: 'auto',
        origin: 'http://localhost:3000',
        webusb: false,
      },
    };
  }),
}));

describe('trezor.signer', () => {
  let signer: TrezorSigner;
  let provider: SolanaProvider;
  let txInput: MsgBody;
  let message: ChainMsg;
  let derivationPath: string;

  beforeEach(() => {
    signer = new TrezorSigner();
    provider = new SolanaProvider(
      new SolanaProvider.dataSourceList.IndexerDataSource(SOLANA_MANIFEST)
    );
    txInput = {
      from: '9ABgeyS7pN2ow7gTxc7yqedCM8ntpbwUxCwie8Et6pL1',
      to: '9ABgeyS7pN2ow7gTxc7yqedCM8ntpbwUxCwie8Et6pL1',
      amount: '0.04',
    };
    message = provider.createMsg(txInput);
    derivationPath = "m/44'/501'/0'/0'";
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

    expect(message.signedTransaction.sig).toBe(
      base58.encode(
        Buffer.from(
          '13e8093196ff3f015e9ac69dba2d428b2def80f2a06608e6b92e1c99825b6eb24f19eee253c4edf79ec7accf82f65cc32fbba98cdc61f2dcdc5396d349b16400',
          'hex'
        )
      )
    );
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});

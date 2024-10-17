import {
  SignedTransaction,
  GetAddress,
  Params,
  Success,
  parseConnectSettings,
} from '@trezor/connect-web';
import { ChainMsg, MsgBody } from '@xdefi-tech/chains-utxo';

import { LitecoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { LITECOIN_MANIFEST } from '../manifests';

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
        address: 'ltc1q8n2sn0q4q70j4zfqx0wegaw6m2vtm023xprje6',
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

jest.mock('../datasource/indexer/queries/scanUTXOs.query', () => ({
  scanUTXOs: jest.fn().mockResolvedValue([
    {
      address: 'ltc1q8n2sn0q4q70j4zfqx0wegaw6m2vtm023xprje6',
      oIndex: 1,
      oTxHash:
        'bac84778220d7c2722acaf15bbc6c330f0d6c183a9b3306bd6a658ef0d2df4a8',
      oTxHex:
        '01000000036ed53b0c110d1d63d12380ca823d939f556158672a0cc2c6d9302cb6580679fa010000006b483045022100f3af25f14826b54ba7c402e236db87b75a6a818da5599218a7285cda687239390220690eb2c4a46943a1794b045ebbebb31913ab4b68530eabebde3b922563e8d355012102389d7365470415a19fb618e0e9bdd9e50f18b2866d4e99aaa3b8b5fe5e4a9474fffffffff863b349d6441915a19b9ad6967df6a69500fbb2796c81ac117af0b379c541a6000000006a47304402203460753a6820be156bf1adb98cb63705b9ab2e4a1b27ab518d43c16e0724453702207fa208ae552c13b084d2eb2b9898841f44bb27b333c42ec7a79bcc3b88b91f2b012102389d7365470415a19fb618e0e9bdd9e50f18b2866d4e99aaa3b8b5fe5e4a9474ffffffffb37aa4cbb77b0d5a10f9563ba2ed812d65ef790ba1aacc3fb629aa1620cd725f000000006a47304402206a64c0d609a37a3790ea2f1373fb3b3f9b51a5a4e732894562e3711a8b73422d02204b77b5a28151fb368f606cc118f0d7422aa58ea7a55f4a95244498ee4eefa641012102389d7365470415a19fb618e0e9bdd9e50f18b2866d4e99aaa3b8b5fe5e4a9474ffffffff024c89010100000000160014532690e393e2e4df16619ba8f74fb0687feb282350130000000000001976a914efbb1919c0fd31f76a8aa0d09aa2f3c6a36d946888ac00000000',
      scriptHex: '76a914efbb1919c0fd31f76a8aa0d09aa2f3c6a36d946888ac',
      value: {
        value: '4944',
      },
    },
  ]),
}));

describe('trezor.signer', () => {
  let signer: TrezorSigner;
  let derivationPath: string;
  let provider: LitecoinProvider;
  let txInput: MsgBody;
  let message: ChainMsg;

  beforeEach(() => {
    signer = new TrezorSigner();

    const dataSource = new IndexerDataSource(LITECOIN_MANIFEST);

    provider = new LitecoinProvider(dataSource, {
      apiKey: process.env.BLOCKCHAIR_API_KEY,
    });
    derivationPath = "m/84'/2'/0'/0/0";

    txInput = {
      from: 'ltc1q8n2sn0q4q70j4zfqx0wegaw6m2vtm023xprje6',
      to: 'ltc1q8n2sn0q4q70j4zfqx0wegaw6m2vtm023xprje6',
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

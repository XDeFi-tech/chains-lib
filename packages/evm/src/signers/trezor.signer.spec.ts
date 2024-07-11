import { Msg } from '@xdefi-tech/chains-core';
import {
  EthereumSignedTx,
  GetAddress,
  Params,
  Success,
  parseConnectSettings,
} from '@trezor/connect-web';

import { EvmProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { EVM_MANIFESTS } from '../manifests';
import { ChainMsg, MsgBody, EIP712Data, Signature } from '../msg';

import TrezorSigner from './trezor.signer';
jest.mock('@trezor/connect-web', () => ({
  init: jest.fn().mockImplementation(),
  ethereumSignTransaction: jest.fn().mockImplementation(() => {
    const txResponse: Success<EthereumSignedTx> = {
      success: true,
      payload: {
        v: '1',
        r: '0x2284d1273433b82201150965837d843b4978d50a26f1a93be3ee686c7f36ee6c',
        s: '0x40aafc22ba5cb3d5147e953af0acf45d768d8976dd61d8917118814302680421',
      },
    };

    return txResponse;
  }),
  ethereumGetAddress: jest
    .fn()
    .mockImplementation((params: Params<GetAddress>) => {
      const addressResponse: Success<GetAddress> = {
        success: true,
        payload: {
          address: '0x62e4f988d231E16c9A666DD9220865934a347900',
          path: params.path,
        },
      };

      return addressResponse;
    }),
  ethereumSignTypedData: jest.fn().mockImplementation(() => {
    return {
      success: true,
      payload: {
        v: '1',
        r: '0x2284d1273433b82201150965837d843b4978d50a26f1a93be3ee686c7f36ee6c',
        s: '0x40aafc22ba5cb3d5147e953af0acf45d768d8976dd61d8917118814302680421',
      },
    };
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

describe('trezor.signer', () => {
  let signer: TrezorSigner;
  let derivationPath: string;
  let provider: EvmProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    signer = new TrezorSigner();

    provider = new EvmProvider(new IndexerDataSource(EVM_MANIFESTS.ethereum));
    derivationPath = "m/44'/60'/0'/0/0";

    txInput = {
      from: '0x62e4f988d231E16c9A666DD9220865934a347900',
      to: '0x62e4f988d231E16c9A666DD9220865934a347900',
      amount: 0.000001,
      nonce: 0,
      chainId: 1,
      decimals: 18,
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
    await signer.initTrezor('test@test.com', 'localhost', {
      ...parseConnectSettings(),
      lazyLoad: true,
    });

    expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  });

  it('should sign a transaction using a trezor device', async () => {
    await signer.initTrezor('test@test.com', 'localhost', {
      ...parseConnectSettings(),
      lazyLoad: true,
    });
    await signer.sign(message as ChainMsg, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });

  it('should fail if public key is requested', async () => {
    expect(signer.getPublicKey(derivationPath)).rejects.toThrowError();
  });

  it('should return ledger signature', async () => {
    const eip712Data = {
      domain: {
        name: 'MyDApp',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      },
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Transfer: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
        ],
      },
      primaryType: 'Transfer',
      message: {
        from: '0x62e4f988d231E16c9A666DD9220865934a347900',
        to: '0x62e4f988d231E16c9A666DD9220865934a347900',
        amount: 0.000001,
        nonce: 0,
      },
    } as EIP712Data;

    const signature = await signer.signTypedData(
      derivationPath,
      eip712Data.domain,
      eip712Data.types,
      eip712Data.primaryType,
      eip712Data.message
    );

    const { v, r, s } = signature as Signature;

    expect(signature).not.toBeNull();
    expect(v).toBe('1');
    expect(r).toBe(
      '0x2284d1273433b82201150965837d843b4978d50a26f1a93be3ee686c7f36ee6c'
    );
    expect(s).toBe(
      '0x40aafc22ba5cb3d5147e953af0acf45d768d8976dd61d8917118814302680421'
    );
  });
});

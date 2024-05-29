import {
  SignedTransaction,
  GetAddress,
  Params,
  Success,
} from '@trezor/connect-web';
import { ChainMsg, MsgBody } from '@xdefi-tech/chains-utxo';

import { DashProvider } from '../chain.provider';
import { DASH_MANIFEST } from '../manifests';
import { ChainDataSource } from '../datasource';

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
        address: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
        path: params.path,
      },
    };

    return addressResponse;
  }),
}));

describe('trezor.signer', () => {
  let signer: TrezorSigner;
  let derivation: string;
  let provider: DashProvider;
  let txInput: MsgBody;
  let message: ChainMsg;

  beforeEach(() => {
    signer = new TrezorSigner();

    const dataSource = new ChainDataSource(DASH_MANIFEST);

    provider = new DashProvider(dataSource);
    derivation = "m/44'/5'/0'/0/0";

    txInput = {
      to: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
      from: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should verify address', async () => {
    const mainnetAddress = 'XwYJ7vMP9uJ5PuAMVfTsheZg9WEPDKjRan';
    const testnetAddress = 'yeRZBWYfeNE4yVUHV4ZLs83Ppn9aMRH57A';

    expect(signer.verifyAddress(mainnetAddress)).toBeTruthy();
    expect(signer.verifyAddress(testnetAddress)).toBeTruthy();

    expect(signer.verifyAddress(mainnetAddress + 'deaadbeef')).toBeFalsy();
  });

  it('should fail signing if trezor device is not initialized', async () => {
    expect(async () => {
      await signer.sign(message as ChainMsg, derivation);
    }).rejects.toThrow('Trezor connection is not initialized yet!');
  });
  //
  // it('should fail getting addresses if trezor device is not initialized', async () => {
  //   expect(async () => {
  //     await signer.getAddress(derivationPath);
  //   }).rejects.toThrow('Trezor connection is not initialized yet!');
  // });
  //
  // it('should get an address from the trezor device', async () => {
  //   await signer.initTrezor('test@test.com', 'localhost');
  //
  //   expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  // });
  //
  // it('should sign a transaction using a trezor device', async () => {
  //   await signer.sign(message as ChainMsg, derivationPath);
  //
  //   expect(message.signedTransaction).toBeTruthy();
  // });
  //
  // it('should return false when verifing an invalid address', async () => {
  //   expect(signer.verifyAddress('btc123')).toBe(false);
  // });
  //
  // it('should validate an address', async () => {
  //   expect(signer.verifyAddress(txInput.from)).toBe(true);
  // });
  //
  // it('should fail if private key is requested', async () => {
  //   expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  // });
});

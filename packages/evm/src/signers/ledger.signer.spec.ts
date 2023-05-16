import App from '@ledgerhq/hw-app-btc';
import { LedgerSigner } from './ledger.signer';
import { ChainMsg } from '../msg';

declare global {
  interface Navigator {
    platform: string;
    hid: Object;
    userAgent: string;
  }
}

const ADDRESS_MOCK = {
  address: '0xCbA98362e199c41E1864D0923AF9646d3A648451',
  publicKey:
    '04df00ad3869baad7ce54f4d560ba7f268d542df8f2679a5898d78a690c3db8f9833d2973671cb14b088e91bdf7c0ab00029a576473c0e12f84d252e630bb3809b',
};

const SIGN_MOCK = {
  v: '1',
  r: '2',
  s: '3',
};

jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockImplementation(() => ({
    close: jest.fn(),
  })),
}));

jest.mock('@ledgerhq/hw-app-eth');

describe('ledger.signer', () => {
  it('verifyAddress(): should return FALSE if address is invalid', () => {
    const signer = new LedgerSigner();
    expect(signer.verifyAddress('Hello World')).toBeFalsy();
  });

  it('verifyAddress(): should return TRUE if address is valid', () => {
    const signer = new LedgerSigner();
    expect(signer.verifyAddress(ADDRESS_MOCK.address)).toBeTruthy();
  });

  it('getAddress(): should throw an error if derivation path is invalid', async () => {
    // @ts-ignore
    jest.spyOn(App.prototype, 'getAddress').mockRejectedValue('Error');

    const signer = new LedgerSigner();
    await expect(signer.getAddress('0/0/0/0/0')).rejects.toEqual('Error');
  });

  it('getAddress(): should return address', async () => {
    // @ts-ignore
    jest.spyOn(App.prototype, 'getAddress').mockResolvedValue(ADDRESS_MOCK);

    const signer = new LedgerSigner();
    await expect(signer.getAddress("44'/60'/0'/0/0")).resolves.toEqual(
      ADDRESS_MOCK.address
    );
  });

  it('sign(): show throw an error if msg is invalid', async () => {
    // @ts-ignore
    jest.spyOn(App.prototype, 'signTransaction').mockRejectedValue('Error');

    const signer = new LedgerSigner();
    await expect(
      signer.sign("44'/60'/0'/0/0", new ChainMsg({}))
    ).rejects.toEqual('Error');
  });

  it('sign(): show return signature', async () => {
    // @ts-ignore
    jest.spyOn(App.prototype, 'signTransaction').mockResolvedValue(SIGN_MOCK);

    const signer = new LedgerSigner();
    await expect(
      signer.sign("44'/60'/0'/0/0", new ChainMsg({}))
    ).resolves.toEqual({
      v: 1,
      r: '0x2',
      s: '0x3',
    });
  });
});

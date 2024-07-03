import { Msg } from '@xdefi-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';

import { TronProvider } from '../chain.provider';
import { ChainDataSource } from '../datasource';
import { TRON_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import LedgerSigner from './ledger.signer';
jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@ledgerhq/hw-app-trx', () => {
  return jest.fn().mockImplementation(() => ({
    getAddress: jest.fn().mockResolvedValue({
      address: 'TSDmgg8m3AfNniTzz4dyWN44fkGd7otZ4C',
    }),
    signTransaction: jest
      .fn()
      .mockResolvedValue(
        '0xb80601cba137745cfbb0e3507c3c22bb9465dc7d2963a51a6fcfdc5f4341b53d7faab96d26c080151e5877a8945ea9028bc0d529f11dffa79b8162c38d5bab821c'
      ),
    signPersonalMessage: jest
      .fn()
      .mockResolvedValue(
        '0xb80601cba137745cfbb0e3507c3c22bb9465dc7d2963a51a6fcfdc5f4341b53d7faab96d26c080151e5877a8945ea9028bc0d529f11dffa79b8162c38d5bab821c'
      ),
  }));
});

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: TronProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    provider = new TronProvider(new ChainDataSource(TRON_MANIFEST));
    derivationPath = "m/44'/195'/0'/0/0";

    txInput = {
      from: 'TSDmgg8m3AfNniTzz4dyWN44fkGd7otZ4C',
      to: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
      amount: '0.000001',
    };

    message = provider.createMsg(txInput);
  });

  afterEach(() => {
    externalTransport.close();
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  });

  it('should sign a transaction using a ledger device', async () => {
    await signer.sign(message as ChainMsg, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });

  it('should signMessage a transaction using a ledger device', async () => {
    const { raw_data_hex } = await (message as ChainMsg).buildTx();
    const signature = await signer.signMessageV2(raw_data_hex, derivationPath);

    expect(signature).toEqual(
      '0xb80601cba137745cfbb0e3507c3c22bb9465dc7d2963a51a6fcfdc5f4341b53d7faab96d26c080151e5877a8945ea9028bc0d529f11dffa79b8162c38d5bab821c'
    );
  });

  it('should signTransaction a transaction using a ledger device', async () => {
    const { raw_data_hex } = await (message as ChainMsg).buildTx();
    const signature = await signer.signTransaction(
      derivationPath,
      raw_data_hex
    );

    expect(signature).toEqual(
      '0xb80601cba137745cfbb0e3507c3c22bb9465dc7d2963a51a6fcfdc5f4341b53d7faab96d26c080151e5877a8945ea9028bc0d529f11dffa79b8162c38d5bab821c'
    );
  });
});

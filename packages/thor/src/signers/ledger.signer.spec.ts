import { Msg } from '@xdefi-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';

import { ThorProvider } from '../chain.provider';
import { ChainDataSource } from '../datasource';
import { ThorChains, THORCHAIN_MANIFESTS } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import LedgerSigner from './ledger.signer';

jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@thorchain/ledger-thorchain', () => {
  return jest.fn().mockImplementation(() => ({
    sign: jest.fn().mockResolvedValue({
      signature: Buffer.from(
        '9a0ec4778a533891fae6ef51386f9598d8f01cb6bdbfc7c3ff914f8f63a6d0dafcb766221cdaeb4c07776f94a1fb1ba61c8f542e35ac00d50e1be6546eef5b03',
        'hex'
      ),
    }),
    getAddressAndPubKey: jest.fn().mockResolvedValue({
      bech32Address: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
    }),
    showAddress: jest.fn().mockResolvedValue({}),
  }));
});

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: ThorProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    provider = new ThorProvider(
      new ChainDataSource(THORCHAIN_MANIFESTS[ThorChains.thorchain])
    );
    derivationPath = "m/44'/931'/0'/0/0";

    txInput = {
      from: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
      to: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
      amount: 0.000001,
      decimals: 18,
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
});

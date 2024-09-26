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
        '304402206ec941e3236bc139e9ebe53de9ee89fb11721b607f3cb271ddca1aaeead6156e022026c4db5b736d7e7e2d9b1eb9fd6fbbfb0ccb667d8a4c8b1bd06beb0bca3a980c',
        'hex'
      ),
    }),
    getAddressAndPubKey: jest.fn().mockResolvedValue({
      bech32Address: 'thor13yqxqdly5q424yyx25f7thkujeush3nzckyhrk',
    }),
    getPublicKey: jest.fn().mockResolvedValue({
      compressedPk: Buffer.from(
        '033310b6a370e7460656499d994879682c07fd375be22cc1749cf06eba6c3f1919',
        'hex'
      ),
    }),
    showAddress: jest.fn().mockResolvedValue({}),
  }));
});

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: ThorProvider;
  let txInput: MsgBody;
  let message: ChainMsg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    provider = new ThorProvider(
      new ChainDataSource(THORCHAIN_MANIFESTS[ThorChains.thorchain])
    );
    derivationPath = "m/44'/931'/0'/0/0";

    txInput = {
      from: 'thor13yqxqdly5q424yyx25f7thkujeush3nzckyhrk',
      to: 'thor13yqxqdly5q424yyx25f7thkujeush3nzckyhrk',
      amount: 0.01,
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
    await signer.sign(message, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});

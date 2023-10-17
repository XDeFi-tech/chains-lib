import { Msg } from '@xdefi-tech/chains-core';

import { CosmosProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { COSMOS_MANIFESTS } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import LedgerSigner from './ledger.signer';
jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@cosmjs/stargate/build/signingstargateclient', () => {
  return {
    SigningStargateClient: {
      createWithSigner: jest.fn().mockResolvedValue({
        sign: jest.fn().mockResolvedValue({}),
      }),
    },
  };
});

jest.mock('@cosmjs/ledger-amino/build/ledgersigner', () => {
  return {
    LedgerSigner: jest.fn().mockImplementation(() => ({
      getAccounts: jest.fn().mockResolvedValue([
        {
          address: 'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4',
        },
      ]),
      sign: jest.fn().mockResolvedValue({
        bodyBytes: [],
        authInfoBytes: [],
        signatures: [],
      }),
    })),
  };
});

jest.mock('cosmjs-types/cosmos/tx/v1beta1/tx', () => {
  return {
    TxRaw: {
      encode: jest.fn().mockImplementation(() => {
        return { finish: jest.fn().mockReturnValue([1, 1, 1]) };
      }),
    },
  };
});

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: CosmosProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    signer = new LedgerSigner();

    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.cosmos)
    );
    derivationPath = "m/44'/118'/0'/0/0";

    txInput = {
      from: 'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4',
      to: 'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4',
      amount: '0.000001',
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress(derivationPath, 'cosmos')).toBe(
      txInput.from
    );
  });

  it('should sign a transaction using a ledger device', async () => {
    await signer.sign(message as ChainMsg, derivationPath, 'cosmos');

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF', 'cosmos')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from, 'cosmos')).toBe(true);
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});

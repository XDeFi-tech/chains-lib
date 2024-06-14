import { Msg } from '@xdefi-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';
import { bech32 } from 'bech32';
import { Hash, PrivKeySecp256k1 } from '@keplr-wallet/crypto';
import { makeADR36AminoSignDoc, serializeSignDoc } from '@keplr-wallet/cosmos';

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
      connectWithSigner: jest.fn().mockResolvedValue({
        sign: jest.fn().mockResolvedValue({}),
      }),
    },
    defaultRegistryTypes: [],
    createDefaultAminoConverters: jest.fn().mockResolvedValue([]),
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

describe('cosmos::ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: CosmosProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

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

  afterEach(() => {
    externalTransport.close();
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

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });

  it('should return status of verify message', async () => {
    // Define test data
    const privKey = PrivKeySecp256k1.generateRandomKey();
    const pubKey = privKey.getPubKey();

    const sign = bech32.encode('cosmos', bech32.toWords(pubKey.toBytes()));

    const signDoc = makeADR36AminoSignDoc(sign, 'test');
    const msg = serializeSignDoc(signDoc);
    const signature = privKey.signDigest32(Hash.sha256(msg));

    const result = await signer.verifyMessage(
      sign,
      'test',
      pubKey.toBytes(),
      new Uint8Array([...signature.r, ...signature.s])
    );
    expect(result);
  });

  it('should return false when unmatched/invalid signer', async () => {
    // Define test data
    const privKey = PrivKeySecp256k1.generateRandomKey();
    const pubKey = privKey.getPubKey();

    const sign = 'osmo1ymk637a7wljvt4w7q9lnrw95mg9sr37yatxd9h'; // unmatched signer

    const signDoc = makeADR36AminoSignDoc(sign, 'test');
    const msg = serializeSignDoc(signDoc);
    const signature = privKey.signDigest32(Hash.sha256(msg));

    const result = await signer.verifyMessage(
      sign,
      'test',
      pubKey.toBytes(),
      new Uint8Array([...signature.r, ...signature.s])
    );
    expect(result).toBe(false);
  });
});

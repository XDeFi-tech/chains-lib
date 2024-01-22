import { Msg } from '@xdefi-tech/chains-core';

import { CosmosProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { COSMOS_MANIFESTS } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import { PrivateKeySigner } from './private-key.signer';

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

jest.mock('cosmjs-types/cosmos/tx/v1beta1/tx', () => {
  return {
    TxRaw: {
      encode: jest.fn().mockImplementation(() => {
        return { finish: jest.fn().mockReturnValue([1, 1, 1]) };
      }),
    },
  };
});

describe('private-key.signer', () => {
  let pk: string;
  let signer: PrivateKeySigner;
  let provider: CosmosProvider;
  let txInput: MsgBody;
  let message: Msg;
  let derivation: string;

  beforeEach(() => {
    pk = 'e3246f2377f01629ccb565a5ae3a23cdb4f6a89268da133b6fe0e647a84f6e1a';
    signer = new PrivateKeySigner(pk);

    derivation = "m/44'/118'/0'/0/0";

    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.cosmos)
    );

    txInput = {
      from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
      to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
      amount: '0.000001',
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a private key', async () => {
    expect(await signer.getAddress(derivation, 'cosmos')).toBe(txInput.from);
  });

  it('should sign a transaction using a private key', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF', 'cosmos')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from, 'cosmos')).toBe(true);
  });
});

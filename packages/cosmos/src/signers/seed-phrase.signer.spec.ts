import { Msg } from '@xdefi-tech/chains-core';

import { CosmosProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { COSMOS_MANIFESTS } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import SeedPhraseSigner from './seed-phrase.signer';

jest.mock('@cosmjs/stargate/build/signingstargateclient', () => {
  return {
    SigningStargateClient: {
      createWithSigner: jest.fn().mockResolvedValue({
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

type CosmosHdPathTypes = {
  cosmos: string;
  terra: string;
  ethermint: string;
};

describe('seed-phrase.signer', () => {
  let mnemonic: string;
  let signer: SeedPhraseSigner;
  let provider: CosmosProvider;
  let txInput: MsgBody;
  let message: Msg;
  let derivations: CosmosHdPathTypes;

  beforeEach(() => {
    jest.setTimeout(15 * 1000);
    mnemonic =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    signer = new SeedPhraseSigner(mnemonic);

    derivations = {
      cosmos: "m/44'/118'/0'/0/0",
      terra: "m/44'/330'/0'/0/0",
      ethermint: "m/44'/60'/0'/0/0",
    };

    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.cosmos)
    );

    txInput = {
      from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
      to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
      amount: '0.000001',
      msgs: [],
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a seed phrase', async () => {
    expect(await signer.getAddress(derivations.cosmos, 'cosmos')).toBe(
      txInput.from
    );
  });

  it('should get an ethermint address from a seed phrase', async () => {
    expect(await signer.getAddress(derivations.ethermint)).toBe(
      '0xcD558EBF5E7D94CB08BD34FFf7674aC95E3EBd9d'
    );
  });

  it('should get a terra address from a seed phrase', async () => {
    expect(await signer.getAddress(derivations.terra)).toBe(
      'terra1elsr769k4kcgap5kgy9fcetzrwdw05qr85gqra'
    );
  });

  it('should sign a transaction using a seed phrase', async () => {
    await signer.sign(message as ChainMsg, derivations.cosmos);

    expect(message.signedTransaction).toBeTruthy();
  });

  // it('should sign a terra transaction using a seed phrase', async () => {
  //   const terraProvider = new CosmosProvider(
  //     new IndexerDataSource(COSMOS_MANIFESTS.terra)
  //   );

  //   const terraMessage = terraProvider.createMsg(txInput);

  //   await signer.sign(
  //     terraMessage as ChainMsg,
  //     derivations.terra,
  //     CosmosChainType.Terra
  //   );

  //   expect(message.signedTransaction).toBeTruthy();
  // });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF', 'cosmos')).toBe(false);
  });

  it('should return false when verifing an invalid address with no prefix specified', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from, 'cosmos')).toBe(true);
    expect(signer.verifyAddress(txInput.from)).toBe(true);
    expect(
      signer.verifyAddress('0xcD558EBF5E7D94CB08BD34FFf7674aC95E3EBd9d')
    ).toBe(true);
    expect(
      signer.verifyAddress('terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8')
    ).toBe(true);
  });
});

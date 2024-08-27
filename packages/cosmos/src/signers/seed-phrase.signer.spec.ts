import { Hash, PrivKeySecp256k1 } from '@keplr-wallet/crypto';
import { bech32 } from 'bech32';
import { makeADR36AminoSignDoc, serializeSignDoc } from '@keplr-wallet/cosmos';
import { SignDocDirectAux, TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { Secp256k1, Secp256k1Signature, sha256 } from '@cosmjs/crypto';
import { makeMultisignedTxBytes } from '@cosmjs/stargate';

import { CosmosProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { COSMOS_MANIFESTS, CosmosHubChains } from '../manifests';
import { ChainMsg, CosmosChainType, CosmosSignMode, MsgBody } from '../msg';

import SeedPhraseSigner from './seed-phrase.signer';

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
// jest.mock('cosmjs-types/cosmos/tx/v1beta1/tx', () => {
//   const originalModule = jest.requireActual(
//     'cosmjs-types/cosmos/tx/v1beta1/tx'
//   );
//   return {
//     TxRaw: {
//       encode: jest.fn().mockImplementation(() => {
//         return { finish: jest.fn().mockReturnValue([1, 1, 1]) };
//       }),
//     },
//     ...originalModule
//   };
// });

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
  let message: ChainMsg;
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
      gasLimit: '200000',
      gasPrice: COSMOS_MANIFESTS.cosmos.feeGasStep.medium,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a seed phrase', async () => {
    expect(await signer.getAddress(derivations.cosmos, 'cosmos')).toBe(
      txInput.from
    );
  });

  it('should get an ethermint address with prefix from a seed phrase', async () => {
    expect(await signer.getAddress(derivations.ethermint, 'evmos')).toBe(
      'evmos14gya7fnnuxhrlnywmp6uzvd4y3yul9vpp7tu6m'
    );
  });

  it('should get an ethermint evm-like address from a seed phrase', async () => {
    expect(await signer.getEthermintAddress(derivations.ethermint)).toBe(
      '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581'
    );
  });

  it('should get null from getEthermintAddress for non ethermint derivations path', async () => {
    expect(await signer.getEthermintAddress(derivations.cosmos)).toBe(null);
  });

  it('should get a terra address from a seed phrase', async () => {
    expect(await signer.getAddress(derivations.terra)).toBe(
      'terra1elsr769k4kcgap5kgy9fcetzrwdw05qr85gqra'
    );
  });

  it('should sign a transaction using a seed phrase', async () => {
    const originalEncode = TxRaw.encode;
    TxRaw.encode = jest.fn().mockImplementation(() => {
      return { finish: jest.fn().mockReturnValue(Uint8Array.from([1, 1, 1])) };
    });

    await signer.sign(message, derivations.cosmos);
    expect(message.signedTransaction).toBeTruthy();

    TxRaw.encode = originalEncode;
  });

  it('Should sign raw tx with amino mode', async () => {
    const signDoc = {
      chain_id: 'cosmoshub-4',
      account_number: '1895821',
      sequence: '0',
      fee: {
        amount: [{ denom: 'uatom', amount: '1000' }],
        gas: '200000',
      },
      msgs: [
        {
          type: 'cosmos-sdk/MsgSend',
          value: {
            from_address: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
            to_address: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
            amount: [{ denom: 'uatom', amount: '1000000' }],
          },
        },
      ],
      memo: '',
    };

    const signer = new SeedPhraseSigner(mnemonic);
    const signedTx = await signer.signRawTransaction(
      signDoc,
      provider.manifest.prefix,
      CosmosSignMode.SIGN_AMINO
    );
    expect(signedTx.signature.pub_key.value).toEqual(
      'A92jmyLB+OLC0R2jvEUX+AtGGqafEOdh40V29PCcz6Hu'
    );
    expect(signedTx.signature.signature).toEqual(
      'y77g4nQrMCxTH8ICyffz0w2sjXUjisSANkbwy1i+AsBjoZNTIhqJs9l03p2pG/MVavW8ZTx0IQ26ItLRLCrAkQ=='
    );
  });

  it('Should sign raw tx with direct mode', async () => {
    const signDoc = {
      chainId: 'cosmoshub-4',
      accountNumber: '1895821',
      bodyBytes: new Uint8Array(
        Buffer.from(
          '0a320a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412121a100a057561746f6d120731303030303030',
          'hex'
        )
      ),
      authInfoBytes: new Uint8Array(
        Buffer.from(
          '0a4e0a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a2103dda39b22c1f8e2c2d11da3bc4517f80b461aa69f10e761e34576f4f09ccfa1ee12040a02087f12130a0d0a057561746f6d12043130303010c09a0c',
          'hex'
        )
      ),
    };
    const signer = new SeedPhraseSigner(mnemonic);
    const signedTx = await signer.signRawTransaction(
      signDoc,
      provider.manifest.prefix,
      CosmosSignMode.SIGN_DIRECT
    );
    expect(signedTx.signature.pub_key.value).toEqual(
      'A92jmyLB+OLC0R2jvEUX+AtGGqafEOdh40V29PCcz6Hu'
    );
    expect(signedTx.signature.signature).toEqual(
      'i3STDg7CxEgl4svgXmhyKePzBoPtqdL3WHrkeHqI/HAMp18EUE+mh9LzTfoFYGlk7O+E+jhXtECISzUakZJ83Q=='
    );
  });

  it('sign arbitrary message', async () => {
    const signDoc = {
      chain_id: 'cosmoshub-4',
      account_number: '1895821',
      sequence: '0',
      fee: {
        amount: [{ denom: 'uatom', amount: '1000' }],
        gas: '200000',
      },
      msgs: [
        {
          type: 'sign/MsgSignData',
          value: {
            signer: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
            data: 'SGVsbG8=', // echo -n "Hello" | base64
          },
        },
      ],
      memo: '',
    };

    const signer = new SeedPhraseSigner(mnemonic);
    const signedTx = await signer.signRawTransaction(
      signDoc,
      provider.manifest.prefix,
      CosmosSignMode.SIGN_AMINO
    );
    expect(signedTx.signature.pub_key.value).toEqual(
      'A92jmyLB+OLC0R2jvEUX+AtGGqafEOdh40V29PCcz6Hu'
    );
    expect(signedTx.signature.pub_key.type).toEqual(
      'tendermint/PubKeySecp256k1'
    );
    expect(signedTx.signature.signature).toEqual(
      '4oHTVOF4EtiizvPajDe2+l/iOE6goG7zuySs1qNeZ+wSHUl74oFioE/pSta/7Z0n7rL6z9zL3s14yfYldkne+Q=='
    );
    const serialized = serializeSignDoc(signDoc);
    const signatureBytes = Buffer.from(signedTx.signature.signature, 'base64');
    const isVerified = await Secp256k1.verifySignature(
      Secp256k1Signature.fromFixedLength(signatureBytes),
      sha256(serialized),
      Buffer.from(signedTx.signature.pub_key.value, 'base64')
    );
    expect(isVerified).toBe(true);
  });

  it('Should sign doc direct aux with sign amino mode', async () => {
    const signDoc = SignDocDirectAux.fromPartial({
      chainId: 'cosmoshub-4',
      accountNumber: 1895821n,
      bodyBytes: new Uint8Array(
        Buffer.from(
          '0a320a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412121a100a057561746f6d120731303030303030',
          'hex'
        )
      ),
      publicKey: {
        value: Buffer.from(
          'A92jmyLB+OLC0R2jvEUX+AtGGqafEOdh40V29PCcz6Hu==',
          'base64'
        ),
        typeUrl: '/cosmos.crypto.secp256k1.PubKey',
      },
    });
    const signedTx = await signer.signRawTransaction(
      signDoc,
      provider.manifest.prefix,
      CosmosSignMode.SIGN_DIRECT
    );
    expect(signedTx.signature.pub_key.value).toEqual(
      'A92jmyLB+OLC0R2jvEUX+AtGGqafEOdh40V29PCcz6Hu'
    );
    expect(signedTx.signature.signature).toEqual(
      'pyBuAh++d0s6JqaYpIpRBwIU8lwOxT8kV3s8Df5UM4UZepaCF1PaawGf55azY5PHJXSgBfyUx1MjYFHnHgAahQ=='
    );
    const signatures = new Map<string, Uint8Array>();
    signatures.set(
      await signer.getAddress(derivations.cosmos),
      new Uint8Array(Buffer.from(signedTx.signature.signature))
    );
    const multisigTxBytes = makeMultisignedTxBytes(
      {
        type: 'tendermint/PubKeyMultisigThreshold',
        value: {
          threshold: '1',
          pubkeys: [signedTx.signature.pub_key],
        },
      },
      0,
      {
        amount: [{ denom: 'uatom', amount: '1000' }],
        gas: '200000',
      },
      new Uint8Array(
        Buffer.from(
          '0a320a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412121a100a057561746f6d120731303030303030',
          'hex'
        )
      ),
      signatures
    );
    expect(Buffer.from(multisigTxBytes).toString('hex')).toEqual(
      '0a340a320a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412121a100a057561746f6d12073130303030303012a2010a8a010a770a292f636f736d6f732e63727970746f2e6d756c74697369672e4c6567616379416d696e6f5075624b6579124a080112460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a2103dda39b22c1f8e2c2d11da3bc4517f80b461aa69f10e761e34576f4f09ccfa1ee120f120d0a05080112018012040a02087f12130a0d0a057561746f6d12043130303010c09a0c1a5a0a587079427541682b2b643073364a7161597049705242774955386c774f7854386b56337338446635554d34555a6570614346315061617747663535617a593550484a5853674266795578314d6a5946486e4867416168513d3d'
    );
  });
});

describe('seed-phase.addressGeneration', () => {
  let derivations: {
    cosmos: (index: number) => string;
    terra: (index: number) => string;
    ethermint: (index: number) => string;
    secret: (index: number) => string;
  };
  let seedPhrases: string[];
  let signers: SeedPhraseSigner[];
  let firstAddresses: {
    cosmos: string;
    terra: string;
    ethermint: string;
    evmos: string;
    zetachain: string;
    secret: string;
    akash: string;
    dymension: string;
  }[];
  let secondAddresses: {
    cosmos: string;
    terra: string;
    ethermint: string;
  }[];

  beforeEach(() => {
    seedPhrases = [
      'access before split cram spoon snap secret month sphere fog embark donor',
      'identify issue disorder vote family fury oval stock when maple debris surprise',
      'happy inquiry mail thank riot release horn napkin nasty rail inner repair',
    ];

    derivations = {
      cosmos: (index) => `m/44'/118'/0'/0/${index}`,
      terra: (index) => `m/44'/330'/0'/${index}/0`,
      ethermint: (index) => `m/44'/60'/0'/0/${index}`,
      secret: (index) => `m/44'/529'/0'/0/${index}`,
    };
    signers = [];
    for (const seedPhrase of seedPhrases) {
      signers.push(new SeedPhraseSigner(seedPhrase));
    }

    firstAddresses = [
      {
        cosmos: 'cosmos1ryvnmdm2cxn7um2p489el7uhjvc4vjl562v09n',
        terra: 'terra1sswsyj4wn2z4t8y8qfvj9e2x0etdfqm2xrxf2n',
        ethermint: '0x230e9c3deE180bf702cd40852feF85eb5fa5635B',
        evmos: 'evmos1yv8fc00wrq9lwqkdgzzjlmu9ad062c6msl8uyr',
        zetachain: 'zeta1yv8fc00wrq9lwqkdgzzjlmu9ad062c6my6c8ym',
        secret: 'secret1wau4wsmzxgd4fzkajq2pelv798rsm34y9p5l8k',
        akash: 'akash1ryvnmdm2cxn7um2p489el7uhjvc4vjl5h3pguf',
        dymension: 'dym1yv8fc00wrq9lwqkdgzzjlmu9ad062c6mqr65m9',
      },
      {
        cosmos: 'cosmos1f68fxcgv5hyfhv7vr6mu50mldphemd4vr9ud3w',
        terra: 'terra1f9hrf3ge5r7nvxyvpc6ryl9md30wcuwx8jcaur',
        ethermint: '0x501Be002298Fcb3Fa20b3Aaf8615b1745AffE0D0',
        evmos: 'evmos12qd7qq3f3l9nlgst82hcv9d3w3d0lcxs6k4fvs',
        zetachain: 'zeta12qd7qq3f3l9nlgst82hcv9d3w3d0lcxswn2jvg',
        secret: 'secret1d07u0vmlhsm7mr3q6pth78ge4auenxj83pu44s',
        akash: 'akash1f68fxcgv5hyfhv7vr6mu50mldphemd4vw732g5',
        dymension: 'dym12qd7qq3f3l9nlgst82hcv9d3w3d0lcxs22gpnk',
      },
      {
        cosmos: 'cosmos1yh3lcs6634sw6utz3t8fnykp3vqmlegp6kzkya',
        terra: 'terra1csmnpajt68necwnehmtuyffwrzsmmwkm79gxgy',
        ethermint: '0x0EFBD3F51620AFB9BB9f47cc79523f76DF18C0AE',
        evmos: 'evmos1pmaa8agkyzhmnwulglx8j53lwm033s9wvzcypf',
        zetachain: 'zeta1pmaa8agkyzhmnwulglx8j53lwm033s9wc88lp3',
        secret: 'secret1mzuh3vngns0fz2547zrrpzehsuk8d92djz5xzs',
        akash: 'akash1yh3lcs6634sw6utz3t8fnykp3vqmlegphd03a8',
        dymension: 'dym1pmaa8agkyzhmnwulglx8j53lwm033s9wu79v70',
      },
    ];
    secondAddresses = [
      {
        cosmos: 'cosmos1ex5jkphkzdgvm08qqlfd4rfcp78gqsg57lpfms',
        terra: 'terra1g9n44s3jp8hazt3mcyx8jy7cx5qdrd56uzg7wv',
        ethermint: '0x2370aDcbE0d9FBD581a0F881f2278d2EB626E8A8',
      },
      {
        cosmos: 'cosmos1x52a47k685xtjzv20vs8ukglh24exsm3hrszxw',
        terra: 'terra1crepeq9j9y05qrxrqnrj2462u7leya892u0r7k',
        ethermint: '0x95D781AA5A28599633dF91D7B6257BD61fb38D63',
      },
      {
        cosmos: 'cosmos1xtgkfd50znkhphca7j7eue9skxky9x8f07sk4y',
        terra: 'terra1j4fv4yfupaqpw2uevdwwwlufyxjv5fh9dhphqa',
        ethermint: '0x5Ac498aa00E48d2f04dD9C240BC53027D49702Ea',
      },
    ];
  });

  it('should get an cosmos address from the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const firstAddress = firstAddresses[i];
      expect(await signer.getAddress(derivations.cosmos(0))).toBe(
        firstAddress.cosmos
      );
    }
  });

  it('should get the second cosmos address form the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const secondAddress = secondAddresses[i];
      expect(await signer.getAddress(derivations.cosmos(1))).toBe(
        secondAddress.cosmos
      );
    }
  });

  it('should get an terra address from the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const firstAddress = firstAddresses[i];
      expect(await signer.getAddress(derivations.terra(0))).toBe(
        firstAddress.terra
      );
    }
  });

  it('should get the second terra address form the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const secondAddress = secondAddresses[i];
      expect(await signer.getAddress(derivations.terra(1))).toBe(
        secondAddress.terra
      );
    }
  });

  it('should get a first ethermint evm-like address from the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const firstAddress = firstAddresses[i];
      expect(await signer.getEthermintAddress(derivations.ethermint(0))).toBe(
        firstAddress.ethermint
      );
    }
  });

  it('should get the second ethermint evm-like address from the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const secondAddress = secondAddresses[i];
      expect(await signer.getEthermintAddress(derivations.ethermint(1))).toBe(
        secondAddress.ethermint
      );
    }
  });

  it('should get the evoms address from the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const firstAddress = firstAddresses[i];
      expect(await signer.getAddress(derivations.ethermint(0), 'evmos')).toBe(
        firstAddress.evmos
      );
    }
  });

  it('should get a zetachain address from the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const firstAddress = firstAddresses[i];
      expect(await signer.getAddress(derivations.ethermint(0), 'zeta')).toBe(
        firstAddress.zetachain
      );
    }
  });

  it('should get a secret address from the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const firstAddress = firstAddresses[i];
      expect(await signer.getAddress(derivations.secret(0), 'secret')).toBe(
        firstAddress.secret
      );
    }
  });

  it('should get an akash from the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const firstAddress = firstAddresses[i];
      expect(await signer.getAddress(derivations.cosmos(0), 'akash')).toBe(
        firstAddress.akash
      );
    }
  });

  it('should get an dymension from the seed phrase', async () => {
    for (let i = 0; i < signers.length; i++) {
      const signer = signers[i];
      const firstAddress = firstAddresses[i];
      expect(await signer.getAddress(derivations.ethermint(0), 'dym')).toBe(
        firstAddress.dymension
      );
    }
  });

  it('should return status of verify message', async () => {
    // Define test data
    const privKey = PrivKeySecp256k1.generateRandomKey();
    const pubKey = privKey.getPubKey();

    const signer = bech32.encode('cosmos', bech32.toWords(pubKey.toBytes()));

    const signDoc = makeADR36AminoSignDoc(signer, 'test');
    const msg = serializeSignDoc(signDoc);
    const signature = privKey.signDigest32(Hash.sha256(msg));

    for (let i = 0; i < signers.length; i++) {
      const signerSeed = signers[i];
      expect(
        await signerSeed.verifyMessage(
          signer,
          'test',
          pubKey.toBytes(),
          new Uint8Array([...signature.r, ...signature.s])
        )
      );
    }
  });

  it('should return false when unmatched/invalid signer', async () => {
    // Define test data
    const privKey = PrivKeySecp256k1.generateRandomKey();
    const pubKey = privKey.getPubKey();

    const signer = 'osmo1ymk637a7wljvt4w7q9lnrw95mg9sr37yatxd9h'; // unmatched signer

    const signDoc = makeADR36AminoSignDoc(signer, 'test');
    const msg = serializeSignDoc(signDoc);
    const signature = privKey.signDigest32(Hash.sha256(msg));

    for (let i = 0; i < signers.length; i++) {
      const signerSeed = signers[i];
      expect(
        await signerSeed.verifyMessage(
          signer,
          'test',
          pubKey.toBytes(),
          new Uint8Array([...signature.r, ...signature.s])
        )
      ).toBe(false);
    }
  });
});

describe('abstrction fee', () => {
  let mnemonic: string;
  let signer: SeedPhraseSigner;
  let provider: CosmosProvider;
  let derivation: string;

  beforeEach(() => {
    jest.setTimeout(15 * 1000);
    mnemonic =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    signer = new SeedPhraseSigner(mnemonic);

    derivation = "m/44'/118'/0'/0/0";

    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.osmosis)
    );
  });

  jest.setTimeout(15000);

  it('should sign a transaction using a seed phrase', async () => {
    const originalEncode = TxRaw.encode;
    TxRaw.encode = jest.fn().mockImplementation(() => {
      return { finish: jest.fn().mockReturnValue(Uint8Array.from([1, 1, 1])) };
    });
    const ibcToken =
      'ibc/B547DC9B897E7C3AA5B824696110B8E3D2C31E3ED3F02FF363DCBAD82457E07E'; // uxki;
    const txInput = {
      from: 'osmosis1g6qu6hm4v3s3vq7438jehn9fzxg9p720hzad6a',
      to: 'osmosis1g6qu6hm4v3s3vq7438jehn9fzxg9p720hzad6a',
      amount: '0.000001',
      msgs: [],
      feeOptions: {
        gasAdjustment: 2,
        gasFee: {
          denom: ibcToken,
        },
      },
    };
    const message = provider.createMsg(txInput);
    const { fee } = await message.getFee();
    const gasInfo = {
      gasLimit: 200000,
      gasPrice: '0.025',
    };
    const abstractionFee = await provider.calculateFeeAbs(gasInfo, ibcToken);
    const newInputTx = { ...txInput, ...abstractionFee };
    const newMessage = provider.createMsg(newInputTx);
    const buildTxData = await newMessage.buildTx();
    await signer.sign(message, derivation);
    expect(message.signedTransaction).toBeTruthy();
    expect((buildTxData as any).fee.amount[0].amount).toEqual(fee);
    TxRaw.encode = originalEncode;
  });
});

describe('IBC token transfer', () => {
  let mnemonic: string;
  let signer: SeedPhraseSigner;
  let sourceChain: CosmosHubChains;
  let sourceAssetDenom: string;
  let destChain: CosmosHubChains;
  let derivations: string;
  let provider: CosmosProvider;
  let addresses: Record<CosmosHubChains, string>;

  beforeEach(async () => {
    jest.setTimeout(60 * 1000);
    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.osmosis)
    );
    mnemonic =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    signer = new SeedPhraseSigner(mnemonic);

    derivations = "m/44'/118'/0'/0/0";
    const addressEntries: [CosmosHubChains, string][] = await Promise.all(
      Object.values(CosmosHubChains).map(async (chain) => {
        return [
          chain,
          await signer.getAddress(
            derivations,
            COSMOS_MANIFESTS[chain as CosmosHubChains].prefix
          ),
        ];
      })
    );
    addresses = Object.fromEntries(addressEntries) as Record<
      CosmosHubChains,
      string
    >;
  });

  it('Create success tx to transfer uatom from osmosis to akash', async () => {
    const originalEncode = TxRaw.encode;
    TxRaw.encode = jest.fn().mockImplementation(() => {
      return { finish: jest.fn().mockReturnValue(Uint8Array.from([1, 1, 1])) };
    });
    sourceChain = CosmosHubChains.osmosis;
    destChain = CosmosHubChains.akash;
    sourceAssetDenom =
      'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2'; // uatom on osmosis
    const msgBodies = await provider.createIBCTransferMsg({
      amountIn: '0.1',
      sourceAssetDenom,
      sourceAssetChain: sourceChain,
      destAssetChain: destChain,
      addresses,
    });
    expect(msgBodies[0].msgs).toBeDefined();
    const ibcTrasferMsg = msgBodies[0].msgs?.[0];
    expect(ibcTrasferMsg.typeUrl).toBe(
      '/ibc.applications.transfer.v1.MsgTransfer'
    );
    expect(ibcTrasferMsg.value.sender).toBe(addresses['osmosis']);
    expect(ibcTrasferMsg.value.token.denom).toBe(sourceAssetDenom);
    expect(ibcTrasferMsg.value.token.amount).toBe('100000'); // 0.1 * 1e6
    expect(ibcTrasferMsg.value.receiver).toBe(addresses['cosmos']);
    expect(ibcTrasferMsg.value.memo).toContain(addresses['akash']);

    const chainMsg = await provider.createMsg(msgBodies[0]);
    await signer.sign(chainMsg, derivations);
    expect(chainMsg.signedTransaction).toBeTruthy();
    TxRaw.encode = originalEncode;
  });

  it('Create success tx to transfer with path unwinding', async () => {
    sourceChain = CosmosHubChains.osmosis;
    destChain = CosmosHubChains.cosmos;
    sourceAssetDenom =
      'ibc/1DBD74F7D8022AFE3D79A2502C0FCFFF6EDC74F7342117A676B623830B859994'; // uatom/transfer/channel-208/transfer/channel-2
    const msgBodies = await provider.createIBCTransferMsg({
      amountIn: '0.1',
      sourceAssetDenom,
      sourceAssetChain: sourceChain,
      destAssetChain: destChain,
      addresses,
    });
    expect(msgBodies[0].msgs).toBeDefined();
    const firstIbcTrasferMsg = msgBodies[0].msgs?.[0];
    expect(firstIbcTrasferMsg.typeUrl).toBe(
      '/ibc.applications.transfer.v1.MsgTransfer'
    );
    expect(firstIbcTrasferMsg.value.sender).toBe(addresses['osmosis']);
    expect(firstIbcTrasferMsg.value.token.denom).toBe(sourceAssetDenom);
    expect(firstIbcTrasferMsg.value.token.amount).toBe('100000'); // 0.1 * 1e6
    expect(firstIbcTrasferMsg.value.receiver).toBe(addresses['axelar']);

    const secondIbcTrasferMsg = msgBodies[1].msgs?.[0];
    expect(secondIbcTrasferMsg.typeUrl).toBe(
      '/ibc.applications.transfer.v1.MsgTransfer'
    );
    expect(secondIbcTrasferMsg.value.sender).toBe(addresses['axelar']);
    expect(secondIbcTrasferMsg.value.token.amount).toBe('100000'); // 0.1 * 1e6
    expect(secondIbcTrasferMsg.value.receiver).toBe(addresses['cosmos']);
  });
});

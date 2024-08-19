import { MsgEncoding } from '@xdefi-tech/chains-core';
import { Hash, PrivKeySecp256k1 } from '@keplr-wallet/crypto';
import { bech32 } from 'bech32';
import { makeADR36AminoSignDoc, serializeSignDoc } from '@keplr-wallet/cosmos';
import { SignDocDirectAux } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { makeMultisignedTxBytes } from '@cosmjs/stargate';

import { CosmosProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { COSMOS_MANIFESTS } from '../manifests';
import { ChainMsg, CosmosChainType, CosmosSignMode, MsgBody } from '../msg';

import { PrivateKeySigner } from './private-key.signer';
import { Secp256k1, Secp256k1Signature, sha256 } from '@cosmjs/crypto';

type CosmosHdPathTypes = {
  cosmos: string;
  terra: string;
  ethermint: string;
};

describe('private-key.signer', () => {
  let privateKeys: { [key: string]: string };
  let cosmosSigner: PrivateKeySigner;
  let ethermintSigner: PrivateKeySigner;
  let terraSigner: PrivateKeySigner;
  let provider: CosmosProvider;
  let txInput: MsgBody;
  let message: ChainMsg;
  let derivations: CosmosHdPathTypes;
  let backendSwapTransaction: any;

  beforeEach(() => {
    privateKeys = {
      cosmos:
        'e3246f2377f01629ccb565a5ae3a23cdb4f6a89268da133b6fe0e647a84f6e1a',
      ethermint:
        'd2a6956c6db5563b9755303795cc7e15be20e04c08b1fc8644f197e13190cbad',
      terra: '2d9fd89b2256ee92e7c9a325422b192ad24e07cc54fbe0f908e2e0d57d6ab760',
    };
    cosmosSigner = new PrivateKeySigner(privateKeys.cosmos);
    ethermintSigner = new PrivateKeySigner(privateKeys.ethermint);
    terraSigner = new PrivateKeySigner(privateKeys.terra);

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
      gasLimit: 200000,
      gasPrice: COSMOS_MANIFESTS.cosmos.feeGasStep.medium,
    };
    // unsigned msg from backend
    backendSwapTransaction = {
      unsignedStdTx:
        '{"chainId": "cosmoshub-4", "signer": "cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q", "signDoc": {"chain_id": "cosmoshub-4", "account_number": "1895821", "sequence": "0", "fee": {"amount": [{"denom": "utaom", "amount": 8000}], "gas": 200000}, "msgs": [{"typeUrl": "/ibc.applications.transfer.v1.MsgTransfer", "value": {"sourcePort": "transfer", "sourceChannel": "channel-141", "token": {"denom": "uatom", "amount": "99700"}, "sender": "cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q", "receiver": "osmo15jw7xccxaxk30lf4xgag8f7aeg53pgkh74e39rv00xfnymldjaas2fk627", "timeoutTimestamp": {"low": 273417984, "high": 397196105, "unsigned": false}, "memo": "{\\"wasm\\":{\\"contract\\":\\"osmo15jw7xccxaxk30lf4xgag8f7aeg53pgkh74e39rv00xfnymldjaas2fk627\\",\\"msg\\":{\\"swap_with_action\\":{\\"swap_msg\\":{\\"token_out_min_amount\\":\\"610064\\",\\"path\\":[{\\"pool_id\\":\\"1\\",\\"token_out_denom\\":\\"uosmo\\"}]},\\"after_swap_action\\":{\\"bank_send\\":{\\"receiver\\":\\"osmo1g6qu6hm4v3s3vq7438jehn9fzxg9p720vzrsuj\\"}},\\"local_fallback_address\\":\\"osmo1g6qu6hm4v3s3vq7438jehn9fzxg9p720vzrsuj\\"}}}}"}}, {"typeUrl": "/cosmos.bank.v1beta1.MsgSend", "value": {"amount": [{"amount": "300", "denom": "uatom"}], "fromAddress": "cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q", "toAddress": "cosmos13djgqp5mmxvcgsr3ykt2pd8c5l4vr5gz29j5kq"}}], "memo": ""}, "signOptions": {"preferNoSetFee": false}}',
      txType: 'swap',
      tradeId: '91579',
      signerId: null,
      routeId: null,
      recipient: 'osmo1g6qu6hm4v3s3vq7438jehn9fzxg9p720vzrsuj',
      receiverId: null,
      memo: null,
      gasPrice: null,
      gasLimit: null,
      feeRate: '0',
      data: null,
      chain: 'COSMOS',
      amount: '99700',
      actions: null,
      __typename: 'RouteTransactionTypeV2',
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a private key', async () => {
    expect(await cosmosSigner.getAddress(derivations.cosmos, 'cosmos')).toBe(
      txInput.from
    );
  });

  it('should get an ethermint address with prefix from a private key', async () => {
    expect(
      await ethermintSigner.getAddress(derivations.ethermint, 'evmos')
    ).toBe('evmos14gya7fnnuxhrlnywmp6uzvd4y3yul9vpp7tu6m');
  });

  it('should get an ethermint evm-like address from a private key', async () => {
    expect(
      await ethermintSigner.getEthermintAddress(derivations.ethermint)
    ).toBe('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
  });

  it('should get null from getEthermintAddress for non ethermint derivations path', async () => {
    expect(await ethermintSigner.getEthermintAddress(derivations.cosmos)).toBe(
      null
    );
  });

  it('should get a terra address from a private key', async () => {
    expect(await terraSigner.getAddress(derivations.terra)).toBe(
      'terra1elsr769k4kcgap5kgy9fcetzrwdw05qr85gqra'
    );
  });

  it('should sign direct a transaction using a private key', async () => {
    await cosmosSigner.sign(message);
    expect(message.signedTransaction).toBeTruthy();
  });

  it('should sign amimo a transaction using a private key', async () => {
    await cosmosSigner.sign(
      message,
      '',
      CosmosChainType.Cosmos,
      CosmosSignMode.SIGN_AMINO
    );
    expect(message.signedTransaction).toBeTruthy();
  });

  it('should create msg from raw msg and sign it with private key', async () => {
    const msg = await provider.createMsg(
      { data: backendSwapTransaction.unsignedStdTx },
      MsgEncoding.string
    );
    await cosmosSigner.sign(msg);
    expect(msg.signedTransaction).toBeTruthy();
  });

  it('should return status of verify message', async () => {
    // Define test data
    const privKey = PrivKeySecp256k1.generateRandomKey();
    const pubKey = privKey.getPubKey();

    const signer = bech32.encode('cosmos', bech32.toWords(pubKey.toBytes()));

    const signDoc = makeADR36AminoSignDoc(signer, 'test');
    const msg = serializeSignDoc(signDoc);
    const signature = privKey.signDigest32(Hash.sha256(msg));

    const result = await cosmosSigner.verifyMessage(
      signer,
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

    const signer = 'osmo1ymk637a7wljvt4w7q9lnrw95mg9sr37yatxd9h'; // unmatched signer

    const signDoc = makeADR36AminoSignDoc(signer, 'test');
    const msg = serializeSignDoc(signDoc);
    const signature = privKey.signDigest32(Hash.sha256(msg));

    const result = await cosmosSigner.verifyMessage(
      signer,
      'test',
      pubKey.toBytes(),
      new Uint8Array([...signature.r, ...signature.s])
    );
    expect(result).toBe(false);
  });

  it('Should create msg adn sign it with direct mode', async () => {
    const chainMsg = provider.createMsg(txInput);

    const txData = await chainMsg.buildTx();

    // Check tx msgs before signinng
    const expectedMsg = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: {
        fromAddress: txInput.from,
        toAddress: txInput.to,
        amount: [
          {
            denom: 'uatom',
            amount: '1', // txInput * 10 ** decimals
          },
        ],
      },
    };
    expect(txData.msgs[0]).toEqual(expectedMsg);

    // Check tx fee info before signing
    const expectedFee = {
      amount: [{ denom: 'uatom', amount: '2500' }],
      gas: '200000',
    };
    expect(txData.fee).toEqual(expectedFee);

    // Sign msg with direct sign mode
    const signer = new PrivateKeySigner(privateKeys.cosmos);
    await signer.sign(
      chainMsg,
      '',
      CosmosChainType.Cosmos,
      CosmosSignMode.SIGN_DIRECT
    );
    expect(chainMsg.signedTransaction).toEqual(
      'Co0BCooBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmoKLWNvc21vczFnNnF1NmhtNHYzczN2cTc0MzhqZWhuOWZ6eGc5cDcyMHllc3EycRItY29zbW9zMWc2cXU2aG00djNzM3ZxNzQzOGplaG45Znp4ZzlwNzIweWVzcTJxGgoKBXVhdG9tEgExEmcKUApGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQPdo5siwfjiwtEdo7xFF/gLRhqmnxDnYeNFdvTwnM+h7hIECgIIARgBEhMKDQoFdWF0b20SBDI1MDAQwJoMGkDMqz7SD1+2tvYlImP5HGOLF0/wjqpDAyMODMKnmh8bmkjdarqIGVnN+FgLzEaKHUpIc1c6n8iwCkh/a8SW1yfr'
    );
  });

  it('Should create msg adn sign it with animo mode', async () => {
    const chainMsg = provider.createMsg(txInput);

    const txData = await chainMsg.buildTx();

    // Check tx msgs before signinng
    const expectedMsg = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: {
        fromAddress: txInput.from,
        toAddress: txInput.to,
        amount: [
          {
            denom: 'uatom',
            amount: '1', // txInput * 10 ** decimals
          },
        ],
      },
    };
    expect(txData.msgs[0]).toEqual(expectedMsg);

    // Check tx fee info before signing
    const expectedFee = {
      amount: [{ denom: 'uatom', amount: '2500' }],
      gas: '200000',
    };
    expect(txData.fee).toEqual(expectedFee);

    // Sign msg with amino sign mode
    const signer = new PrivateKeySigner(privateKeys.cosmos);
    await signer.sign(
      chainMsg,
      '',
      CosmosChainType.Cosmos,
      CosmosSignMode.SIGN_AMINO
    );
    expect(chainMsg.signedTransaction).toEqual(
      'Co0BCooBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmoKLWNvc21vczFnNnF1NmhtNHYzczN2cTc0MzhqZWhuOWZ6eGc5cDcyMHllc3EycRItY29zbW9zMWc2cXU2aG00djNzM3ZxNzQzOGplaG45Znp4ZzlwNzIweWVzcTJxGgoKBXVhdG9tEgExEmcKUApGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQPdo5siwfjiwtEdo7xFF/gLRhqmnxDnYeNFdvTwnM+h7hIECgIIfxgBEhMKDQoFdWF0b20SBDI1MDAQwJoMGkCMICf5+o/tooHugIHu8JFVWQ1Gj8EjJVKWHdZOJSEuBWyh+Wt/k8b4A0EWzhwI8B4nHvGEPGjmLWVI6USX1wQs'
    );
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

    const signer = new PrivateKeySigner(privateKeys.cosmos);
    const signedTx = await signer.signRawTransaction(
      signDoc,
      provider,
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
    const signer = new PrivateKeySigner(privateKeys.cosmos);
    const signedTx = await signer.signRawTransaction(
      signDoc,
      provider,
      CosmosSignMode.SIGN_DIRECT
    );
    expect(signedTx.signature.pub_key.value).toEqual(
      'A92jmyLB+OLC0R2jvEUX+AtGGqafEOdh40V29PCcz6Hu'
    );
    expect(signedTx.signature.signature).toEqual(
      'i3STDg7CxEgl4svgXmhyKePzBoPtqdL3WHrkeHqI/HAMp18EUE+mh9LzTfoFYGlk7O+E+jhXtECISzUakZJ83Q=='
    );
  });

  it('Should sign arbitrary message', async () => {
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

    const signer = new PrivateKeySigner(privateKeys.cosmos);
    const signedTx = await signer.signRawTransaction(
      signDoc,
      provider,
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
    const signer = new PrivateKeySigner(privateKeys.cosmos);
    const signedTx = await signer.signRawTransaction(
      signDoc,
      provider,
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

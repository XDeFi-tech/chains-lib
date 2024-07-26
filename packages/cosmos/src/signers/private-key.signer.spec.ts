import { MsgEncoding } from '@xdefi-tech/chains-core';
import { Hash, PrivKeySecp256k1 } from '@keplr-wallet/crypto';
import { bech32 } from 'bech32';
import { makeADR36AminoSignDoc, serializeSignDoc } from '@keplr-wallet/cosmos';

import { CosmosProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { COSMOS_MANIFESTS } from '../manifests';
import { ChainMsg, CosmosChainType, CosmosSignMode, MsgBody } from '../msg';

import { PrivateKeySigner } from './private-key.signer';

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
});

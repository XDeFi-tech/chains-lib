import { Msg, MsgEncoding } from '@xdefi-tech/chains-core';

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
  let message: Msg;
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

  it('should get an ethermint address from a private key', async () => {
    expect(await ethermintSigner.getAddress(derivations.ethermint)).toBe(
      '0xcD558EBF5E7D94CB08BD34FFf7674aC95E3EBd9d'
    );
  });

  it('should get a terra address from a private key', async () => {
    expect(await terraSigner.getAddress(derivations.terra)).toBe(
      'terra1elsr769k4kcgap5kgy9fcetzrwdw05qr85gqra'
    );
  });

  it('should sign a transaction using a private key', async () => {
    await cosmosSigner.sign(message as ChainMsg);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should return false when verifing an invalid address', async () => {
    expect(cosmosSigner.verifyAddress('0xDEADBEEF', 'cosmos')).toBe(false);
  });

  it('should return false when verifing an invalid address with no prefix specified', async () => {
    expect(cosmosSigner.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(cosmosSigner.verifyAddress(txInput.from, 'cosmos')).toBe(true);
    expect(cosmosSigner.verifyAddress(txInput.from)).toBe(true);
    expect(
      cosmosSigner.verifyAddress('0xcD558EBF5E7D94CB08BD34FFf7674aC95E3EBd9d')
    ).toBe(true);
    expect(
      cosmosSigner.verifyAddress('terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8')
    ).toBe(true);
  });

  it('should create msg from raw msg and sign it with private key', async () => {
    const msg = await provider.createMsg(
      { data: backendSwapTransaction.unsignedStdTx },
      MsgEncoding.string
    );
    await cosmosSigner.sign(msg as ChainMsg);
    expect(msg.signedTransaction).toBeTruthy();
  });
});

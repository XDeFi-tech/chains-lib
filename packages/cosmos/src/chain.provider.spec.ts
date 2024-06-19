import { GasFeeSpeed } from '@xdefi-tech/chains-core';

import { ChainMsg } from './msg';
import { CosmosProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { COSMOS_MANIFESTS } from './manifests';

jest.mock('axios', () => ({
  create: jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue({
      data: {
        tx_response: {
          height: '17932843',
          txhash:
            '0269644F832384D033D2223226A5FC25BD17A3646EE2BEF5C1F9009FD19E66B9',
          codespace: '',
          code: 0,
          data: '',
          logs: [],
        },
        block: {
          header: {
            height: '17932843',
          },
        },
      },
    }),
  }),
}));

jest.mock('./datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('chain.provider', () => {
  let provider: CosmosProvider;

  beforeEach(() => {
    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.cosmos)
    );
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({
      to: 'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4',
      from: 'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should get a transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      '0269644F832384D033D2223226A5FC25BD17A3646EE2BEF5C1F9009FD19E66B9'
    );
    expect(txData?.hash).toEqual(
      '0269644F832384D033D2223226A5FC25BD17A3646EE2BEF5C1F9009FD19E66B9'
    );
  });

  it('should get a balance', async () => {
    const balance = await provider.getBalance(
      'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4'
    );
    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(0);
  });

  it('should return false when verifying an invalid address', () => {
    expect(CosmosProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid cosmos address', () => {
    expect(
      CosmosProvider.verifyAddress(
        'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q'
      )
    ).toBe(true);
  });

  it('should return false when verifying a valid cosmos address with "osmo" prefix', () => {
    expect(
      CosmosProvider.verifyAddress(
        'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        'osmo'
      )
    ).toBe(false);
  });

  it('should return true when verifying a valid osmosis address', () => {
    expect(
      CosmosProvider.verifyAddress(
        'osmo13r2x8duq3k88xjhcksd43phnmdpj97frx32qux',
        'osmo'
      )
    ).toBe(true);
  });

  it('should return true when verifying a valid mars address', () => {
    expect(
      CosmosProvider.verifyAddress(
        'mars13r2x8duq3k88xjhcksd43phnmdpj97frnhqfl0',
        'mars'
      )
    ).toBe(true);
  });

  it('should return true when verifying a valid terra address', () => {
    expect(
      CosmosProvider.verifyAddress(
        'terra10wn9ztf5vnms746nf07nsajlcqmn0s3q2nm6yz',
        'terra'
      )
    ).toBe(true);
  });

  it('should return true when verifying a valid ethermint address', () => {
    expect(
      CosmosProvider.verifyAddress(
        'evmos14gya7fnnuxhrlnywmp6uzvd4y3yul9vpp7tu6m',
        'evmos'
      )
    ).toBe(true);
  });

  it('should return true when verifying a valid EVM address', () => {
    expect(
      CosmosProvider.verifyAddress('0x74EeF25048bA28542600804F68fBF71cCf520C59')
    ).toBe(true);
  });
});

describe('chain.provider', () => {
  let provider: CosmosProvider;

  beforeEach(() => {
    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.osmosis)
    );
  });

  it('getFeeTokens(): should get a list of fee tokens', async () => {
    const feeTokens = await provider.getFeeTokens();
    expect(Array.isArray(feeTokens)).toBe(true);
    expect(
      feeTokens.every(
        (token) =>
          typeof token.denom === 'string' && typeof token.poolID === 'bigint'
      )
    ).toBeTruthy();
  });

  it('estimateGas(): should get a list of fee tokens', async () => {
    const ibcToken =
      'ibc/B547DC9B897E7C3AA5B824696110B8E3D2C31E3ED3F02FF363DCBAD82457E07E'; // uxki;
    const txInput = {
      from: 'osmo1tkh70hsnd44544s4gfhu0rpfrhkxd37pfueyfs',
      to: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      amount: '0.000001',
      msgs: [],
      feeOptions: {
        gasAdjustment: 2,
        gasFee: {
          denom: ibcToken,
        },
      },
    };
    const msg = provider.createMsg(txInput);
    const estimateFee = await provider.estimateFee(
      [msg as ChainMsg],
      GasFeeSpeed.low
    );
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });
});

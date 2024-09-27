import { Response } from '@ctrl-tech/chains-core';

import { ChainMsg } from './msg';
import { ThorProvider } from './chain.provider';
import { ChainDataSource } from './datasource';
import { THORCHAIN_MANIFESTS, ThorChains } from './manifests';

jest.mock('axios', () => ({
  create: jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue({
      data: {
        tx: {
          body: {
            messages: [
              {
                from_address: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
                to_address: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
              },
            ],
          },
        },
        tx_response: {
          height: '17932843',
          txhash:
            '30D580A3E1CA1D440BF2AB4081D9C0D834C833646ADE834EE52F1A255E5053B0',
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

describe('chain.provider', () => {
  const providers: Record<ThorChains, ThorProvider> = {
    [ThorChains.thorchain]: new ThorProvider(
      new ChainDataSource(THORCHAIN_MANIFESTS[ThorChains.thorchain])
    ),
    [ThorChains.mayachain]: new ThorProvider(
      new ChainDataSource(THORCHAIN_MANIFESTS[ThorChains.mayachain])
    ),
  };

  it('createMsg(): should create message with data for thorchain', () => {
    const msg = providers[ThorChains.thorchain].createMsg({
      to: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
      from: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
      amount: 0.000001,
      decimals: 18,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should get a transaction from thorchain', async () => {
    const txData = await providers[ThorChains.thorchain].getTransaction(
      '30D580A3E1CA1D440BF2AB4081D9C0D834C833646ADE834EE52F1A255E5053B0'
    );
    expect(txData?.hash).toEqual(
      '30D580A3E1CA1D440BF2AB4081D9C0D834C833646ADE834EE52F1A255E5053B0'
    );
  });

  it('should get fee options on thorchain', async () => {
    const feeOptions = await providers[ThorChains.thorchain].gasFeeOptions();

    expect(feeOptions?.low).toBeDefined();
    expect(feeOptions?.medium).toBeDefined();
    expect(feeOptions?.high).toBeDefined();
  });

  it('should get a balance from thorchain', async () => {
    jest.spyOn(ThorProvider.prototype, 'getBalance').mockResolvedValue(
      new Response(
        jest.fn().mockImplementation(async () => []),
        jest.fn().mockImplementation(async () => [])
      )
    );
    const balance = await providers[ThorChains.thorchain].getBalance(
      'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(0);
  });

  it('createMsg(): should create message with data for mayachain', () => {
    const msg = providers[ThorChains.mayachain].createMsg({
      to: 'maya1x5979k5wqgq58f4864glr7w2rtgyuqqm6l2zhx',
      from: 'maya1x5979k5wqgq58f4864glr7w2rtgyuqqm6l2zhx',
      amount: 0.000001,
      decimals: 18,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should get a transaction from mayachain', async () => {
    const txData = await providers[ThorChains.mayachain].getTransaction(
      '30D580A3E1CA1D440BF2AB4081D9C0D834C833646ADE834EE52F1A255E5053B0'
    );
    expect(txData?.hash).toEqual(
      '30D580A3E1CA1D440BF2AB4081D9C0D834C833646ADE834EE52F1A255E5053B0'
    );
  });

  it('should get fee options on mayachain', async () => {
    const feeOptions = await providers[ThorChains.mayachain].gasFeeOptions();

    expect(feeOptions?.low).toBeDefined();
    expect(feeOptions?.medium).toBeDefined();
    expect(feeOptions?.high).toBeDefined();
  });

  it('should get a balance from mayachain', async () => {
    jest.spyOn(ThorProvider.prototype, 'getBalance').mockResolvedValue(
      new Response(
        jest.fn().mockImplementation(async () => []),
        jest.fn().mockImplementation(async () => [])
      )
    );
    const balance = await providers[ThorChains.mayachain].getBalance(
      'maya1x5979k5wqgq58f4864glr7w2rtgyuqqm6l2zhx'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(0);
  });
});

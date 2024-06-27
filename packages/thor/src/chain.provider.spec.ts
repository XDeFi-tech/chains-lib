import { Response, Coin } from '@xdefi-tech/chains-core';

import { ChainMsg } from './msg';
import { ThorProvider } from './chain.provider';
import { THORCHAIN_MANIFESTS, ThorChains } from './manifests';

jest.mock('./datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [
      {
        address: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
        amount: {
          value: '100000000',
        },
        asset: {
          chain: 'THORChain',
          contract: null,
          decimals: 8,
          id: '3147627e-a757-4c58-b98d-dc720bf57af7',
          name: 'Rune',
          image:
            'https://xdefi-prod-static.s3.eu-west-1.amazonaws.com/thorchain.png',
          price: {
            amount: '6.12',
          },
          symbol: 'RUNE',
        },
      },
    ];
  },
}));

jest.mock('axios', () => ({
  create: jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue({
      data: {
        tx: {
          body: {
            messages: [
              {
                from_address: 'thor1x843445a6z2e3edem9se22hnekurl7tauza6ft',
                to_address: 'thor1x843445a6z2e3edem9se22hnekurl7tauza6ft',
              },
            ],
          },
        },
        tx_response: {
          height: '16389413',
          txhash:
            'E98E0A382DF95889AD80CAA585596F06F92F700E52F390E71FD0625D31696F20',
          codespace: '',
          code: 0,
          data: '',
          logs: [],
        },
        block: {
          header: {
            height: '16389413',
          },
        },
      },
    }),
  }),
}));

describe('chain.provider', () => {
  const providers: Record<ThorChains, ThorProvider> = {
    [ThorChains.thorchain]: new ThorProvider(
      new ThorProvider.dataSourceList.IndexerDataSource(
        THORCHAIN_MANIFESTS[ThorChains.thorchain]
      )
    ),
    [ThorChains.mayachain]: new ThorProvider(
      new ThorProvider.dataSourceList.IndexerDataSource(
        THORCHAIN_MANIFESTS[ThorChains.mayachain]
      )
    ),
  };

  it('createMsg(): should create message with data for thorchain', () => {
    const msg = providers[ThorChains.thorchain].createMsg({
      to: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
      from: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
      amount: 0.000001,
      decimals: 8,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should get a transaction from thorchain', async () => {
    const txData = await providers[ThorChains.thorchain].getTransaction(
      'E98E0A382DF95889AD80CAA585596F06F92F700E52F390E71FD0625D31696F20'
    );
    expect(txData?.hash).toEqual(
      'E98E0A382DF95889AD80CAA585596F06F92F700E52F390E71FD0625D31696F20'
    );
  });

  it('should get fee options on thorchain', async () => {
    const feeOptions = await providers[ThorChains.thorchain].gasFeeOptions();

    expect(feeOptions?.low).toBeDefined();
    expect(feeOptions?.medium).toBeDefined();
    expect(feeOptions?.high).toBeDefined();
  });

  it('should get a balance from thorchain', async () => {
    const balance = await providers[ThorChains.thorchain].getBalance(
      'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(1);
    expect(balanceData[0]).toBeInstanceOf(Coin);
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
      'E98E0A382DF95889AD80CAA585596F06F92F700E52F390E71FD0625D31696F20'
    );
    expect(txData?.hash).toEqual(
      'E98E0A382DF95889AD80CAA585596F06F92F700E52F390E71FD0625D31696F20'
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

  it('should return false when verifying an invalid address', () => {
    expect(ThorProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid thorchain address', () => {
    expect(
      ThorProvider.verifyAddress(
        'thor1x843445a6z2e3edem9se22hnekurl7tauza6ft',
        'thor'
      )
    ).toBe(true);
  });

  it('should return true when verifying a valid mayachain address', () => {
    expect(
      ThorProvider.verifyAddress(
        'maya1x843445a6z2e3edem9se22hnekurl7tau4rklm',
        'maya'
      )
    ).toBe(true);
  });
});

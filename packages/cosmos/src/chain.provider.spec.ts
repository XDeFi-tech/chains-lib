import { ChainMsg } from './msg';
import { CosmosProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { COSMOS_MANIFESTS } from './manifests';

jest.mock('./datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

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
});

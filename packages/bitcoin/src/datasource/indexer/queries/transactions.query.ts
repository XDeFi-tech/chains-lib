import {
  GetBitcoinTransactionsDocument,
  Scalars,
  OptBlockRange,
  UtxoTransaction,
} from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

export const getTransactions = async (
  chain: string,
  address: Scalars['String'],
  blockRange: OptBlockRange
): Promise<Array<UtxoTransaction>> => {
  const response = await gqlClient.query({
    query: GetBitcoinTransactionsDocument,
    variables: {
      address,
      blockRange,
      dateRange: {
        from: null,
        to: null,
      },
      pageNumber: 1,
      pageSize: 1000,
    },
  });

  return response.data.bitcoin.transactions;
};

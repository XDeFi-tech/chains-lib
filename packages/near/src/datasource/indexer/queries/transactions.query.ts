import {
  GetNearTransactionsDocument,
  Scalars,
  OptBlockRange,
} from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';
import { map } from 'lodash';

export const getTransaction = async (
  address: Scalars['String'],
  blockRange: OptBlockRange
) => {
  const response = await gqlClient.query({
    query: GetNearTransactionsDocument,
    variables: {
      address,
      blockRange,
      dateRange: {
        from: null,
        to: null,
      },
      first: 500,
      after: null,
    },
  });

  return map(response.data.near.transactions.edges, 'node');
};

import { gqlClient } from '@xdefi-tech/chains-core';
import map from 'lodash/map';

import { GetSolanaTransactionsDocument, Scalars } from '../../../gql/graphql';

export const getTransactions = async (address: Scalars['String']) => {
  const response = await gqlClient.query({
    query: GetSolanaTransactionsDocument,
    variables: {
      address,
      first: 1000,
      after: null,
    },
  });

  return map(response.data.solana.transactions.edges, 'node');
};

import { gqlClient } from '@xdefi-tech/chains-core';
import {
  GetSolanaTransactionsDocument,
  Scalars,
} from '@xdefi-tech/chains-graphql';
import map from 'lodash/map';

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

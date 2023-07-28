import { gqlClient } from '@xdefi-tech/chains-core';
import {
  GetSolanaTransactionsDocument,
  Scalars,
  OptBlockRange,
  OptDateRange,
} from '@xdefi-tech/chains-graphql';

export const getTransactions = (
  address: Scalars['String'],
  slotRange: OptBlockRange,
  dateRange: OptDateRange
) => {
  return gqlClient.query({
    query: GetSolanaTransactionsDocument,
    variables: {
      address,
      slotRange,
      dateRange,
    },
  });
};

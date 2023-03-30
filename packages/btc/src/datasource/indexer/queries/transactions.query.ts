import {
  GetBitcoinTransactionsDocument,
  Scalars,
  OptBlockRange,
} from '@xdefi/graphql';
import { gqlClient } from '@xdefi/chains-core';

export const getTransaction = (
  address: Scalars['String'],
  blockRange: OptBlockRange
) => {
  return gqlClient.query({
    query: GetBitcoinTransactionsDocument,
    variables: {
      address,
      blockRange,
    },
  });
};

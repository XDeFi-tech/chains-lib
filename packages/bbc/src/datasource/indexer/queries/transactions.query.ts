import {
  GetBinanceTransactionsDocument,
  Scalars,
  OptBlockRange,
} from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

export const getTransaction = (
  address: Scalars['String'],
  blockRange: OptBlockRange
) => {
  return gqlClient.query({
    query: GetBinanceTransactionsDocument,
    variables: {
      address,
      blockRange,
    },
  });
};

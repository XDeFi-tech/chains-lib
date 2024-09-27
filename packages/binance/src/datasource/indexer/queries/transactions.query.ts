import {
  GetBinanceTransactionsDocument,
  Scalars,
  OptBlockRange,
} from '@ctrl-tech/chains-graphql';
import { gqlClient } from '@ctrl-tech/chains-core';

export const getTransaction = (
  address: Scalars['String'],
  blockRange: OptBlockRange
) => {
  return gqlClient.query({
    query: GetBinanceTransactionsDocument,
    variables: {
      address,
      blockRange,
      first: 1000,
      after: null,
    },
  });
};

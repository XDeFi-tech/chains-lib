import { gqlClient } from '@xdefi-tech/chains-core';

import {
  GetBinanceTransactionsDocument,
  Scalars,
  OptBlockRange,
} from '../../../gql/graphql';

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

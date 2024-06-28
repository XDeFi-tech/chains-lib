import { gqlClient } from '@xdefi-tech/chains-core';

import { GetBinanceBalancesDocument } from '../../../gql/graphql';

export const getBalance = (address: string) => {
  return gqlClient.query({
    query: GetBinanceBalancesDocument,
    variables: {
      address,
    },
  });
};

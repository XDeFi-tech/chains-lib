import { gqlClient } from '@xdefi-tech/chains-core';

import { GetSolanaBalanceDocument } from '../../../gql/graphql';

export const getBalance = (address: string) => {
  return gqlClient.query({
    query: GetSolanaBalanceDocument,
    variables: {
      address,
    },
  });
};

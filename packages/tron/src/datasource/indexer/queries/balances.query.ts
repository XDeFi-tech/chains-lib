import { gqlClient } from '@xdefi-tech/chains-core';

import { GetTronBalanceDocument } from '../../../gql/graphql';

export const getBalance = async (address: string) => {
  const response = await gqlClient.query({
    query: GetTronBalanceDocument,
    variables: {
      address,
      first: 100,
    },
    fetchPolicy: 'no-cache',
  });

  return response.data.tron.balances;
};

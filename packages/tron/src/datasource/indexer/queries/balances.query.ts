import { gqlClient } from '@xdefi-tech/chains-core';
import { GetTronBalanceDocument } from '@xdefi-tech/chains-graphql';

export const getBalance = async (address: string) => {
  const response = await gqlClient.query({
    query: GetTronBalanceDocument,
    variables: {
      address,
      first: 100,
    },
    fetchPolicy: 'network-only',
  });

  return response.data.tron.balances;
};

import { gqlClient } from '@xdefi-tech/chains-core';
import { NearBalanceDocument } from '@xdefi-tech/chains-graphql';

export const getBalance = async (address: string) => {
  const response = await gqlClient.query({
    query: NearBalanceDocument,
    variables: {
      address,
    },
  });

  return response.data.near.balances;
};

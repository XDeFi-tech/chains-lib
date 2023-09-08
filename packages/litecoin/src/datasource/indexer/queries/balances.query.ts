import { gqlClient } from '@xdefi-tech/chains-core';
import { LitecoinBalanceDocument, Balance } from '@xdefi-tech/chains-graphql';

export const getBalance = async (address: string): Promise<Array<Balance>> => {
  const response = await gqlClient.query({
    query: LitecoinBalanceDocument,
    variables: {
      address,
    },
  });

  return response.data.litecoin.balances;
};

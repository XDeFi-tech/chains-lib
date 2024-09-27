import { gqlClient } from '@ctrl-tech/chains-core';
import { LitecoinBalanceDocument, Balance } from '@ctrl-tech/chains-graphql';

export const getBalance = async (address: string): Promise<Array<Balance>> => {
  const response = await gqlClient.query({
    query: LitecoinBalanceDocument,
    variables: {
      address,
    },
  });

  return response.data.litecoin.balances as Array<Balance>;
};

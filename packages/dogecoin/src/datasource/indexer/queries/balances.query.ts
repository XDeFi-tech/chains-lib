import { gqlClient } from '@ctrl-tech/chains-core';
import { DogecoinBalanceDocument, Balance } from '@ctrl-tech/chains-graphql';

export const getBalance = async (address: string): Promise<Array<Balance>> => {
  const response = await gqlClient.query({
    query: DogecoinBalanceDocument,
    variables: {
      address,
    },
  });

  return response.data.dogecoin.balances as Array<Balance>;
};

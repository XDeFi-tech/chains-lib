import { gqlClient } from '@xdefi-tech/chains-core';

import { DogecoinBalanceDocument, Balance } from '../../../gql/graphql';

export const getBalance = async (address: string): Promise<Array<Balance>> => {
  const response = await gqlClient.query({
    query: DogecoinBalanceDocument,
    variables: {
      address,
    },
  });

  return response.data.dogecoin.balances as Array<Balance>;
};

import { gqlClient } from '@xdefi-tech/chains-core';

import { LitecoinBalanceDocument, Balance } from '../../../gql/graphql';

export const getBalance = async (address: string): Promise<Array<Balance>> => {
  const response = await gqlClient.query({
    query: LitecoinBalanceDocument,
    variables: {
      address,
    },
    fetchPolicy: 'no-cache',
  });

  return response.data.litecoin.balances as Array<Balance>;
};

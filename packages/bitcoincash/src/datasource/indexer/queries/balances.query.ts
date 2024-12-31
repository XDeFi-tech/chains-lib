import { gqlClient } from '@xdefi-tech/chains-core';

import { BitcoinCashBalanceDocument, Balance } from '../../../gql/graphql';

export const getBalance = async (address: string): Promise<Array<Balance>> => {
  const response = await gqlClient.query({
    query: BitcoinCashBalanceDocument,
    variables: {
      address,
    },
    fetchPolicy: 'no-cache',
  });

  return response.data.bitcoincash.balances as Array<Balance>;
};

import { gqlClient } from '@xdefi-tech/chains-core';

import { Balance, BitcoinBalanceDocument } from '../../../gql/graphql';

export const getBalance = async (address: string): Promise<Array<Balance>> => {
  const response = await gqlClient.query({
    query: BitcoinBalanceDocument,
    variables: {
      address,
    },
    fetchPolicy: 'no-cache',
  });

  return response.data.bitcoin.balances as Array<Balance>;
};

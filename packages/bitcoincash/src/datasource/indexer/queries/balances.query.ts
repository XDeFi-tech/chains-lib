import { gqlClient } from '@xdefi-tech/chains-core';
import {
  BitcoinCashBalanceDocument,
  Balance,
} from '@xdefi-tech/chains-graphql';

export const getBalance = async (address: string): Promise<Array<Balance>> => {
  const response = await gqlClient.query({
    query: BitcoinCashBalanceDocument,
    variables: {
      address,
    },
  });

  return response.data.bitcoincash.balances as Array<Balance>;
};

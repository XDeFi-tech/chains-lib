import { gqlClient } from '@ctrl-tech/chains-core';
import {
  BitcoinCashBalanceDocument,
  Balance,
} from '@ctrl-tech/chains-graphql';

export const getBalance = async (address: string): Promise<Array<Balance>> => {
  const response = await gqlClient.query({
    query: BitcoinCashBalanceDocument,
    variables: {
      address,
    },
  });

  return response.data.bitcoincash.balances as Array<Balance>;
};

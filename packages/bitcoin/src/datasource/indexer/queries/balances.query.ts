import { gqlClient } from '@ctrl-tech/chains-core';
import { BitcoinBalanceDocument, Balance } from '@ctrl-tech/chains-graphql';

export const getBalance = async (address: string): Promise<Array<Balance>> => {
  const response = await gqlClient.query({
    query: BitcoinBalanceDocument,
    variables: {
      address,
    },
  });

  return response.data.bitcoin.balances as Array<Balance>;
};

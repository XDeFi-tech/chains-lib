import { gqlClient } from '@xdefi-tech/chains-core';
import { BitcoinBalanceDocument } from '@xdefi-tech/chains-graphql';

export const getBalance = (address: string) => {
  return gqlClient.query({
    query: BitcoinBalanceDocument,
    variables: {
      address,
    },
  });
};

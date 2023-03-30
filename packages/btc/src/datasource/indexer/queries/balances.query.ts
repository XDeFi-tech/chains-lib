import { gqlClient } from '@xdefi/chains-core';
import { BitcoinBalanceDocument } from '@xdefi/graphql';

export const getBalance = (address: string) => {
  return gqlClient.query({
    query: BitcoinBalanceDocument,
    variables: {
      address,
    },
  });
};

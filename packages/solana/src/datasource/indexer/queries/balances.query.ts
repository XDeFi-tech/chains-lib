import { gqlClient } from '@xdefi-tech/chains-core';
import { GetSolanaBalanceDocument } from '@xdefi-tech/chains-graphql';

export const getBalance = (address: string) => {
  return gqlClient.query({
    query: GetSolanaBalanceDocument,
    variables: {
      address,
    },
  });
};

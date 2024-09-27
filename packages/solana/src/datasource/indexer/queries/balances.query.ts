import { gqlClient } from '@ctrl-tech/chains-core';
import { GetSolanaBalanceDocument } from '@ctrl-tech/chains-graphql';

export const getBalance = (address: string) => {
  return gqlClient.query({
    query: GetSolanaBalanceDocument,
    variables: {
      address,
    },
  });
};

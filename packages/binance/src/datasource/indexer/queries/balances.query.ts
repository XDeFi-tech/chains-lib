import { gqlClient } from '@ctrl-tech/chains-core';
import { GetBinanceBalancesDocument } from '@ctrl-tech/chains-graphql';

export const getBalance = (address: string) => {
  return gqlClient.query({
    query: GetBinanceBalancesDocument,
    variables: {
      address,
    },
  });
};

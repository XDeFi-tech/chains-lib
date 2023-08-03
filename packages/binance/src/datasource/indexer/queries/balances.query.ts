import { gqlClient } from '@xdefi-tech/chains-core';
import { GetBinanceBalancesDocument } from '@xdefi-tech/chains-graphql';

export const getBalance = (address: string) => {
  return gqlClient.query({
    query: GetBinanceBalancesDocument,
    variables: {
      address,
    },
  });
};

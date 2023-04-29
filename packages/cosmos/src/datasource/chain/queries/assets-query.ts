import { gqlClient } from '@xdefi/chains-core';
import { AddressChain, GetAssetsWithFilterDocument } from '@xdefi/graphql';

export const getAssets = (symbols: string[]) => {
  return gqlClient.query({
    query: GetAssetsWithFilterDocument,
    variables: {
      page: {
        first: 1000,
      },
      filter: {
        chains: [AddressChain.Cosmos],
        symbols: symbols,
      },
    },
  });
};

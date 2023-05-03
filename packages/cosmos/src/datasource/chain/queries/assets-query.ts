import { gqlClient } from '@xdefi/chains-core';
import { GetAssetsWithFilterDocument } from '@xdefi/graphql';

export const getAssets = (contractAddress: string[]) => {
  return gqlClient.query({
    query: GetAssetsWithFilterDocument,
    variables: {
      page: {
        first: 1000,
      },
      filter: {
        address: contractAddress,
      },
    },
  });
};

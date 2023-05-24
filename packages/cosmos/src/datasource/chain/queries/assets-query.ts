import { gqlClient } from '@xdefi-tech/chains-core';
import { GetAssetsWithFilterDocument } from '@xdefi-tech/chains-graphql';

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

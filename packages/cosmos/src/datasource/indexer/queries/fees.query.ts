import { gqlClient } from '@xdefi-tech/chains-core';
import { GetCosmosFeesDocument } from '@xdefi-tech/chains-graphql';

export const getFees = () => {
  return gqlClient.query({
    query: GetCosmosFeesDocument,
  });
};

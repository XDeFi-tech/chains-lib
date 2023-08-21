import { GetNearStatusDocument } from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

export const getStatus = async () => {
  const response = await gqlClient.query({
    query: GetNearStatusDocument,
  });

  return response.data.near.status;
};

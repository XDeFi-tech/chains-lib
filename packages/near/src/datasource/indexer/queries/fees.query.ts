import { GetNearFeeDocument } from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

export const getFees = async () => {
  const response = await gqlClient.query({
    query: GetNearFeeDocument,
    fetchPolicy: 'no-cache',
  });

  return response.data.near.fee;
};

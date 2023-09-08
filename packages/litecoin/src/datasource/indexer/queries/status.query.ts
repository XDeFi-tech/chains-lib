import { GetLitecoinStatusDocument } from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

export const getStatus = async () => {
  const response = await gqlClient.query({
    query: GetLitecoinStatusDocument,
  });

  return response.data.litecoin.status;
};

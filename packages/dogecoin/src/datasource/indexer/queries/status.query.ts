import { GetDogecoinStatusDocument } from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

export const getStatus = async () => {
  const response = await gqlClient.query({
    query: GetDogecoinStatusDocument,
  });

  return response.data.dogecoin.status;
};

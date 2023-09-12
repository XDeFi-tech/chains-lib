import { GetBitcoinStatusDocument } from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

export const getStatus = async () => {
  const response = await gqlClient.query({
    query: GetBitcoinStatusDocument,
  });

  return response.data.bitcoin.status;
};

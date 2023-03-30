import { GetBitcoinStatusDocument } from '@xdefi/graphql';
import { gqlClient } from '@xdefi/chains-core';

export const getStatus = () => {
  return gqlClient.query({
    query: GetBitcoinStatusDocument,
  });
};

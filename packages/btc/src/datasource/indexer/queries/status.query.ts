import { GetBitcoinStatusDocument } from '@xdefi/graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

export const getStatus = () => {
  return gqlClient.query({
    query: GetBitcoinStatusDocument,
  });
};

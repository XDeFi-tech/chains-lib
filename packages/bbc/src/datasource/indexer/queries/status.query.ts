import { GetBinanceStatusDocument } from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

export const getStatus = () => {
  return gqlClient.query({
    query: GetBinanceStatusDocument,
  });
};

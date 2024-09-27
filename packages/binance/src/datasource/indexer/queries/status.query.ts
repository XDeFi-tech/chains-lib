import { GetBinanceStatusDocument } from '@ctrl-tech/chains-graphql';
import { gqlClient } from '@ctrl-tech/chains-core';

export const getStatus = () => {
  return gqlClient.query({
    query: GetBinanceStatusDocument,
  });
};

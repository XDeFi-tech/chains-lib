import { GetBinanceFeeDocument } from '@ctrl-tech/chains-graphql';
import { gqlClient } from '@ctrl-tech/chains-core';

export const getFees = () => {
  return gqlClient.query({
    query: GetBinanceFeeDocument,
  });
};

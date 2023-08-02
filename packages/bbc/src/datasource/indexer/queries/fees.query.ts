import { GetBinanceFeeDocument } from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

export const getFees = () => {
  return gqlClient.query({
    query: GetBinanceFeeDocument,
  });
};

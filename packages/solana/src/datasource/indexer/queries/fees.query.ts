import { gqlClient } from '@ctrl-tech/chains-core';
import { GetSolanaFeeDocument } from '@ctrl-tech/chains-graphql';

export const getFees = () => {
  return gqlClient.query({
    query: GetSolanaFeeDocument,
  });
};

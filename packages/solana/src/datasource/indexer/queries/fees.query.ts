import { gqlClient } from '@xdefi-tech/chains-core';
import { GetSolanaFeeDocument } from '@xdefi-tech/chains-graphql';

export const getFees = () => {
  return gqlClient.query({
    query: GetSolanaFeeDocument,
  });
};

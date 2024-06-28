import { gqlClient } from '@xdefi-tech/chains-core';

import { GetSolanaFeeDocument } from '../../../gql/graphql';

export const getFees = () => {
  return gqlClient.query({
    query: GetSolanaFeeDocument,
  });
};

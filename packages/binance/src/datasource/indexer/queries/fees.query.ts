import { gqlClient } from '@xdefi-tech/chains-core';

import { GetBinanceFeeDocument } from '../../../gql/graphql';

export const getFees = () => {
  return gqlClient.query({
    query: GetBinanceFeeDocument,
  });
};

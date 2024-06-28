import { gqlClient } from '@xdefi-tech/chains-core';

import { GetBinanceStatusDocument } from '../../../gql/graphql';

export const getStatus = () => {
  return gqlClient.query({
    query: GetBinanceStatusDocument,
  });
};

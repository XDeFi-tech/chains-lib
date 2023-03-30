import { GetFeesDocument } from '@xdefi/graphql';
import { gqlClient } from '@xdefi/chains-core';

export const getFees = () => {
  return gqlClient.query({
    query: GetFeesDocument,
    variables: {
      filter: 'Bitcoin',
    },
    fetchPolicy: 'no-cache',
  });
};

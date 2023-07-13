import { gqlClient } from '@xdefi-tech/chains-core';
import {
  GetCosmosTransactionsDocument,
  Scalars,
} from '@xdefi-tech/chains-graphql';

import { CosmosHubChains } from '../../../manifests';

export const getTransactions = (
  chain: CosmosHubChains,
  address: Scalars['String']
) => {
  let query = null;
  switch (chain) {
    case CosmosHubChains.cosmoshub:
      query = GetCosmosTransactionsDocument;
      break;
  }

  if (!query) {
    throw new Error('Unsupported cosmos hub chain');
  }

  // todo add get all pages
  return gqlClient.query({
    query,
    variables: {
      address,
      first: 1000,
      after: null,
      dateRange: {
        from: null,
        to: null,
      },
    },
  });
};

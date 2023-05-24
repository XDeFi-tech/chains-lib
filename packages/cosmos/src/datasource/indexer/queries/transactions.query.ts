import { gqlClient } from '@xdefi-tech/chains-core';
import {
  BlockRange,
  GetCosmosTransactionsDocument,
  InputMaybe,
  Scalars,
} from '@xdefi-tech/chains-graphql';

import { CosmosHubChains } from '../../../manifests';

export const getTransactions = (
  chain: CosmosHubChains,
  address: Scalars['String'],
  blockRange?: InputMaybe<BlockRange>
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
      pagination: {
        first: 1000,
        after: null,
      },
      blockRange: {
        from: null,
        to: null,
      },
      ...(blockRange && { blockRange }), // override default null
    },
  });
};

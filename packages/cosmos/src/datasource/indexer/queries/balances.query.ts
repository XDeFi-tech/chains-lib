import { gqlClient } from '@xdefi-tech/chains-core';
import { CosmosBalanceDocument } from '@xdefi-tech/chains-graphql';

import { CosmosHubChains } from '../../../manifests';

export const getBalance = (chain: CosmosHubChains, address: string) => {
  let query = null;
  switch (chain) {
    case CosmosHubChains.cosmoshub:
      query = CosmosBalanceDocument;
      break;
  }

  if (!query) {
    throw new Error('Unsupported cosmos hub chain');
  }

  return gqlClient.query({
    query,
    variables: {
      address,
    },
  });
};

import { gqlClient } from '@xdefi-tech/chains-core';
import { GetCosmosStatusDocument } from '@xdefi-tech/chains-graphql';

import { CosmosHubChains } from '../../../manifests';

export const getStatus = (chain: CosmosHubChains) => {
  let query = null;
  switch (chain) {
    case CosmosHubChains.cosmoshub:
      query = GetCosmosStatusDocument;
      break;
  }

  if (!query) {
    throw new Error('Unsupported cosmos hub chain');
  }

  return gqlClient.query({
    query,
  });
};

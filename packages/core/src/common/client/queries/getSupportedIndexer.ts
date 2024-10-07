import { SupportedIndexerDocument } from '../../graphql';
import { gqlClient } from '../gql.client';

export const getSupportedIndexer = async (chain: string) => {
  const result = await gqlClient.query({
    query: SupportedIndexerDocument,
    variables: {
      chain: chain,
    },
  });
  return result.data.assets.supportedIndexer;
};

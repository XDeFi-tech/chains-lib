import { gql } from 'graphql-tag';
import { gqlClient, LEGACY_NFTS_FRAGMENT } from '@ctrl-tech/chains-core';

export const SOLANA_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    solana {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }
  ${LEGACY_NFTS_FRAGMENT}
`;

export const getNFTBalance = async (address: string) => {
  const { data: response } = await gqlClient.query({
    query: SOLANA_NFTS_QUERY,
    variables: {
      address,
    },
  });

  return response.solana.legacyNFTs;
};

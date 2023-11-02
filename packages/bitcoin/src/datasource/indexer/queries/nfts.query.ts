import { gql } from '@apollo/client';
import { gqlClient, LEGACY_NFTS_FRAGMENT } from '@xdefi-tech/chains-core';

export const BITCOIN_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    bitcoin {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const getNFTBalance = async (address: string) => {
  const { data: response } = await gqlClient.query({
    query: BITCOIN_NFTS_QUERY,
    variables: {
      address,
    },
  });

  return response.bitcoin.legacyNFTs;
};

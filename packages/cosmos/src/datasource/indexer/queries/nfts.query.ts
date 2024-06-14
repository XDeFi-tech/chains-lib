import { gql } from 'graphql-tag';
import { gqlClient, LEGACY_NFTS_FRAGMENT } from '@xdefi-tech/chains-core';

export const STARGAZE_NFTS_QUERY = gql`
  query STARGAZE_NFTS($address: String!) {
    stargaze {
      nfts(address: $address) {
        attributes {
          displayType
          traitType
          value
        }
        balance {
          value
        }
        collection {
          address
          media {
            contentType
            type
            url
          }
          name
          symbol
        }
        id
        description
        lastSale {
          cryptoPrice {
            value
          }
          fiatPrice {
            value
          }
          quantity {
            value
          }
        }
        media {
          contentType
          type
          url
        }
        name
        owner
        symbol
      }
    }
  }
`;

export const JUNO_NFTS_QUERY = gql`
  query JUNO_NFTS($address: String!) {
    juno {
      nfts(address: $address) {
        attributes {
          displayType
          traitType
          value
        }
        balance {
          value
        }
        collection {
          address
          media {
            contentType
            type
            url
          }
          name
          symbol
        }
        id
        description
        lastSale {
          cryptoPrice {
            value
          }
          fiatPrice {
            value
          }
          quantity {
            value
          }
        }
        media {
          contentType
          type
          url
        }
        name
        owner
        symbol
      }
    }
  }
`;

export const TERRA_NFTS_QUERY = gql`
  query TerraNFTS($address: String!) {
    terra {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const getNFTBalance = async (chain: string, address: string) => {
  let query;
  let chainName;
  switch (chain.trim().toLowerCase()) {
    case 'juno':
      query = JUNO_NFTS_QUERY;
      chainName = 'juno';
      break;
    case 'stargaze':
      query = STARGAZE_NFTS_QUERY;
      chainName = 'stargaze';
      break;
    case 'terra':
      query = TERRA_NFTS_QUERY;
      chainName = 'terra';
      break;
    default:
      throw new Error('Chain do not support NFTs');
  }

  const { data: response } = await gqlClient.query({
    query: query,
    variables: {
      address,
    },
  });

  return response[chainName].nfts;
};

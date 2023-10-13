import { gql } from '@apollo/client';

export const LEGACY_NFTS_FRAGMENT = gql`
  fragment LegacyNftData on NFTv3 {
    collection {
      address
    }
    attributes {
      displayType
      traitType
      value
    }
    balance {
      scalingFactor
      value
    }
    description
    id
    media {
      contentType
      type
      url
    }
    name
    owner
    location
    symbol
    lastSale {
      fiatPrice {
        value
        scalingFactor
      }
      cryptoPrice {
        value
        scalingFactor
      }
      quantity {
        value
        scalingFactor
      }
    }
    contractType
  }
`;

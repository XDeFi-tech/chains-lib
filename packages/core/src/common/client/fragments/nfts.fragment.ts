import { gql } from 'graphql-tag';

export const LEGACY_NFTS_FRAGMENT = gql`
  fragment LegacyNftData on NFTv3 {
    attributes {
      traitType
      displayType
      value
    }
    description
    id
    name
    owner
    symbol
    isNftSpam
    location
    contractType
    spamScore
    collectionV3 {
      name
      address
      symbol
      collectionItemsAmount
      collectionItemsOwnersAmount
      floorPrices {
        marketplaceId
        value
        valueUsdCents
        paymentToken {
          paymentTokenId
          name
          symbol
          address
          decimals
        }
      }
    }
    media {
      type
      url
      contentType
      blurHash
    }
    lastSale {
      quantity {
        value
      }
      fiatPrice {
        value
      }
      cryptoPrice {
        value
      }
    }
    balance {
      value
    }
  }
`;

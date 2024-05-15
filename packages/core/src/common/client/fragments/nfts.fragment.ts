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
    symbol
    isNftSpam
    contractType
    spamScore
    owner
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
      media {
        type
        url
      }
      marketplaces {
        collectionUrl
        marketplaceName
        nftUrl
        logoUrl
      }
    }
    media {
      type
      url
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

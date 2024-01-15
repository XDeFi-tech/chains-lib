import { gql } from 'graphql-tag';

export const BALANCE_FRAGMENT = gql`
  fragment Balance on Balance {
    address
    asset {
      symbol
      contract
      id
      name
      image
      chain
      price {
        amount
        scalingFactor
      }
    }
    amount {
      value
      scalingFactor
    }
  }
`;

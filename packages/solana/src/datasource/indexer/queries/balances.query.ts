import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi/chains-core';

export const GET_BALANCE = gql`
  query GetBalance($address: String!) {
    solana {
      balances(address: $address) {
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
    }
  }
`;

export const getBalance = (address: string) => {
  return gqlClient.query({
    query: GET_BALANCE,
    variables: {
      address,
    },
  });
};

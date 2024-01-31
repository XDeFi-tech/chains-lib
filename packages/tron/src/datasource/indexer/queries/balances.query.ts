import { gql } from 'graphql-tag';
import { gqlClient } from '@xdefi-tech/chains-core';

export const GET_BALANCE = () => gql`
  query GetTronBalance($address: String!) {
    tron {
      balances(address: $address) {
        address
        asset {
          symbol
          contract
          id
          name
          image
          chain
          decimals
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

export const getBalance = async (address: string) => {
  const response = await gqlClient.query({
    query: GET_BALANCE(),
    variables: {
      address,
      first: 100,
    },
  });

  return response.data.tron.balances;
};

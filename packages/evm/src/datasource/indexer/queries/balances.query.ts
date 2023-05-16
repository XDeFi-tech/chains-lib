import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi-tech/chains-core';

import { EVMChains } from '../../../manifests';

export const GET_BALANCE = (chain: EVMChains) => gql`
query GetBalance($address: String!) {
  ${chain} {
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

export const getBalance = (chain: EVMChains, address: string) => {
  return gqlClient.query({
    query: GET_BALANCE(chain),
    variables: {
      address,
    },
  });
};

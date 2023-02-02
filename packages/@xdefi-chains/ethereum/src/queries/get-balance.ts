import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi/chains-core';
import { SupportedChains } from '../chain.provider';

export const GET_BALANCE = (chain: SupportedChains) => gql`
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


export const getBalance = (chain: SupportedChains, address: string) => {
    return gqlClient.query({
        query: GET_BALANCE(chain),
        variables: {
            address
        },
    })
};

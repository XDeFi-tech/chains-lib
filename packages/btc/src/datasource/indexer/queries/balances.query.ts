import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi/chains-core';

export const GET_BALANCE = gql`
  query GetBalance($address: String!) {
    bitcoin {
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

interface Balance {
  bitcoin: {
    balances: {
      address: string;
      asset: {
        symbol: string | null;
        contract: string | null;
        id: string | null;
        name: string | null;
        image: string | null;
        chain: string | null;
        price: {
          amount: string;
          scalingFactor: number;
        } | null;
      };
      amount: {
        value: string;
        scalingFactor: number;
      };
    }[];
  };
}

export const getBalance = (address: string) => {
  return gqlClient.query<Balance>({
    query: GET_BALANCE,
    variables: {
      address,
    },
  });
};

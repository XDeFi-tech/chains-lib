import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi-tech/chains-core';
import capitalize from 'lodash/capitalize';
import map from 'lodash/map';

import { EVMChains } from '../../../manifests';

export const GET_TRANSACTION_WITH_PAGINATION = (chain: string) => gql`
query Get${capitalize(chain)}Transactions($address: String!, $first: Int) {
  ${chain} {
    transactions(address: $address, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          hash
          blockIndex
          blockNumber
          status
          value
          timestamp
          fromAddress
          transfers {
            amount {
              value
            }
            asset {
              ... on CryptoAsset {
                chain
                contract
                decimals
                id
                image
                name
                price {
                  amount
                  scalingFactor
                }
                symbol
              }
            }
            fromAddress
            toAddress
          }
        }
      }
    }
  }
}
`;

export const GET_TRANSACTION = (chain: string) => gql`
query GetTransactions($address: String!) {
  ${chain} {
    transactions(address: $address) {
      fee
      hash
      fromAddress
      status
      timestamp
      toAddress
      transfers {
        amount {
          value
          scalingFactor
        }
        asset {
          id
          name
          symbol
          image
          chain
          contract
          price {
            amount
            scalingFactor
          }
        }
        fromAddress
        toAddress
      }
    }
  }
}
`;

export interface BlockRange {
  from: number;
  to: number;
}

export const getTransactions = async (
  chain: EVMChains,
  address: string,
  blockRange: BlockRange | null
) => {
  let indexerChain: string = chain;
  switch (chain) {
    case EVMChains.smartchain:
      indexerChain = 'binanceSmartChain';
      break;
    case EVMChains.cantoevm:
      indexerChain = 'cantoEVM';
      break;
  }
  const response = await gqlClient.query({
    query: GET_TRANSACTION_WITH_PAGINATION(indexerChain),
    variables: {
      address,
      ...(blockRange && { blockRange }),
    },
  });

  return map(response.data[indexerChain].transactions.edges, 'node');
};

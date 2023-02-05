import { gql } from "@apollo/client";
import { gqlClient } from "@xdefi/chains-core";
import { EVMChains } from '../chain.provider';

export const GET_TRANSACTION = (chain: EVMChains) => gql`
query GetTransactions($blockRange: BlockRange, $address: String!) {
  ${chain} {
    transactions(blockRange: $blockRange, address: $address) {
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
    from: number,
    to: number
}

export const getTransaction = (chain: EVMChains, address: string, blockRange: BlockRange | null) => {
    return gqlClient.query({
        query: GET_TRANSACTION(chain),
        variables: {
            address,
            ...(blockRange && { blockRange })
        },
    })
};
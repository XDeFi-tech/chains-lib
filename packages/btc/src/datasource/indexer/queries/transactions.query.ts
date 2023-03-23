import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi/chains-core';

export const GET_TRANSACTION = gql`
  query GetTransactions($address: String!, $blockRange: OptBlockRange!) {
    bitcoin {
      transactions(address: $address, blockRange: $blockRange) {
        edges {
          node {
            blockIndex
            blockNumber
            fee {
              scalingFactor
              value
            }
            hash
            inputs {
              address
              amount {
                value
                scalingFactor
              }
            }
            outputs {
              address
              amount {
                value
                scalingFactor
              }
            }
            status
            timestamp
          }
        }
      }
    }
  }
`;

export interface BlockRange {
  from: number;
  to: number;
}

export type Amount = {
  value: string;
  scalingFactor: number;
};

export type Inputs = {
  address: string;
  amount: Amount;
};
export type Outputs = Inputs;

export type TransactionResponse = {
  bitcoin: {
    transactions: {
      edges: {
        node: {
          blockIndex: number;
          blockNumber: number;
          fee: Amount;
          hash: string;
          inputs: Inputs[];
          outputs: Outputs[];
          status: string;
          timestamp: Date;
        };
      }[];
    };
  };
};

export const getTransaction = (
  address: string,
  blockRange: BlockRange | null
) => {
  return gqlClient.query<TransactionResponse>({
    query: GET_TRANSACTION,
    variables: {
      address,
      ...(blockRange && { blockRange }),
    },
  });
};

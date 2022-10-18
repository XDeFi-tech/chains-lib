import { gql } from "@apollo/client";
import { gqlClient } from "@xdefi/chains-core";

export const GET_TRANSACTION = gql`
query GetTransactions($address: String!, $date: DateSelector!, $blockNumber: Int!) {
  ethereum {
    name
    transactions(address: $address, date: $date, blockNumber: $blockNumber) {
      hash
      timestamp
      status
      type
      fee
      inputData
      fromAddress
      toAddress
      raw
      logs
      transfers {
        fromAddress
        toAddress
      }
    }
  }
}
`;

export const getTransaction = (address: string, fromDate: string, toDate: string, blockNumber: number) => {
    return gqlClient.query({
        query: GET_TRANSACTION,
        variables: {
            address,
            date: {
                fromDate,
                toDate,
            },
            blockNumber
        },
    })
};

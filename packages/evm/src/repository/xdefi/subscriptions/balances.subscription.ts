import { gql } from '@apollo/client';
import { EVMChains } from '../../../manifests';
import { gqlClient } from '@xdefi/chains-core';

export const ETHEREUM_BALANCE_SUBSCRIPTION = gql`
subscription Balances {
  ethereumBalances {
    asset {
      chain
      contract
    }
    amount {
      value
      scalingFactor
    }
    address
  }
}
`

export const subscribeBalances = (chain: EVMChains, address: string) => {
    let query;
    switch (chain) {
        case EVMChains.ethereum:
            query = ETHEREUM_BALANCE_SUBSCRIPTION;
            break;
        default:
            throw new Error('Not implemented yet');
    }

    return gqlClient.subscribe<any>({
        query: query
    })
}
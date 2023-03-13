import { gql } from '@apollo/client'
import { gqlClient, BalancesData } from '@xdefi/chains-core'

import { EVMChains } from '../../../manifests'

export const ETHEREUM_BALANCE_SUBSCRIPTION = gql`
  subscription {
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
  let query
  switch (chain) {
    case EVMChains.ethereum:
      query = ETHEREUM_BALANCE_SUBSCRIPTION
      break
    default:
      throw new Error('Not implemented yet')
  }

  return gqlClient.subscribe<BalancesData>({
    query,
    variables: {
      address,
    },
  })
}

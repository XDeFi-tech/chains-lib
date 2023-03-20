import { gql } from '@apollo/client'
import { gqlClient } from '@xdefi/chains-core'

export const GET_STATUS = gql`
  query GetStatus {
    bitcoin {
      status {
        lastBlock
      }
    }
  }
`

export type GetStatusResponse = {
  bitcoin: {
    status: {
      lastBlock: number
    }
  }
}

export const getStatus = () => {
  return gqlClient.query<GetStatusResponse>({
    query: GET_STATUS,
  })
}

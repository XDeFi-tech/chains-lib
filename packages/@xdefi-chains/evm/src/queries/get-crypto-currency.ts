import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi/chains-core';

export const GET_CRYPTO_CURRENCY = gql`
query CryptoCurrency($page: ConnectionArgs!, $filter: CryptoCurrencyFilter) {
  assets {
    cryptoCurrencies(page: $page, filter: $filter) {
      page {
        edges {
          node {
            chain
            name
            price {
              amount
            }
            symbol
            id
            scalingFactor
            icon
            marketCap
            priceHistory
          }
        }
      }
    }
  }
}
`;


export const getCryptoCurrency = (symbols: string | string[]) => {
    if (typeof symbols === 'string') {
        symbols = [symbols]
    }
    return gqlClient.query({
        query: GET_CRYPTO_CURRENCY,
        variables: {
            page: {
                first: 1000
            },
            filter: {
                symbols: symbols
            }
        }
    })
};

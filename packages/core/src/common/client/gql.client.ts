import { ApolloClient, split, from, defaultDataIdFromObject } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import { HttpLink } from '@apollo/client/link/http';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import fetch from 'cross-fetch';

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: 'wss://gateway-ws.xdefi.services/',
        })
      )
    : null;

const httpLink = new HttpLink({
  uri: 'https://gql-router.xdefi.services/graphql',
  fetch,
});

const splitLink =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink
      )
    : httpLink;

const cache = new InMemoryCache({
  resultCaching: true,
  dataIdFromObject: (result) => {
    if (result.balances && Array.isArray(result.balances) && result.balances.length > 0) {
      const firstAsset = (result.balances as any[])[0];
      return `${firstAsset.asset.chain}:${firstAsset.address}`; // to trigger cache update for different chains with the same address
    }
    if (result.__typename === 'CryptoAsset') {
      return `CryptoAsset:${result.contract}:${result.chain}`;
    }
    return defaultDataIdFromObject(result);
  },
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      /* next step improvement: Check error and send it to sentry with traceId */

      const traceId = operation.getContext().response.headers.get('xdefi-trace-id');
      // eslint-disable-next-line no-console
      console.debug(`[GQL Error] traceId: ${traceId}`, err?.message);
    }
  }

  if (networkError) {
    // eslint-disable-next-line no-console
    console.debug(`[GQL Network error]: ${networkError}`);
  }
});

export const gqlClient = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache,
  assumeImmutableResults: true,
});

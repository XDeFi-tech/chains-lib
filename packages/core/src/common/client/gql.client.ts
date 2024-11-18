import { ApolloClient, DefaultOptions, ApolloLink, split, from, defaultDataIdFromObject } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import { HttpLink } from '@apollo/client/link/http';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import fetch from 'cross-fetch';

export interface ChainsCoreOptions {
  httpUri: string;
  wsUri: string;
  clientName: string;
  clientVersion: string;
  disableApolloCache?: boolean;
}

export const DEFAULT_CHAINS_CORE_OPTIONS: ChainsCoreOptions = {
  httpUri: 'https://gql-router.xdefi.services/graphql',
  wsUri: 'wss://gateway-ws.xdefi.services/',
  clientName: 'unknown-chains-lib',
  clientVersion: '0.0.0',
  disableApolloCache: false,
};

declare global {
  // eslint-disable-next-line no-var
  var CHAINS_CORE_OPTIONS: ChainsCoreOptions;
}

const clientInfoLink = new ApolloLink((operation, forward) => {
  const chainOptions = globalThis?.CHAINS_CORE_OPTIONS || DEFAULT_CHAINS_CORE_OPTIONS;

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'apollographql-client-name': chainOptions.clientName,
      'apollographql-client-version': chainOptions.clientVersion,
    },
  }));

  return forward(operation);
});

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: (globalThis?.CHAINS_CORE_OPTIONS || DEFAULT_CHAINS_CORE_OPTIONS).wsUri,
        })
      )
    : null;

const httpLink = new HttpLink({
  uri: (globalThis?.CHAINS_CORE_OPTIONS || DEFAULT_CHAINS_CORE_OPTIONS).httpUri,
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
      isCacheSet = true;
      startCacheInterval();
      const firstAsset = (result.balances as any[])[0];
      return `${firstAsset.asset.chain}:${firstAsset.address}`; // to trigger cache update for different chains with the same address
    }
    if (result.__typename === 'CryptoAsset') {
      return `CryptoAsset:${result.contract}:${result.chain}`;
    }
    return defaultDataIdFromObject(result);
  },
});

let isCacheSet = false;
let cacheInterval: NodeJS.Timeout | null = null;

const startCacheInterval = () => {
  if (cacheInterval) {
    clearInterval(cacheInterval);
  }

  cacheInterval = setInterval(() => {
    cache.modify({
      fields: {
        balances(_, { DELETE }) {
          return DELETE;
        },
      },
    });

    const cacheData = cache.extract();
    Object.keys(cacheData).forEach((key) => {
      if (key.includes('Balance:')) {
        cache.evict({ id: key });
      }
    });

    cache.gc();
    gqlClient.resetStore();
  }, 60000);
};

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

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export const gqlClient = new ApolloClient({
  link: from([clientInfoLink, errorLink, splitLink]),
  cache: cache,
  assumeImmutableResults: true,
  defaultOptions: (globalThis?.CHAINS_CORE_OPTIONS || DEFAULT_CHAINS_CORE_OPTIONS).disableApolloCache
    ? defaultOptions
    : Object.create(null),
});

export const cleanupCacheInterval = () => {
  if (cacheInterval) {
    clearInterval(cacheInterval);
    cacheInterval = null;
  }
  isCacheSet = false;
};

import { ApolloClient, ApolloLink, split, from, defaultDataIdFromObject } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import { HttpLink } from '@apollo/client/link/http';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import fetch from 'cross-fetch';

declare global {
  interface Window {
    CHAINS_CORE_OPTIONS: {
      httpUri: string;
      wsUri: string;
      clientName: string;
      clientVersion: string;
    };
  }
}

const getChainCoreOptions = () => {
  // Chain core options on FE
  if (typeof window !== 'undefined') {
    const { httpUri, wsUri, clientName, clientVersion } = window.CHAINS_CORE_OPTIONS || {};
    return { httpUri, wsUri, clientName, clientVersion };
  }
  // Chain core options on BE
  return {
    httpUri: process.env.CHAIN_CORE_HTTP_URI,
    wsUri: process.env.CHAIN_CORE_WS_URI,
    clientName: process.env.CHAIN_CORE_CLIENT_NAME,
    clientVersion: process.env.CHAIN_CORE_CLIENT_VERSION,
  };
};

const chainOptions = getChainCoreOptions();

const clientInfoLink = new ApolloLink((operation, forward) => {
  let clientName = 'ctrl-node-app';
  const clientVersion = chainOptions.clientVersion || 'v1.0';
  if (chainOptions.clientName) {
    clientName = chainOptions.clientName;
  } else if (typeof window !== 'undefined') {
    if (window.navigator.userAgent.includes('Mobile')) {
      clientName = 'ctrl-mobile-app';
    } else {
      clientName = 'ctrl-extension';
    }
  }

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'apollographql-client-name': clientName,
      'apollographql-client-version': clientVersion,
    },
  }));

  return forward(operation);
});

const wsLink = chainOptions.wsUri
  ? new GraphQLWsLink(createClient({ url: chainOptions.wsUri }))
  : typeof window !== 'undefined'
  ? new GraphQLWsLink(
      createClient({
        url: 'wss://gateway-ws.xdefi.services/',
      })
    )
  : null;

const httpLink = new HttpLink({
  uri: chainOptions.httpUri || 'https://gql-router.xdefi.services/graphql',
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
  link: from([clientInfoLink, errorLink, splitLink]),
  cache,
  assumeImmutableResults: true,
});

import { ApolloClient, split, from } from '@apollo/client/core';
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
  dataIdFromObject: (obj: any) => {
    return obj.id;
  },
  typePolicies: {
    Query: {
      fields: {
        assets: {
          merge: true,
        },
      },
    },
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
});

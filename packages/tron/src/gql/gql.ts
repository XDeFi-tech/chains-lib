/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'query GetTronBalance($address: String!) {\n  tron {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        decimals\n        price {\n          amount\n          scalingFactor\n          dayPriceChange\n        }\n      }\n      amount {\n        value\n        scalingFactor\n      }\n    }\n  }\n}\n\nquery GetTronTransactions($address: String!, $first: Int) {\n  tron {\n    transactions(address: $address, first: $first) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          hash\n          blockIndex\n          blockNumber\n          status\n          value\n          timestamp\n          fromAddress\n          toAddress\n          transfers {\n            amount {\n              value\n            }\n            asset {\n              ... on CryptoAsset {\n                chain\n                contract\n                decimals\n                id\n                image\n                name\n                price {\n                  amount\n                  scalingFactor\n                }\n                symbol\n              }\n            }\n            fromAddress\n            toAddress\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetTronBalanceDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetTronBalance($address: String!) {\n  tron {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        decimals\n        price {\n          amount\n          scalingFactor\n          dayPriceChange\n        }\n      }\n      amount {\n        value\n        scalingFactor\n      }\n    }\n  }\n}\n\nquery GetTronTransactions($address: String!, $first: Int) {\n  tron {\n    transactions(address: $address, first: $first) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          hash\n          blockIndex\n          blockNumber\n          status\n          value\n          timestamp\n          fromAddress\n          toAddress\n          transfers {\n            amount {\n              value\n            }\n            asset {\n              ... on CryptoAsset {\n                chain\n                contract\n                decimals\n                id\n                image\n                name\n                price {\n                  amount\n                  scalingFactor\n                }\n                symbol\n              }\n            }\n            fromAddress\n            toAddress\n          }\n        }\n      }\n    }\n  }\n}'
): typeof documents['query GetTronBalance($address: String!) {\n  tron {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        decimals\n        price {\n          amount\n          scalingFactor\n          dayPriceChange\n        }\n      }\n      amount {\n        value\n        scalingFactor\n      }\n    }\n  }\n}\n\nquery GetTronTransactions($address: String!, $first: Int) {\n  tron {\n    transactions(address: $address, first: $first) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          hash\n          blockIndex\n          blockNumber\n          status\n          value\n          timestamp\n          fromAddress\n          toAddress\n          transfers {\n            amount {\n              value\n            }\n            asset {\n              ... on CryptoAsset {\n                chain\n                contract\n                decimals\n                id\n                image\n                name\n                price {\n                  amount\n                  scalingFactor\n                }\n                symbol\n              }\n            }\n            fromAddress\n            toAddress\n          }\n        }\n      }\n    }\n  }\n}'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

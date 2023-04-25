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
  'query EthereumBalance($address: String!) {\n  ethereum {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        price {\n          amount\n          scalingFactor\n        }\n      }\n    }\n  }\n}':
    types.EthereumBalanceDocument,
  'query CosmosBalance($address: String!) {\n  cosmos {\n    balances(address: $address) {\n      address\n      amount {\n        scalingFactor\n        value\n      }\n      asset {\n        chain\n        contract\n        id\n        name\n        symbol\n        image\n        price {\n          scalingFactor\n          amount\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosTransactions($address: String!, $pagination: CursorPagination!, $blockRange: OptBlockRange!) {\n  cosmos {\n    transactions(\n      address: $address\n      pagination: $pagination\n      blockRange: $blockRange\n    ) {\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      edges {\n        node {\n          blockHeight\n          blockIndex\n          hash\n          status\n          transfers {\n            amount {\n              scalingFactor\n              value\n            }\n            fromAddress\n            toAddress\n            asset {\n              chain\n              contract\n              id\n              name\n              image\n              symbol\n              price {\n                amount\n                scalingFactor\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosStatus {\n  cosmos {\n    status {\n      lastBlock\n    }\n  }\n}':
    types.CosmosBalanceDocument,
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
  source: 'query EthereumBalance($address: String!) {\n  ethereum {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        price {\n          amount\n          scalingFactor\n        }\n      }\n    }\n  }\n}'
): typeof documents['query EthereumBalance($address: String!) {\n  ethereum {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        price {\n          amount\n          scalingFactor\n        }\n      }\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query CosmosBalance($address: String!) {\n  cosmos {\n    balances(address: $address) {\n      address\n      amount {\n        scalingFactor\n        value\n      }\n      asset {\n        chain\n        contract\n        id\n        name\n        symbol\n        image\n        price {\n          scalingFactor\n          amount\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosTransactions($address: String!, $pagination: CursorPagination!, $blockRange: OptBlockRange!) {\n  cosmos {\n    transactions(\n      address: $address\n      pagination: $pagination\n      blockRange: $blockRange\n    ) {\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      edges {\n        node {\n          blockHeight\n          blockIndex\n          hash\n          status\n          transfers {\n            amount {\n              scalingFactor\n              value\n            }\n            fromAddress\n            toAddress\n            asset {\n              chain\n              contract\n              id\n              name\n              image\n              symbol\n              price {\n                amount\n                scalingFactor\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosStatus {\n  cosmos {\n    status {\n      lastBlock\n    }\n  }\n}'
): typeof documents['query CosmosBalance($address: String!) {\n  cosmos {\n    balances(address: $address) {\n      address\n      amount {\n        scalingFactor\n        value\n      }\n      asset {\n        chain\n        contract\n        id\n        name\n        symbol\n        image\n        price {\n          scalingFactor\n          amount\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosTransactions($address: String!, $pagination: CursorPagination!, $blockRange: OptBlockRange!) {\n  cosmos {\n    transactions(\n      address: $address\n      pagination: $pagination\n      blockRange: $blockRange\n    ) {\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      edges {\n        node {\n          blockHeight\n          blockIndex\n          hash\n          status\n          transfers {\n            amount {\n              scalingFactor\n              value\n            }\n            fromAddress\n            toAddress\n            asset {\n              chain\n              contract\n              id\n              name\n              image\n              symbol\n              price {\n                amount\n                scalingFactor\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosStatus {\n  cosmos {\n    status {\n      lastBlock\n    }\n  }\n}'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

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
  'query GetSolanaBalance($address: String!) {\n  solana {\n    balances(address: $address) {\n      address\n      amount {\n        value\n      }\n      asset {\n        chain\n        contract\n        decimals\n        id\n        name\n        image\n        price {\n          amount\n          dayPriceChange\n        }\n        symbol\n        type\n        categories\n      }\n    }\n  }\n}\n\nquery GetSolanaTransactions($address: String!, $first: Int!, $after: String) {\n  solana {\n    transactions(address: $address, first: $first, after: $after) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          fee {\n            amount {\n              value\n            }\n            payer\n          }\n          hash\n          slot\n          status\n          timestamp\n          transfers {\n            amount {\n              value\n            }\n            asset {\n              chain\n              contract\n              decimals\n              id\n              image\n              name\n              price {\n                amount\n              }\n              symbol\n            }\n            fromAddress\n            toAddress\n          }\n          signers\n        }\n      }\n    }\n  }\n}\n\nquery GetSolanaStatus {\n  solana {\n    status {\n      lastBlock\n    }\n  }\n}\n\nquery GetSolanaFee {\n  solana {\n    fee {\n      high\n      low\n      medium\n    }\n  }\n}':
    types.GetSolanaBalanceDocument,
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
  source: 'query GetSolanaBalance($address: String!) {\n  solana {\n    balances(address: $address) {\n      address\n      amount {\n        value\n      }\n      asset {\n        chain\n        contract\n        decimals\n        id\n        name\n        image\n        price {\n          amount\n          dayPriceChange\n        }\n        symbol\n        type\n        categories\n      }\n    }\n  }\n}\n\nquery GetSolanaTransactions($address: String!, $first: Int!, $after: String) {\n  solana {\n    transactions(address: $address, first: $first, after: $after) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          fee {\n            amount {\n              value\n            }\n            payer\n          }\n          hash\n          slot\n          status\n          timestamp\n          transfers {\n            amount {\n              value\n            }\n            asset {\n              chain\n              contract\n              decimals\n              id\n              image\n              name\n              price {\n                amount\n              }\n              symbol\n            }\n            fromAddress\n            toAddress\n          }\n          signers\n        }\n      }\n    }\n  }\n}\n\nquery GetSolanaStatus {\n  solana {\n    status {\n      lastBlock\n    }\n  }\n}\n\nquery GetSolanaFee {\n  solana {\n    fee {\n      high\n      low\n      medium\n    }\n  }\n}'
): typeof documents['query GetSolanaBalance($address: String!) {\n  solana {\n    balances(address: $address) {\n      address\n      amount {\n        value\n      }\n      asset {\n        chain\n        contract\n        decimals\n        id\n        name\n        image\n        price {\n          amount\n          dayPriceChange\n        }\n        symbol\n        type\n        categories\n      }\n    }\n  }\n}\n\nquery GetSolanaTransactions($address: String!, $first: Int!, $after: String) {\n  solana {\n    transactions(address: $address, first: $first, after: $after) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          fee {\n            amount {\n              value\n            }\n            payer\n          }\n          hash\n          slot\n          status\n          timestamp\n          transfers {\n            amount {\n              value\n            }\n            asset {\n              chain\n              contract\n              decimals\n              id\n              image\n              name\n              price {\n                amount\n              }\n              symbol\n            }\n            fromAddress\n            toAddress\n          }\n          signers\n        }\n      }\n    }\n  }\n}\n\nquery GetSolanaStatus {\n  solana {\n    status {\n      lastBlock\n    }\n  }\n}\n\nquery GetSolanaFee {\n  solana {\n    fee {\n      high\n      low\n      medium\n    }\n  }\n}'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

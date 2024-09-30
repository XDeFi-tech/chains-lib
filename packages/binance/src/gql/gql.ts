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
  'query GetBinanceBalances($address: String!) {\n  binance {\n    balances(address: $address) {\n      address\n      amount {\n        value\n      }\n      asset {\n        chain\n        contract\n        decimals\n        id\n        image\n        name\n        symbol\n        price {\n          amount\n          scalingFactor\n          dayPriceChange\n        }\n        type\n        categories\n      }\n    }\n  }\n}\n\nquery GetBinanceTransactions($address: String!, $first: Int, $after: String, $blockRange: OptBlockSelector) {\n  binance {\n    transactions(\n      address: $address\n      first: $first\n      after: $after\n      blockRange: $blockRange\n    ) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          amount {\n            value\n          }\n          asset {\n            chain\n            contract\n            decimals\n            id\n            image\n            name\n            price {\n              amount\n              scalingFactor\n            }\n            symbol\n            type\n          }\n          blockHeight\n          data\n          fee {\n            value\n          }\n          fromAddress\n          hash\n          status\n          time\n          toAddress\n          type\n        }\n      }\n    }\n  }\n}\n\nquery GetBinanceFee {\n  binance {\n    fee\n  }\n}\n\nquery GetBinanceStatus {\n  binance {\n    status {\n      lastBlock {\n        hash\n        height\n        time\n        txCount\n      }\n    }\n  }\n}':
    types.GetBinanceBalancesDocument,
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
  source: 'query GetBinanceBalances($address: String!) {\n  binance {\n    balances(address: $address) {\n      address\n      amount {\n        value\n      }\n      asset {\n        chain\n        contract\n        decimals\n        id\n        image\n        name\n        symbol\n        price {\n          amount\n          scalingFactor\n          dayPriceChange\n        }\n        type\n        categories\n      }\n    }\n  }\n}\n\nquery GetBinanceTransactions($address: String!, $first: Int, $after: String, $blockRange: OptBlockSelector) {\n  binance {\n    transactions(\n      address: $address\n      first: $first\n      after: $after\n      blockRange: $blockRange\n    ) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          amount {\n            value\n          }\n          asset {\n            chain\n            contract\n            decimals\n            id\n            image\n            name\n            price {\n              amount\n              scalingFactor\n            }\n            symbol\n            type\n          }\n          blockHeight\n          data\n          fee {\n            value\n          }\n          fromAddress\n          hash\n          status\n          time\n          toAddress\n          type\n        }\n      }\n    }\n  }\n}\n\nquery GetBinanceFee {\n  binance {\n    fee\n  }\n}\n\nquery GetBinanceStatus {\n  binance {\n    status {\n      lastBlock {\n        hash\n        height\n        time\n        txCount\n      }\n    }\n  }\n}'
): typeof documents['query GetBinanceBalances($address: String!) {\n  binance {\n    balances(address: $address) {\n      address\n      amount {\n        value\n      }\n      asset {\n        chain\n        contract\n        decimals\n        id\n        image\n        name\n        symbol\n        price {\n          amount\n          scalingFactor\n          dayPriceChange\n        }\n        type\n        categories\n      }\n    }\n  }\n}\n\nquery GetBinanceTransactions($address: String!, $first: Int, $after: String, $blockRange: OptBlockSelector) {\n  binance {\n    transactions(\n      address: $address\n      first: $first\n      after: $after\n      blockRange: $blockRange\n    ) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          amount {\n            value\n          }\n          asset {\n            chain\n            contract\n            decimals\n            id\n            image\n            name\n            price {\n              amount\n              scalingFactor\n            }\n            symbol\n            type\n          }\n          blockHeight\n          data\n          fee {\n            value\n          }\n          fromAddress\n          hash\n          status\n          time\n          toAddress\n          type\n        }\n      }\n    }\n  }\n}\n\nquery GetBinanceFee {\n  binance {\n    fee\n  }\n}\n\nquery GetBinanceStatus {\n  binance {\n    status {\n      lastBlock {\n        hash\n        height\n        time\n        txCount\n      }\n    }\n  }\n}'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

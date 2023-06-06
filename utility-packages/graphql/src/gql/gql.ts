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
  'query BitcoinBalance($address: String!) {\n  bitcoin {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        price {\n          amount\n          scalingFactor\n        }\n      }\n      amount {\n        value\n        scalingFactor\n      }\n    }\n  }\n}\n\nquery GetFees($filter: String) {\n  chains(filter: $filter) {\n    name\n    fee {\n      value\n    }\n  }\n}\n\nquery GetBitcoinStatus {\n  bitcoin {\n    status {\n      lastBlock\n    }\n  }\n}\n\nquery GetBitcoinTransactions($address: String!, $blockRange: OptBlockRange!) {\n  bitcoin {\n    transactions(address: $address, blockRange: $blockRange) {\n      edges {\n        node {\n          blockIndex\n          blockNumber\n          fee {\n            scalingFactor\n            value\n          }\n          hash\n          inputs {\n            address\n            amount {\n              value\n              scalingFactor\n            }\n          }\n          outputs {\n            address\n            amount {\n              value\n              scalingFactor\n            }\n          }\n          status\n          timestamp\n        }\n      }\n    }\n  }\n}':
    types.BitcoinBalanceDocument,
  'query GetAssetsWithFilter($page: ConnectionArgs!, $filter: TokenFilter) {\n  assets {\n    tokens(page: $page, filter: $filter) {\n      page {\n        edges {\n          node {\n            contracts {\n              address\n              symbol\n              chain\n              scalingFactor\n            }\n            id\n            price {\n              amount\n              scalingFactor\n            }\n            symbol\n            name\n            icon\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetAssetsWithFilterDocument,
  'query CosmosBalance($address: String!) {\n  cosmos {\n    balances(address: $address) {\n      address\n      amount {\n        scalingFactor\n        value\n      }\n      asset {\n        chain\n        contract\n        id\n        name\n        symbol\n        image\n        decimals\n        price {\n          scalingFactor\n          amount\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosTransactions($address: String!, $dateRange: OptDateRange!, $pagination: CursorPagination!) {\n  cosmos {\n    transactions(address: $address, dateRange: $dateRange, pagination: $pagination) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          hash\n          fee {\n            amount {\n              asset {\n                chain\n                contract\n                id\n                name\n                symbol\n                image\n                decimals\n                price {\n                  amount\n                  scalingFactor\n                }\n              }\n              amount {\n                value\n              }\n            }\n            payer\n          }\n          status\n          transfers {\n            amount {\n              value\n            }\n            asset {\n              chain\n              contract\n              id\n              name\n              symbol\n              image\n              decimals\n              price {\n                amount\n                scalingFactor\n              }\n            }\n            fromAddress\n            toAddress\n          }\n          timestamp\n          blockHeight\n          blockIndex\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosStatus {\n  cosmos {\n    status {\n      lastBlock\n    }\n  }\n}':
    types.CosmosBalanceDocument,
  'query EthereumBalance($address: String!) {\n  ethereum {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        price {\n          amount\n          scalingFactor\n        }\n      }\n    }\n  }\n}':
    types.EthereumBalanceDocument,
  'query GetCryptoAssets($input: [CryptoAssetArgs!]!) {\n  assets {\n    cryptoAssets(input: $input) {\n      chain\n      contract\n      id\n      name\n      symbol\n      image\n      decimals\n      price {\n        amount\n        scalingFactor\n      }\n    }\n  }\n}':
    types.GetCryptoAssetsDocument,
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
  source: 'query BitcoinBalance($address: String!) {\n  bitcoin {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        price {\n          amount\n          scalingFactor\n        }\n      }\n      amount {\n        value\n        scalingFactor\n      }\n    }\n  }\n}\n\nquery GetFees($filter: String) {\n  chains(filter: $filter) {\n    name\n    fee {\n      value\n    }\n  }\n}\n\nquery GetBitcoinStatus {\n  bitcoin {\n    status {\n      lastBlock\n    }\n  }\n}\n\nquery GetBitcoinTransactions($address: String!, $blockRange: OptBlockRange!) {\n  bitcoin {\n    transactions(address: $address, blockRange: $blockRange) {\n      edges {\n        node {\n          blockIndex\n          blockNumber\n          fee {\n            scalingFactor\n            value\n          }\n          hash\n          inputs {\n            address\n            amount {\n              value\n              scalingFactor\n            }\n          }\n          outputs {\n            address\n            amount {\n              value\n              scalingFactor\n            }\n          }\n          status\n          timestamp\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query BitcoinBalance($address: String!) {\n  bitcoin {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        price {\n          amount\n          scalingFactor\n        }\n      }\n      amount {\n        value\n        scalingFactor\n      }\n    }\n  }\n}\n\nquery GetFees($filter: String) {\n  chains(filter: $filter) {\n    name\n    fee {\n      value\n    }\n  }\n}\n\nquery GetBitcoinStatus {\n  bitcoin {\n    status {\n      lastBlock\n    }\n  }\n}\n\nquery GetBitcoinTransactions($address: String!, $blockRange: OptBlockRange!) {\n  bitcoin {\n    transactions(address: $address, blockRange: $blockRange) {\n      edges {\n        node {\n          blockIndex\n          blockNumber\n          fee {\n            scalingFactor\n            value\n          }\n          hash\n          inputs {\n            address\n            amount {\n              value\n              scalingFactor\n            }\n          }\n          outputs {\n            address\n            amount {\n              value\n              scalingFactor\n            }\n          }\n          status\n          timestamp\n        }\n      }\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetAssetsWithFilter($page: ConnectionArgs!, $filter: TokenFilter) {\n  assets {\n    tokens(page: $page, filter: $filter) {\n      page {\n        edges {\n          node {\n            contracts {\n              address\n              symbol\n              chain\n              scalingFactor\n            }\n            id\n            price {\n              amount\n              scalingFactor\n            }\n            symbol\n            name\n            icon\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetAssetsWithFilter($page: ConnectionArgs!, $filter: TokenFilter) {\n  assets {\n    tokens(page: $page, filter: $filter) {\n      page {\n        edges {\n          node {\n            contracts {\n              address\n              symbol\n              chain\n              scalingFactor\n            }\n            id\n            price {\n              amount\n              scalingFactor\n            }\n            symbol\n            name\n            icon\n          }\n        }\n      }\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query CosmosBalance($address: String!) {\n  cosmos {\n    balances(address: $address) {\n      address\n      amount {\n        scalingFactor\n        value\n      }\n      asset {\n        chain\n        contract\n        id\n        name\n        symbol\n        image\n        decimals\n        price {\n          scalingFactor\n          amount\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosTransactions($address: String!, $dateRange: OptDateRange!, $pagination: CursorPagination!) {\n  cosmos {\n    transactions(address: $address, dateRange: $dateRange, pagination: $pagination) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          hash\n          fee {\n            amount {\n              asset {\n                chain\n                contract\n                id\n                name\n                symbol\n                image\n                decimals\n                price {\n                  amount\n                  scalingFactor\n                }\n              }\n              amount {\n                value\n              }\n            }\n            payer\n          }\n          status\n          transfers {\n            amount {\n              value\n            }\n            asset {\n              chain\n              contract\n              id\n              name\n              symbol\n              image\n              decimals\n              price {\n                amount\n                scalingFactor\n              }\n            }\n            fromAddress\n            toAddress\n          }\n          timestamp\n          blockHeight\n          blockIndex\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosStatus {\n  cosmos {\n    status {\n      lastBlock\n    }\n  }\n}'
): (typeof documents)['query CosmosBalance($address: String!) {\n  cosmos {\n    balances(address: $address) {\n      address\n      amount {\n        scalingFactor\n        value\n      }\n      asset {\n        chain\n        contract\n        id\n        name\n        symbol\n        image\n        decimals\n        price {\n          scalingFactor\n          amount\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosTransactions($address: String!, $dateRange: OptDateRange!, $pagination: CursorPagination!) {\n  cosmos {\n    transactions(address: $address, dateRange: $dateRange, pagination: $pagination) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          hash\n          fee {\n            amount {\n              asset {\n                chain\n                contract\n                id\n                name\n                symbol\n                image\n                decimals\n                price {\n                  amount\n                  scalingFactor\n                }\n              }\n              amount {\n                value\n              }\n            }\n            payer\n          }\n          status\n          transfers {\n            amount {\n              value\n            }\n            asset {\n              chain\n              contract\n              id\n              name\n              symbol\n              image\n              decimals\n              price {\n                amount\n                scalingFactor\n              }\n            }\n            fromAddress\n            toAddress\n          }\n          timestamp\n          blockHeight\n          blockIndex\n        }\n      }\n    }\n  }\n}\n\nquery GetCosmosStatus {\n  cosmos {\n    status {\n      lastBlock\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query EthereumBalance($address: String!) {\n  ethereum {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        price {\n          amount\n          scalingFactor\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query EthereumBalance($address: String!) {\n  ethereum {\n    balances(address: $address) {\n      address\n      asset {\n        symbol\n        contract\n        id\n        name\n        image\n        chain\n        price {\n          amount\n          scalingFactor\n        }\n      }\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetCryptoAssets($input: [CryptoAssetArgs!]!) {\n  assets {\n    cryptoAssets(input: $input) {\n      chain\n      contract\n      id\n      name\n      symbol\n      image\n      decimals\n      price {\n        amount\n        scalingFactor\n      }\n    }\n  }\n}'
): (typeof documents)['query GetCryptoAssets($input: [CryptoAssetArgs!]!) {\n  assets {\n    cryptoAssets(input: $input) {\n      chain\n      contract\n      id\n      name\n      symbol\n      image\n      decimals\n      price {\n        amount\n        scalingFactor\n      }\n    }\n  }\n}'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

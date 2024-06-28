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
  'query BitcoinCashBalance($address: String!) {\n  bitcoincash {\n    balances(address: $address) {\n      address\n      amount {\n        value\n      }\n      asset {\n        chain\n        contract\n        decimals\n        id\n        image\n        name\n        price {\n          amount\n          dayPriceChange\n        }\n        symbol\n      }\n    }\n  }\n}\n\nquery GetBitcoinCashFees {\n  bitcoincash {\n    fee {\n      high\n      low\n      medium\n    }\n  }\n}\n\nquery GetBitcoinCashTransactions($address: String!, $pageSize: Int!, $pageNumber: Int!) {\n  bitcoincash {\n    transactionsV2(address: $address, pageSize: $pageSize, pageNumber: $pageNumber) {\n      balanceChange {\n        value\n      }\n      blockNumber\n      fee {\n        value\n      }\n      hash\n      inputs {\n        address\n        amount {\n          value\n        }\n      }\n      outputs {\n        amount {\n          value\n        }\n        address\n      }\n      timestamp\n      status\n    }\n  }\n}\n\nquery BitcoinCashBroadcastTransaction($rawHex: String!) {\n  bitcoincash {\n    broadcastTransaction(rawHex: $rawHex)\n  }\n}\n\nquery BitcoinCashScanUTXOs($address: String!, $page: Int!) {\n  bitcoincash {\n    unspentTxOutputsV5(address: $address, page: $page) {\n      oTxHash\n      oIndex\n      value {\n        value\n      }\n      oTxHex\n      address\n      isCoinbase\n      scriptHex\n    }\n  }\n}\n\nquery BitcoinCashGetTransactionByHash($txHash: String!) {\n  bitcoincash {\n    getTransactionByHashV5(txHash: $txHash) {\n      hex\n      txid\n      hash\n      size\n      version\n      locktime\n      confirmations\n      blocktime\n      time\n      blockhash\n      blockNumber\n      sourceOfData\n      inputs {\n        address\n      }\n      outputs {\n        address\n      }\n    }\n  }\n}':
    types.BitcoinCashBalanceDocument,
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
  source: 'query BitcoinCashBalance($address: String!) {\n  bitcoincash {\n    balances(address: $address) {\n      address\n      amount {\n        value\n      }\n      asset {\n        chain\n        contract\n        decimals\n        id\n        image\n        name\n        price {\n          amount\n          dayPriceChange\n        }\n        symbol\n      }\n    }\n  }\n}\n\nquery GetBitcoinCashFees {\n  bitcoincash {\n    fee {\n      high\n      low\n      medium\n    }\n  }\n}\n\nquery GetBitcoinCashTransactions($address: String!, $pageSize: Int!, $pageNumber: Int!) {\n  bitcoincash {\n    transactionsV2(address: $address, pageSize: $pageSize, pageNumber: $pageNumber) {\n      balanceChange {\n        value\n      }\n      blockNumber\n      fee {\n        value\n      }\n      hash\n      inputs {\n        address\n        amount {\n          value\n        }\n      }\n      outputs {\n        amount {\n          value\n        }\n        address\n      }\n      timestamp\n      status\n    }\n  }\n}\n\nquery BitcoinCashBroadcastTransaction($rawHex: String!) {\n  bitcoincash {\n    broadcastTransaction(rawHex: $rawHex)\n  }\n}\n\nquery BitcoinCashScanUTXOs($address: String!, $page: Int!) {\n  bitcoincash {\n    unspentTxOutputsV5(address: $address, page: $page) {\n      oTxHash\n      oIndex\n      value {\n        value\n      }\n      oTxHex\n      address\n      isCoinbase\n      scriptHex\n    }\n  }\n}\n\nquery BitcoinCashGetTransactionByHash($txHash: String!) {\n  bitcoincash {\n    getTransactionByHashV5(txHash: $txHash) {\n      hex\n      txid\n      hash\n      size\n      version\n      locktime\n      confirmations\n      blocktime\n      time\n      blockhash\n      blockNumber\n      sourceOfData\n      inputs {\n        address\n      }\n      outputs {\n        address\n      }\n    }\n  }\n}'
): typeof documents['query BitcoinCashBalance($address: String!) {\n  bitcoincash {\n    balances(address: $address) {\n      address\n      amount {\n        value\n      }\n      asset {\n        chain\n        contract\n        decimals\n        id\n        image\n        name\n        price {\n          amount\n          dayPriceChange\n        }\n        symbol\n      }\n    }\n  }\n}\n\nquery GetBitcoinCashFees {\n  bitcoincash {\n    fee {\n      high\n      low\n      medium\n    }\n  }\n}\n\nquery GetBitcoinCashTransactions($address: String!, $pageSize: Int!, $pageNumber: Int!) {\n  bitcoincash {\n    transactionsV2(address: $address, pageSize: $pageSize, pageNumber: $pageNumber) {\n      balanceChange {\n        value\n      }\n      blockNumber\n      fee {\n        value\n      }\n      hash\n      inputs {\n        address\n        amount {\n          value\n        }\n      }\n      outputs {\n        amount {\n          value\n        }\n        address\n      }\n      timestamp\n      status\n    }\n  }\n}\n\nquery BitcoinCashBroadcastTransaction($rawHex: String!) {\n  bitcoincash {\n    broadcastTransaction(rawHex: $rawHex)\n  }\n}\n\nquery BitcoinCashScanUTXOs($address: String!, $page: Int!) {\n  bitcoincash {\n    unspentTxOutputsV5(address: $address, page: $page) {\n      oTxHash\n      oIndex\n      value {\n        value\n      }\n      oTxHex\n      address\n      isCoinbase\n      scriptHex\n    }\n  }\n}\n\nquery BitcoinCashGetTransactionByHash($txHash: String!) {\n  bitcoincash {\n    getTransactionByHashV5(txHash: $txHash) {\n      hex\n      txid\n      hash\n      size\n      version\n      locktime\n      confirmations\n      blocktime\n      time\n      blockhash\n      blockNumber\n      sourceOfData\n      inputs {\n        address\n      }\n      outputs {\n        address\n      }\n    }\n  }\n}'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

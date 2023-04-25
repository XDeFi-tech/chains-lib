/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * ISO 8601 calendar date without timezone.
   * Format: %Y-%m-%d
   *
   * # Examples
   *
   * * `1994-11-13`
   * * `2000-02-24`
   */
  Date: any;
  /**
   * A datetime with timezone offset.
   *
   * The input is a string in RFC3339 format, e.g. "2022-01-12T04:00:19.12345Z"
   * or "2022-01-12T04:00:19+03:00". The output is also a string in RFC3339
   * format, but it is always normalized to the UTC (Z) offset, e.g.
   * "2022-01-12T04:00:19.12345Z".
   */
  DateTime: any;
  /** Decimal (fixed-point) */
  Decimal: any;
  /** A scalar that can represent any JSON value. */
  JSON: any;
  /**
   * A local datetime without timezone offset.
   *
   * The input/output is a string in ISO 8601 format without timezone, including
   * subseconds. E.g. "2022-01-12T07:30:19.12345".
   */
  LocalDateTime: any;
  /**
   * ISO 8601 combined date and time without timezone.
   *
   * # Examples
   *
   * * `2015-07-01T08:59:60.123`,
   */
  NaiveDateTime: any;
};

export type Address = {
  __typename?: 'Address';
  address: Scalars['String'];
  chain: Scalars['String'];
};

export enum AddressChain {
  /** Legacy, use "Arbitrum" instead */
  ARBITRUM = 'ARBITRUM',
  /** Legacy, use "Aurora" instead */
  AURORA = 'AURORA',
  /** Legacy, use "Avalanche" instead */
  AVAX = 'AVAX',
  Akash = 'Akash',
  Arbitrum = 'Arbitrum',
  AssetMantle = 'AssetMantle',
  Aurora = 'Aurora',
  Avalanche = 'Avalanche',
  Axelar = 'Axelar',
  /** Legacy, use "BitcoinCash" instead */
  BCH = 'BCH',
  /** Legacy, use "BinanceChain" instead */
  BNB = 'BNB',
  /** Legacy, use "BinanceSmartChain" instead */
  BSC = 'BSC',
  /** Legacy, use "Bitcoin" instead */
  BTC = 'BTC',
  Band = 'Band',
  BinanceChain = 'BinanceChain',
  BinanceChainTestnet = 'BinanceChainTestnet',
  BinanceSmartChain = 'BinanceSmartChain',
  BinanceSmartChainTestnet = 'BinanceSmartChainTestnet',
  Bitcanna = 'Bitcanna',
  Bitcoin = 'Bitcoin',
  BitcoinCash = 'BitcoinCash',
  BitcoinCashTestnet = 'BitcoinCashTestnet',
  BitcoinTestnet = 'BitcoinTestnet',
  Bitsong = 'Bitsong',
  /** Legacy, use "Cosmos" instead */
  COSMOS = 'COSMOS',
  Canto = 'Canto',
  CantoEVM = 'CantoEVM',
  Celo = 'Celo',
  Cerberus = 'Cerberus',
  Chihuahua = 'Chihuahua',
  Comdex = 'Comdex',
  Cosmos = 'Cosmos',
  Crescent = 'Crescent',
  Cronos = 'Cronos',
  CronosEVM = 'CronosEVM',
  Cudos = 'Cudos',
  /** Legacy, use "Dogecoin" instead */
  DOGE = 'DOGE',
  Desmos = 'Desmos',
  Dogecoin = 'Dogecoin',
  /** Legacy, use "Ethereum" instead */
  ETH = 'ETH',
  Emoney = 'Emoney',
  Ethereum = 'Ethereum',
  Evmos = 'Evmos',
  /** Legacy, use "Fantom" instead */
  FTM = 'FTM',
  Fantom = 'Fantom',
  FetchAI = 'FetchAI',
  Gnosis = 'Gnosis',
  GravityBridge = 'GravityBridge',
  Harmony = 'Harmony',
  HuobiECOChain = 'HuobiECOChain',
  Injective = 'Injective',
  Iris = 'Iris',
  Ixo = 'Ixo',
  JUNO = 'JUNO',
  Kava = 'Kava',
  KiChain = 'KiChain',
  Klaytn = 'Klaytn',
  Konstellation = 'Konstellation',
  Kujira = 'Kujira',
  /** Legacy, use "Litecoin" instead */
  LTC = 'LTC',
  LikeCoin = 'LikeCoin',
  Litecoin = 'Litecoin',
  LitecoinTestnet = 'LitecoinTestnet',
  Lum = 'Lum',
  MarsProtocol = 'MarsProtocol',
  Medibloc = 'Medibloc',
  Mumbai = 'Mumbai',
  /** Legacy, use "Near" instead */
  NEAR = 'NEAR',
  Near = 'Near',
  OKExChain = 'OKExChain',
  /** Legacy, use "Osmosis" instead */
  OSMOSIS = 'OSMOSIS',
  Oasis = 'Oasis',
  Optimism = 'Optimism',
  Osmosis = 'Osmosis',
  /** Legacy, use "Polygon" instead */
  POLYGON = 'POLYGON',
  Persistence = 'Persistence',
  Polygon = 'Polygon',
  Provenance = 'Provenance',
  Regen = 'Regen',
  Rizon = 'Rizon',
  Ropsten = 'Ropsten',
  /** Legacy, use "Solana" instead */
  SOL = 'SOL',
  Secret = 'Secret',
  Sei = 'Sei',
  SeiTestnet = 'SeiTestnet',
  Sentinel = 'Sentinel',
  Shentu = 'Shentu',
  Sifchain = 'Sifchain',
  Solana = 'Solana',
  Sommelier = 'Sommelier',
  Stargaze = 'Stargaze',
  Starname = 'Starname',
  Stride = 'Stride',
  /** Legacy, use "TerraClassic" instead */
  TERRA = 'TERRA',
  /** Legacy, use "THORChain" instead */
  THOR = 'THOR',
  THORChain = 'THORChain',
  THORChainTestnet = 'THORChainTestnet',
  Terra = 'Terra',
  TerraClassic = 'TerraClassic',
  TomoChain = 'TomoChain',
  Tron = 'Tron',
  Umee = 'Umee',
  xDAI = 'xDAI',
  zkSync = 'zkSync',
}

export type AddressRouteCheckTypeV2 = {
  __typename?: 'AddressRouteCheckTypeV2';
  address: Scalars['String'];
  chain: Scalars['String'];
  isValid: Scalars['Boolean'];
};

export type AddressRouteInputType = {
  address: Scalars['String'];
  chain: Scalars['String'];
};

export type AddressRouteInputTypeV2 = {
  address: Scalars['String'];
  chain: Scalars['String'];
};

export type AddressRouteType = {
  __typename?: 'AddressRouteType';
  address: Scalars['String'];
  chain: Scalars['String'];
};

export type AddressRouteTypeV2 = {
  __typename?: 'AddressRouteTypeV2';
  address: Scalars['String'];
  chain: Scalars['String'];
};

export type AddressType = {
  __typename?: 'AddressType';
  address?: Maybe<Scalars['String']>;
  chain: ChainType;
};

export type Amount = {
  __typename?: 'Amount';
  scalingFactor: Scalars['Int'];
  value: Scalars['String'];
};

export type AmountInputType = {
  amount: Scalars['String'];
  scalingFactor: Scalars['Float'];
};

export type AmountType = {
  __typename?: 'AmountType';
  amount: Scalars['String'];
  scalingFactor: Scalars['Float'];
};

export type Arbitrum = {
  __typename?: 'Arbitrum';
  balances: Array<Balance>;
  dailyBalances: Array<DailyBalances>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: Array<EvmTransaction>;
  version: Array<Version>;
};

export type ArbitrumBalancesArgs = {
  address: Scalars['String'];
};

export type ArbitrumDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: InputMaybe<OptDateRange>;
};

export type ArbitrumLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type ArbitrumNftsArgs = {
  address: Scalars['String'];
};

export type ArbitrumTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
};

export type Asset = {
  __typename?: 'Asset';
  address?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isERC721?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** Currency price */
export type AssetAmountType = {
  __typename?: 'AssetAmountType';
  /** Currency allTimeHigh */
  allTimeHigh?: Maybe<Scalars['String']>;
  /** Currency allTimeLow */
  allTimeLow?: Maybe<Scalars['String']>;
  /** Currency price amount */
  amount: Scalars['String'];
  /** Currency dailyHigh */
  dailyHigh?: Maybe<Scalars['String']>;
  /** Currency dailyLow */
  dailyLow?: Maybe<Scalars['String']>;
  /** Currency dayPriceChange */
  dayPriceChange?: Maybe<Scalars['String']>;
  /** Currency fdv */
  fdv?: Maybe<Scalars['String']>;
  /** Currency marketCapRank */
  marketCapRank?: Maybe<Scalars['String']>;
  /** Currency monthPriceChange */
  monthPriceChange?: Maybe<Scalars['String']>;
  /** The scaling factor is needed to convert the amount of payment to the currency */
  scalingFactor: Scalars['Float'];
  /** Current sparkline */
  sparkline: Array<Scalars['Float']>;
  /** Currency weekPriceChange */
  weekPriceChange?: Maybe<Scalars['String']>;
  /** Currency yearPriceChange */
  yearPriceChange?: Maybe<Scalars['String']>;
};

export type AssetBaseType = {
  /** Icon URL */
  icon?: Maybe<Scalars['String']>;
  /** Unique identifier in the database */
  id: Scalars['ID'];
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
};

export type AssetCompositeTokenType = AssetBaseType & {
  __typename?: 'AssetCompositeTokenType';
  address?: Maybe<Scalars['String']>;
  chain?: Maybe<Scalars['String']>;
  contract?: Maybe<AssetTokenContractType>;
  /** Chain fee */
  fee: AssetFeeType;
  /** Icon URL */
  icon?: Maybe<Scalars['String']>;
  /** Unique identifier in the database */
  id: Scalars['ID'];
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  protocol?: Maybe<AssetDefiProtocolType>;
  scalingFactor?: Maybe<Scalars['Float']>;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
};

export type AssetCompositeTokenTypeConnection = {
  __typename?: 'AssetCompositeTokenTypeConnection';
  edges?: Maybe<Array<AssetCompositeTokenTypeEdge>>;
  pageInfo?: Maybe<AssetCompositeTokenTypePageInfo>;
};

export type AssetCompositeTokenTypeEdge = {
  __typename?: 'AssetCompositeTokenTypeEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<AssetCompositeTokenType>;
};

export type AssetCompositeTokenTypePageInfo = {
  __typename?: 'AssetCompositeTokenTypePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type AssetCryptoCurrencyType = AssetBaseType & {
  __typename?: 'AssetCryptoCurrencyType';
  chain: Scalars['String'];
  fee?: Maybe<AssetFeeType>;
  /** Icon URL */
  icon?: Maybe<Scalars['String']>;
  /** Unique identifier in the database */
  id: Scalars['ID'];
  /** Market capitalization is total value of a publicly traded company's outstanding common shares owned by stockholders */
  marketCap?: Maybe<Scalars['Float']>;
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  priceHistory: Array<Array<Scalars['Float']>>;
  scalingFactor?: Maybe<Scalars['Float']>;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
};

export type AssetCryptoCurrencyTypeConnection = {
  __typename?: 'AssetCryptoCurrencyTypeConnection';
  edges?: Maybe<Array<AssetCryptoCurrencyTypeEdge>>;
  pageInfo?: Maybe<AssetCryptoCurrencyTypePageInfo>;
};

export type AssetCryptoCurrencyTypeEdge = {
  __typename?: 'AssetCryptoCurrencyTypeEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<AssetCryptoCurrencyType>;
};

export type AssetCryptoCurrencyTypePageInfo = {
  __typename?: 'AssetCryptoCurrencyTypePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type AssetDefiProtocolType = {
  __typename?: 'AssetDefiProtocolType';
  icon: Scalars['String'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

/** Fee is a cryptocurrency transaction fee that is charged to users when performing crypto transactions */
export type AssetFeeType = {
  __typename?: 'AssetFeeType';
  /** The scaling factor is needed to convert the amount of payment (value field) to the currency */
  scalingFactor?: Maybe<Scalars['Float']>;
  /** Payment amount */
  value?: Maybe<Scalars['String']>;
};

export type AssetFiatCurrencyType = PickObjectType & {
  __typename?: 'AssetFiatCurrencyType';
  character?: Maybe<Scalars['String']>;
  /** Unique identifier in the database */
  id: Scalars['ID'];
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  scalingFactor?: Maybe<Scalars['Float']>;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
};

export type AssetFiatCurrencyTypeConnection = {
  __typename?: 'AssetFiatCurrencyTypeConnection';
  edges?: Maybe<Array<AssetFiatCurrencyTypeEdge>>;
  pageInfo?: Maybe<AssetFiatCurrencyTypePageInfo>;
};

export type AssetFiatCurrencyTypeEdge = {
  __typename?: 'AssetFiatCurrencyTypeEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<AssetFiatCurrencyType>;
};

export type AssetFiatCurrencyTypePageInfo = {
  __typename?: 'AssetFiatCurrencyTypePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type AssetTokenContractType = {
  __typename?: 'AssetTokenContractType';
  address: Scalars['String'];
  /** Address chain name */
  chain: Scalars['String'];
  /** Chain fee */
  fee: AssetFeeType;
  /** The scaling factor is needed to convert contract to token price */
  scalingFactor: Scalars['Float'];
  /** The symbol that identifies token */
  symbol: Scalars['String'];
};

export type AssetTokenType = AssetBaseType & {
  __typename?: 'AssetTokenType';
  /** Currency market cap */
  contracts?: Maybe<Array<AssetTokenContractType>>;
  /** Icon URL */
  icon?: Maybe<Scalars['String']>;
  /** Unique identifier in the database */
  id: Scalars['ID'];
  /** Market capitalization is total value of a publicly traded company's outstanding common shares owned by stockholders */
  marketCap?: Maybe<Scalars['Float']>;
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  priceHistory: Array<Array<Scalars['Float']>>;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
};

export type AssetTokenTypeConnection = {
  __typename?: 'AssetTokenTypeConnection';
  edges?: Maybe<Array<AssetTokenTypeEdge>>;
  pageInfo?: Maybe<AssetTokenTypePageInfo>;
};

export type AssetTokenTypeEdge = {
  __typename?: 'AssetTokenTypeEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<AssetTokenType>;
};

export type AssetTokenTypePageInfo = {
  __typename?: 'AssetTokenTypePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type AssetTransfer = {
  __typename?: 'AssetTransfer';
  amount: Amount;
  asset: CryptoAsset;
  fromAddress?: Maybe<Scalars['String']>;
  toAddress?: Maybe<Scalars['String']>;
};

export type AssetType = {
  __typename?: 'AssetType';
  /** Scaling factor for market cap */
  compositeTokens?: Maybe<CompositeTokenResponse>;
  /** Scaling factor for market cap */
  cryptoCurrencies?: Maybe<CryptoCurrencyResponse>;
  /** Scaling factor for market cap */
  fiatCurrencies?: Maybe<FiatCurrencyResponse>;
  /** Scaling factor for market cap */
  tokens?: Maybe<TokenResponse>;
};

export type AssetTypeCompositeTokensArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  afterPrice?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<CompositeTokenFilter>;
  page: ConnectionArgs;
};

export type AssetTypeCryptoCurrenciesArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  afterPrice?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<CryptoCurrencyFilter>;
  page: ConnectionArgs;
};

export type AssetTypeFiatCurrenciesArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  afterPrice?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<FiatCurrencyFilter>;
  page: ConnectionArgs;
};

export type AssetTypeTokensArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  afterPrice?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<TokenFilter>;
  page: ConnectionArgs;
};

export type AssetWithAmount = {
  __typename?: 'AssetWithAmount';
  amount: Amount;
  asset: CryptoAsset;
};

export type Aurora = {
  __typename?: 'Aurora';
  balances: Array<Balance>;
  dailyBalances: Array<DailyBalances>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: Array<EvmTransaction>;
  version: Array<Version>;
};

export type AuroraBalancesArgs = {
  address: Scalars['String'];
};

export type AuroraDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: InputMaybe<OptDateRange>;
};

export type AuroraLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type AuroraNftsArgs = {
  address: Scalars['String'];
};

export type AuroraTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
};

export type Auth = {
  __typename?: 'Auth';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type Avalanche = {
  __typename?: 'Avalanche';
  balances: Array<Balance>;
  dailyBalances: Array<DailyBalances>;
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: Array<EvmTransaction>;
  version: Array<Version>;
};

export type AvalancheBalancesArgs = {
  address: Scalars['String'];
};

export type AvalancheDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: InputMaybe<OptDateRange>;
};

export type AvalancheLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type AvalancheNftsArgs = {
  address: Scalars['String'];
};

export type AvalancheTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
};

export type Balance = {
  __typename?: 'Balance';
  address: Scalars['String'];
  amount: Amount;
  asset: CryptoAsset;
};

export type Binance = {
  __typename?: 'Binance';
  balances: Array<Balance>;
  fee?: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  status: BinanceStatus;
  transactions: BinanceTransactionConnection;
};

export type BinanceBalancesArgs = {
  address: Scalars['String'];
};

export type BinanceTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: InputMaybe<OptBlockSelector>;
  dateRange?: InputMaybe<OptDateSelector>;
  pagination?: InputMaybe<CursorPagination>;
};

export type BinanceSmartChain = {
  __typename?: 'BinanceSmartChain';
  balances: Array<Balance>;
  dailyBalances: Array<DailyBalances>;
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: Array<EvmTransaction>;
  version: Array<Version>;
};

export type BinanceSmartChainBalancesArgs = {
  address: Scalars['String'];
};

export type BinanceSmartChainDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: InputMaybe<OptDateRange>;
};

export type BinanceSmartChainLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type BinanceSmartChainNftsArgs = {
  address: Scalars['String'];
};

export type BinanceSmartChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
};

export type BinanceStatus = {
  __typename?: 'BinanceStatus';
  lastBlock?: Maybe<LastBlock>;
};

export type BinanceTransaction = {
  __typename?: 'BinanceTransaction';
  amount?: Maybe<Amount>;
  asset?: Maybe<CryptoAsset>;
  blockHeight: Scalars['Int'];
  data?: Maybe<Scalars['JSON']>;
  fee: Amount;
  fromAddress: Scalars['String'];
  hash: Scalars['String'];
  status: Scalars['String'];
  time: Scalars['DateTime'];
  toAddress?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type BinanceTransactionConnection = {
  __typename?: 'BinanceTransactionConnection';
  edges: Array<BinanceTransactionEdge>;
  pageInfo: PageInfo;
};

export type BinanceTransactionEdge = {
  __typename?: 'BinanceTransactionEdge';
  cursor: Scalars['String'];
  node: BinanceTransaction;
};

export type BitcoinChain = {
  __typename?: 'BitcoinChain';
  balances: Array<Balance>;
  buildRawTransaction: Scalars['String'];
  dailyBalances: DailyBalances;
  decodeRawTransaction: Scalars['String'];
  getTransactionByHash: UtxoTransactionByHash;
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
  sendRawTransaction: Scalars['String'];
  status: Status;
  transactions: UtxoTransactionConnection;
  unspentTxs: UnspentTransactionOutputConnection;
};

export type BitcoinChainBalancesArgs = {
  address: Scalars['String'];
};

export type BitcoinChainBuildRawTransactionArgs = {
  inputs?: Array<CreateRawTransactionInput>;
  outputs?: Array<CreateRawTransactionOutput>;
};

export type BitcoinChainDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: OptDateRange;
};

export type BitcoinChainDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoinChainGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type BitcoinChainLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type BitcoinChainSendRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoinChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pagination?: CursorPagination;
};

export type BitcoinChainUnspentTxsArgs = {
  address: Scalars['String'];
  pagination?: CursorPagination;
};

export type BitcoincashChain = {
  __typename?: 'BitcoincashChain';
  balances: Array<Balance>;
  buildRawTransaction: Scalars['String'];
  dailyBalances: DailyBalances;
  decodeRawTransaction: Scalars['String'];
  getTransactionByHash: UtxoTransactionByHash;
  name: Scalars['String'];
  sendRawTransaction: Scalars['String'];
  status: Status;
  transactions: UtxoTransactionConnection;
  unspentTxs: UnspentTransactionOutputConnection;
};

export type BitcoincashChainBalancesArgs = {
  address: Scalars['String'];
};

export type BitcoincashChainBuildRawTransactionArgs = {
  inputs?: Array<CreateRawTransactionInput>;
  outputs?: Array<CreateRawTransactionOutput>;
};

export type BitcoincashChainDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: OptDateRange;
};

export type BitcoincashChainDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoincashChainGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type BitcoincashChainSendRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoincashChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pagination?: CursorPagination;
};

export type BitcoincashChainUnspentTxsArgs = {
  address: Scalars['String'];
  pagination?: CursorPagination;
};

/** A (half-open) range selector for block */
export type BlockRange = {
  /** The lower bound of the range (inclusive). */
  from: Scalars['Int'];
  /** The upper bound of the range (inclusive). */
  to: Scalars['Int'];
};

export type BridgeTokenInput = {
  address: Scalars['String'];
  name: Scalars['String'];
};

export enum CacheControlScope {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export type CantoEvm = {
  __typename?: 'CantoEvm';
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
};

export type CantoEvmLegacyNfTsArgs = {
  address: Scalars['String'];
};

export enum Chain {
  ARBITRUM = 'ARBITRUM',
  AVALANCHE = 'AVALANCHE',
  BINANCE_SMART_CHAIN = 'BINANCE_SMART_CHAIN',
  ETHEREUM = 'ETHEREUM',
  FANTOM = 'FANTOM',
  HARMONY = 'HARMONY',
  OPTIMISM = 'OPTIMISM',
  POLYGON = 'POLYGON',
}

export type ChainType = {
  __typename?: 'ChainType';
  fee: FeeType;
  name: Scalars['String'];
};

export type ClaimStatus = {
  __typename?: 'ClaimStatus';
  amountUsd: Scalars['Float'];
  claimId: Scalars['String'];
  status: Scalars['String'];
};

export type CompositeTokenFilter = {
  chains?: InputMaybe<Array<AddressChain>>;
  ids?: InputMaybe<Array<Scalars['String']>>;
};

export type CompositeTokenResponse = {
  __typename?: 'CompositeTokenResponse';
  page: AssetCompositeTokenTypeConnection;
  pageData?: Maybe<PageDataType>;
};

export type CompositeTokenType = {
  __typename?: 'CompositeTokenType';
  address?: Maybe<AddressType>;
  icon?: Maybe<ImageType>;
  id: Scalars['ID'];
  name: Scalars['String'];
  price?: Maybe<AmountType>;
  protocol: DefiProtocolType;
  symbol: Scalars['String'];
  token?: Maybe<TokenType>;
};

/** Pagination options. Requires first or last */
export type ConnectionArgs = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Float']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Float']>;
};

export type CosmosBasedChain = {
  __typename?: 'CosmosBasedChain';
  balances: Array<Balance>;
  name: Scalars['String'];
  status: Status;
  transactions: CosmosLikeTransactionConnection;
  version: Array<Version>;
};

export type CosmosBasedChainBalancesArgs = {
  address: Scalars['String'];
};

export type CosmosBasedChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  pagination?: CursorPagination;
};

export type CosmosBasedChainV2 = {
  __typename?: 'CosmosBasedChainV2';
  balances: Array<Balance>;
  name: Scalars['String'];
  status: Status;
  transactions: CosmosLikeTransactionConnection;
  version: Array<Version>;
};

export type CosmosBasedChainV2BalancesArgs = {
  address: Scalars['String'];
};

export type CosmosBasedChainV2TransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  pagination?: CursorPagination;
};

export type CosmosBasedChainWithNft = {
  __typename?: 'CosmosBasedChainWithNft';
  balances: Array<Balance>;
  name: Scalars['String'];
  nfts: Array<Nft>;
  status: Status;
  transactions: CosmosLikeTransactionConnection;
  version: Array<Version>;
};

export type CosmosBasedChainWithNftBalancesArgs = {
  address: Scalars['String'];
};

export type CosmosBasedChainWithNftNftsArgs = {
  address: Scalars['String'];
};

export type CosmosBasedChainWithNftTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  pagination?: CursorPagination;
};

export type CosmosFee = {
  __typename?: 'CosmosFee';
  amount: Array<AssetWithAmount>;
  payer?: Maybe<Scalars['String']>;
};

export type CosmosLikeTransaction = {
  __typename?: 'CosmosLikeTransaction';
  blockHeight: Scalars['Int'];
  blockIndex?: Maybe<Scalars['Int']>;
  fee?: Maybe<CosmosFee>;
  hash: Scalars['String'];
  signers: Array<Scalars['String']>;
  status: Scalars['String'];
  timestamp: Scalars['NaiveDateTime'];
  transfers: Array<AssetTransfer>;
};

export type CosmosLikeTransactionConnection = {
  __typename?: 'CosmosLikeTransactionConnection';
  /** A list of edges. */
  edges: Array<CosmosLikeTransactionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CosmosLikeTransactionEdge = {
  __typename?: 'CosmosLikeTransactionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: CosmosLikeTransaction;
};

export type CreateRawTransactionInput = {
  sequence?: InputMaybe<Scalars['Int']>;
  txid: Scalars['String'];
  vout: Scalars['Int'];
};

export type CreateRawTransactionOutput = {
  address: Scalars['String'];
  amount: Scalars['Float'];
};

export type CronosEvm = {
  __typename?: 'CronosEVM';
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
};

export type CronosEvmLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type CryptoAsset = {
  __typename?: 'CryptoAsset';
  /** supported list of chain are in [`Chain`] enum */
  chain?: Maybe<Scalars['String']>;
  /** ID of token (contract address in most chain) */
  contract?: Maybe<Scalars['String']>;
  /** Unique asset identifier */
  id?: Maybe<Scalars['ID']>;
  /** Asset image */
  image?: Maybe<Scalars['String']>;
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  /** The symbol that identifies token */
  symbol?: Maybe<Scalars['String']>;
};

export type CryptoAssetInput = {
  /** Chain name */
  chain?: InputMaybe<Scalars['String']>;
  /** Crypto currency address */
  contract?: InputMaybe<Scalars['String']>;
  /** Unique asset identifier */
  id?: InputMaybe<Scalars['ID']>;
  /** Asset image */
  image?: InputMaybe<Scalars['String']>;
  /** Known name that identifies token */
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<AmountInputType>;
  /** The symbol that identifies token */
  symbol?: InputMaybe<Scalars['String']>;
};

export type CryptoAssetInputV2 = {
  chain?: InputMaybe<Scalars['String']>;
  contract?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<PriceInputV2>;
  symbol?: InputMaybe<Scalars['String']>;
};

export type CryptoCurrencyFilter = {
  chains?: InputMaybe<Array<AddressChain>>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  symbols?: InputMaybe<Array<Scalars['String']>>;
};

export type CryptoCurrencyResponse = {
  __typename?: 'CryptoCurrencyResponse';
  page: AssetCryptoCurrencyTypeConnection;
  pageData?: Maybe<PageDataType>;
};

export type CryptoCurrencyType = {
  __typename?: 'CryptoCurrencyType';
  chain?: Maybe<ChainType>;
  icon?: Maybe<ImageType>;
  id: Scalars['ID'];
  name: Scalars['String'];
  price?: Maybe<AmountType>;
  /** @deprecated Use scalingFactor of price field */
  scalingFactor: Scalars['Float'];
  symbol: Scalars['String'];
};

export type CursorPagination = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type DailyAmount = {
  __typename?: 'DailyAmount';
  amount: Amount;
  /** The amount is valid at the end of day (Meaning 23:59 UTC). */
  day: Scalars['Date'];
};

export type DailyBalances = {
  __typename?: 'DailyBalances';
  address: Scalars['String'];
  /**
   * It is an expectation to provide intermediate daily amounts
   * backfilling from 0 or previous value
   */
  amounts: Array<DailyAmount>;
  asset: CryptoAsset;
};

/** A (half-open) range selector for date */
export type DateRange = {
  /** The lower bound of the range (inclusive). */
  from: Scalars['DateTime'];
  /** The upper bound of the range (inclusive). */
  to: Scalars['DateTime'];
};

/** Fee is a cryptocurrency transaction fees that is charged to users when performing crypto transactions */
export type DefaultGasFee = {
  __typename?: 'DefaultGasFee';
  high?: Maybe<Scalars['Float']>;
  low?: Maybe<Scalars['Float']>;
  medium?: Maybe<Scalars['Float']>;
};

export type DefiProtocolType = {
  __typename?: 'DefiProtocolType';
  icon: ImageType;
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type DogeChain = {
  __typename?: 'DogeChain';
  balances: Array<Balance>;
  buildRawTransaction: Scalars['String'];
  dailyBalances: DailyBalances;
  decodeRawTransaction: Scalars['String'];
  getTransactionByHash: UtxoTransactionByHash;
  name: Scalars['String'];
  sendRawTransaction: Scalars['String'];
  status: Status;
  transactions: UtxoTransactionConnection;
  unspentTxs: UnspentTransactionOutputConnection;
};

export type DogeChainBalancesArgs = {
  address: Scalars['String'];
};

export type DogeChainBuildRawTransactionArgs = {
  inputs?: Array<CreateRawTransactionInput>;
  outputs?: Array<CreateRawTransactionOutput>;
};

export type DogeChainDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: OptDateRange;
};

export type DogeChainDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type DogeChainGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type DogeChainSendRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type DogeChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pagination?: CursorPagination;
};

export type DogeChainUnspentTxsArgs = {
  address: Scalars['String'];
  pagination?: CursorPagination;
};

export type Eip1559Fee = {
  __typename?: 'EIP1559Fee';
  baseFeePerGas: Scalars['Float'];
  maxFeePerGas: Scalars['Float'];
  priorityFeePerGas: Scalars['Float'];
};

/** Fee is a cryptocurrency transaction fees that is charged to users when performing crypto transactions */
export type Eip1559GasFee = {
  __typename?: 'EIP1559GasFee';
  high?: Maybe<Eip1559Fee>;
  low?: Maybe<Eip1559Fee>;
  medium?: Maybe<Eip1559Fee>;
};

export type EvmTransaction = {
  __typename?: 'EVMTransaction';
  fee: Scalars['JSON'];
  fromAddress: Scalars['String'];
  hash: Scalars['String'];
  inputData: Scalars['String'];
  logs: Array<EvmTransactionLog>;
  rawData: Scalars['String'];
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
  toAddress: Scalars['String'];
  transfers: Array<AssetTransfer>;
};

export type EvmTransactionLog = {
  __typename?: 'EVMTransactionLog';
  data?: Maybe<Scalars['String']>;
  topic0?: Maybe<Scalars['String']>;
  topic1?: Maybe<Scalars['String']>;
  topic2?: Maybe<Scalars['String']>;
  topic3?: Maybe<Scalars['String']>;
};

export type Ethereum = {
  __typename?: 'Ethereum';
  balances: Array<Balance>;
  dailyBalances: Array<DailyBalances>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: Array<EvmTransaction>;
  version: Array<Version>;
};

export type EthereumBalancesArgs = {
  address: Scalars['String'];
};

export type EthereumDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: InputMaybe<OptDateRange>;
};

export type EthereumLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type EthereumNftsArgs = {
  address: Scalars['String'];
};

export type EthereumTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
};

export type ExplainedTransaction = {
  __typename?: 'ExplainedTransaction';
  args: Array<TransactionCallArg>;
  asset: Array<Asset>;
  confidence: Scalars['Float'];
  type: TransactionType;
};

export type Fantom = {
  __typename?: 'Fantom';
  balances: Array<Balance>;
  dailyBalances: Array<DailyBalances>;
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: Array<EvmTransaction>;
  version: Array<Version>;
};

export type FantomBalancesArgs = {
  address: Scalars['String'];
};

export type FantomDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: InputMaybe<OptDateRange>;
};

export type FantomLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type FantomNftsArgs = {
  address: Scalars['String'];
};

export type FantomTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
};

export type Fee = {
  __typename?: 'Fee';
  amount: Amount;
  payer: Scalars['String'];
};

export type FeeInputType = {
  feeRateTransaction: Scalars['Float'];
  inboundFeeAsset: Scalars['Float'];
  inboundFeeDollar: Scalars['Float'];
  networkFeeAsset: Scalars['Float'];
  networkFeeDollar: Scalars['Float'];
  swapFee: Scalars['Float'];
};

export type FeeType = {
  __typename?: 'FeeType';
  scalingFactor?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['String']>;
};

export type FiatCurrencyFilter = {
  ids?: InputMaybe<Array<Scalars['String']>>;
};

export type FiatCurrencyResponse = {
  __typename?: 'FiatCurrencyResponse';
  page: AssetFiatCurrencyTypeConnection;
  pageData?: Maybe<PageDataType>;
};

export type FiatCurrencyType = {
  __typename?: 'FiatCurrencyType';
  icon?: Maybe<ImageType>;
  id: Scalars['ID'];
  name: Scalars['String'];
  price?: Maybe<AmountType>;
  /** @deprecated Use scalingFactor of price field */
  scalingFactor: Scalars['Float'];
  symbol: Scalars['String'];
};

export type FilterArgs = {
  chains?: InputMaybe<Array<Chain>>;
  pool?: InputMaybe<Pool>;
};

export type GetTokensArgs = {
  address?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  symbols?: InputMaybe<Array<Scalars['String']>>;
};

export type ImageType = {
  __typename?: 'ImageType';
  data: Scalars['String'];
  format: Scalars['String'];
};

export type Input = {
  __typename?: 'Input';
  address: Scalars['String'];
  amount: Amount;
};

export type InvestingType = {
  __typename?: 'InvestingType';
  pools: Array<PoolType>;
};

export type InvestingTypePoolsArgs = {
  filter?: InputMaybe<FilterArgs>;
};

export type JunoChain = {
  __typename?: 'JunoChain';
  balances: Array<Balance>;
  name: Scalars['String'];
  nfts: Array<Nft>;
  status: Status;
  transactions: CosmosLikeTransactionConnection;
  version: Array<Version>;
};

export type JunoChainBalancesArgs = {
  address: Scalars['String'];
};

export type JunoChainNftsArgs = {
  address: Scalars['String'];
};

export type JunoChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  pagination?: CursorPagination;
};

export type LastBlock = {
  __typename?: 'LastBlock';
  hash: Scalars['String'];
  height: Scalars['Int'];
  nodeName: Scalars['String'];
  prevHash: Scalars['String'];
  time: Scalars['DateTime'];
  txCount: Scalars['Int'];
};

export type LastSlotStatus = {
  __typename?: 'LastSlotStatus';
  blockHeight?: Maybe<Scalars['Int']>;
  blockTime?: Maybe<Scalars['DateTime']>;
  blockhash?: Maybe<Scalars['String']>;
  slot: Scalars['Int'];
  status: Scalars['String'];
  updatedOn: Scalars['DateTime'];
};

export type LitecoinChain = {
  __typename?: 'LitecoinChain';
  balances: Array<Balance>;
  buildRawTransaction: Scalars['String'];
  dailyBalances: DailyBalances;
  decodeRawTransaction: Scalars['String'];
  getTransactionByHash: UtxoTransactionByHash;
  name: Scalars['String'];
  sendRawTransaction: Scalars['String'];
  status: Status;
  transactions: UtxoTransactionConnection;
  unspentTxs: UnspentTransactionOutputConnection;
};

export type LitecoinChainBalancesArgs = {
  address: Scalars['String'];
};

export type LitecoinChainBuildRawTransactionArgs = {
  inputs?: Array<CreateRawTransactionInput>;
  outputs?: Array<CreateRawTransactionOutput>;
};

export type LitecoinChainDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: OptDateRange;
};

export type LitecoinChainDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type LitecoinChainGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type LitecoinChainSendRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type LitecoinChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pagination?: CursorPagination;
};

export type LitecoinChainUnspentTxsArgs = {
  address: Scalars['String'];
  pagination?: CursorPagination;
};

export enum LoginChain {
  BITCOIN = 'BITCOIN',
  ETHEREUM = 'ETHEREUM',
}

export type Media = {
  __typename?: 'Media';
  type?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type MediaV2 = {
  __typename?: 'MediaV2';
  /** contains blurhash value of the media (if media type supports it) */
  blurHash?: Maybe<Scalars['String']>;
  /**
   * represents actual content type by peeking into content referenced by media URL
   * format as described in: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types>
   * i.e. image/png if url points to PNG image
   */
  contentType?: Maybe<Scalars['String']>;
  /**
   * "type" field describes "source" of media URL from metadata.json
   * if URL is taken from "image" or "image_url" fields - type will have image value
   * if URL is taken from "animated_url" field - type will be animated
   */
  type: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: ReputationComment;
  addUserAddress: User;
  claimFees?: Maybe<ClaimStatus>;
  /** @deprecated Use upsertReferrer instead */
  createReferrer?: Maybe<Referrer>;
  createUser: Auth;
  loginWithPassword: Auth;
  loginWithSignature: Auth;
  refreshAccessToken: Auth;
  transactionHashV2: Scalars['String'];
  transactions: Array<RouteTransactionType>;
  transactionsV2: PostRouteTypeV2;
  transactonHash: Scalars['String'];
  updateUserSettings: User;
  /** Create or update a referrer. If id is provided, the referrer will be updated. Otherwise, a new referrer will be created. */
  upsertReferrer?: Maybe<Referrer>;
};

export type MutationAddCommentArgs = {
  address: Scalars['String'];
  comment: Scalars['String'];
  source: Scalars['String'];
};

export type MutationAddUserAddressArgs = {
  address: Scalars['String'];
  chain: LoginChain;
  signature: Scalars['String'];
};

export type MutationCreateReferrerArgs = {
  feeTier: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  referrerAddress: Scalars['String'];
  referrerLink: Scalars['String'];
  referrerName?: InputMaybe<Scalars['String']>;
};

export type MutationCreateUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationLoginWithPasswordArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationLoginWithSignatureArgs = {
  chain: LoginChain;
  signature: Scalars['String'];
  username: Scalars['String'];
};

export type MutationRefreshAccessTokenArgs = {
  token: Scalars['String'];
};

export type MutationTransactionHashV2Args = {
  routeId: Scalars['String'];
  tradeId: Scalars['String'];
  transactionHash: Scalars['String'];
};

export type MutationTransactionsArgs = {
  routeData: RouteTransactionInputType;
};

export type MutationTransactionsV2Args = {
  routeData: RouteInputTypeV2;
};

export type MutationTransactonHashArgs = {
  routeId: Scalars['String'];
  signedHash: Scalars['String'];
  tradeId: Scalars['Float'];
};

export type MutationUpdateUserSettingsArgs = {
  input: UserSettingsInput;
};

export type MutationUpsertReferrerArgs = {
  feeTier: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  referrerAddress: Scalars['String'];
  referrerLink: Scalars['String'];
  referrerName?: InputMaybe<Scalars['String']>;
};

export type Nft = {
  __typename?: 'NFT';
  balance: Amount;
  collection?: Maybe<NftCollection>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastSale?: Maybe<NftLastSale>;
  media: Array<Media>;
  name: Scalars['String'];
  symbol: Scalars['String'];
};

/** attributes data from opensea spec <https://docs.opensea.io/docs/metadata-standards> */
export type NftAttribute = {
  __typename?: 'NFTAttribute';
  displayType?: Maybe<Scalars['String']>;
  traitType: Scalars['String'];
  /** according to opensea spec this can be string or number or float number */
  value: Scalars['JSON'];
};

export type NftCollection = {
  __typename?: 'NFTCollection';
  address: Scalars['String'];
  media?: Maybe<Media>;
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type NftCollectionV2 = {
  __typename?: 'NFTCollectionV2';
  address: Scalars['String'];
  media?: Maybe<MediaV2>;
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type NftLastSale = {
  __typename?: 'NFTLastSale';
  cryptoPrice: Amount;
  fiatPrice: Amount;
  quantity: Amount;
};

export type NfTv2 = {
  __typename?: 'NFTv2';
  attributes: Array<NftAttribute>;
  balance: Amount;
  collection?: Maybe<NftCollectionV2>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastSale?: Maybe<NftLastSale>;
  media: Array<MediaV2>;
  name: Scalars['String'];
  owner: Scalars['String'];
  symbol: Scalars['String'];
};

export type NearChain = {
  __typename?: 'NearChain';
  balances: Array<Balance>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: Array<NearTransaction>;
  version: Array<Version>;
};

export type NearChainBalancesArgs = {
  address: Scalars['String'];
};

export type NearChainNftsArgs = {
  address: Scalars['String'];
};

export type NearChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
};

export type NearTransaction = {
  __typename?: 'NearTransaction';
  fee?: Maybe<Scalars['JSON']>;
  fromAddress: Scalars['String'];
  hash: Scalars['String'];
  inputData?: Maybe<Scalars['JSON']>;
  logs?: Maybe<Scalars['JSON']>;
  raw?: Maybe<Scalars['JSON']>;
  status: Scalars['String'];
  timestamp: Scalars['Int'];
  toAddress: Scalars['String'];
  transfers: Array<AssetTransfer>;
  type: Scalars['String'];
};

/** A both end inclusive range selector for block */
export type OptBlockRange = {
  /** The lower bound of the range (inclusive). */
  from?: InputMaybe<Scalars['Int']>;
  /** The upper bound of the range (inclusive). */
  to?: InputMaybe<Scalars['Int']>;
};

export type OptBlockSelector = {
  from?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<Scalars['Int']>;
};

/** A both end inclusive range selector for date */
export type OptDateRange = {
  /** The optional lower bound of the range (inclusive). */
  from?: InputMaybe<Scalars['DateTime']>;
  /** The optional upper bound of the range (inclusive). */
  to?: InputMaybe<Scalars['DateTime']>;
};

export type OptDateSelector = {
  from?: InputMaybe<Scalars['DateTime']>;
  to?: InputMaybe<Scalars['DateTime']>;
};

export type Optimism = {
  __typename?: 'Optimism';
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
};

export type OptimismLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type Output = {
  __typename?: 'Output';
  address: Scalars['String'];
  amount: Amount;
};

export type PageDataType = {
  __typename?: 'PageDataType';
  count: Scalars['Float'];
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

/** Information about pagination in a connection */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PickObjectType = {
  /** Unique identifier in the database */
  id: Scalars['ID'];
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
};

export type Polygon = {
  __typename?: 'Polygon';
  balances: Array<Balance>;
  dailyBalances: Array<DailyBalances>;
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: Array<EvmTransaction>;
  version: Array<Version>;
};

export type PolygonBalancesArgs = {
  address: Scalars['String'];
};

export type PolygonDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: InputMaybe<OptDateRange>;
};

export type PolygonLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type PolygonNftsArgs = {
  address: Scalars['String'];
};

export type PolygonTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
};

export enum Pool {
  Aave = 'Aave',
  Benqi = 'Benqi',
  Bitswap = 'Bitswap',
  IronBank = 'IronBank',
}

export type PoolType = {
  __typename?: 'PoolType';
  address: Scalars['String'];
  borrowApr: Scalars['String'];
  borrowApy: Scalars['String'];
  borrowCap: Scalars['String'];
  borrowRate: Scalars['String'];
  chain: Chain;
  exchangeRate: Scalars['String'];
  name: Scalars['String'];
  pool: Pool;
  reserves: Scalars['String'];
  supplyApr: Scalars['String'];
  supplyApy: Scalars['String'];
  supplyCap: Scalars['String'];
  supplyRate: Scalars['String'];
  totalBorrows: Scalars['String'];
  totalSupply: Scalars['String'];
};

export type PostRouteTypeV2 = {
  __typename?: 'PostRouteTypeV2';
  routeId: Scalars['String'];
};

export type PriceInputV2 = {
  amount?: Scalars['String'];
  scalingFactor?: Scalars['Int'];
};

export type ProviderInputType = {
  icon?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['String']>;
};

export type ProviderInputTypeV2 = {
  icon?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['String']>;
};

export type ProviderType = {
  __typename?: 'ProviderType';
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  time: Scalars['String'];
};

export type ProviderTypeV2 = {
  __typename?: 'ProviderTypeV2';
  icon: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  time: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  arbitrum: Arbitrum;
  assets: AssetType;
  aurora: Aurora;
  avalanche: Avalanche;
  binance: Binance;
  binanceSmartChain: BinanceSmartChain;
  bitcoin: BitcoinChain;
  bitcoincash: BitcoincashChain;
  cantoEVM: CantoEvm;
  chains: Array<ChainType>;
  /** Fetch composite tokens */
  compositeTokens: Array<CompositeTokenType>;
  cosmos: CosmosBasedChain;
  cronosEVM: CronosEvm;
  /** Fetch list of all available tokens */
  cryptoCurrencies: Array<CryptoCurrencyType>;
  dogecoin: DogeChain;
  ethereum: Ethereum;
  explainTransaction: ExplainedTransaction;
  fantom: Fantom;
  /** Fetch list of fiat currencies */
  fiatCurrencies: Array<FiatCurrencyType>;
  investing: InvestingType;
  juno: JunoChain;
  litecoin: LitecoinChain;
  near: NearChain;
  optimism: Optimism;
  osmosis: CosmosBasedChain;
  osmosisV2: CosmosBasedChainV2;
  polygon: Polygon;
  reputation: Reputation;
  routing: RoutingType;
  routingV2?: Maybe<RoutingTypeV2>;
  solana: SolanaChain;
  stargaze: StargazeChain;
  stargazeV2: CosmosBasedChainWithNft;
  terra: TerraChain;
  thorchain: ThorChain;
  /** Fetch list of all available tokens */
  tokens: Array<TokenType>;
  trackWalletConnect?: Maybe<Wallet>;
  tron: Tron;
};

export type QueryChainsArgs = {
  filter?: InputMaybe<Scalars['String']>;
};

export type QueryCompositeTokensArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
};

export type QueryCryptoCurrenciesArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  symbols?: InputMaybe<Array<Scalars['String']>>;
};

export type QueryExplainTransactionArgs = {
  chain: Scalars['String'];
  payload: Scalars['String'];
};

export type QueryFiatCurrenciesArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
};

export type QueryReputationArgs = {
  address: Scalars['String'];
  approved?: InputMaybe<Scalars['Boolean']>;
  first?: Scalars['Int'];
  offest?: Scalars['Int'];
};

export type QueryTokensArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<GetTokensArgs>;
};

export type QueryTrackWalletConnectArgs = {
  walletAddress: Scalars['String'];
  walletProvider: Scalars['String'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  user: User;
  version: Scalars['String'];
};

export type ReferralBonus = {
  __typename?: 'ReferralBonus';
  bonus?: Maybe<Scalars['Decimal']>;
};

export type ReferralFeeSummary = {
  __typename?: 'ReferralFeeSummary';
  bonusArbEarned: Scalars['Decimal'];
  claimHistory: Array<ClaimStatus>;
  claimableFees: Scalars['Decimal'];
  feeTier: Scalars['Decimal'];
  last7dFees: Scalars['Decimal'];
  last30dFees: Scalars['Decimal'];
  lifetimeFees: Scalars['Decimal'];
  referrerId: Scalars['String'];
  totalAssociatedAddresses: Scalars['Int'];
  totalReferralVolume: Scalars['Decimal'];
  url: Scalars['String'];
  userType: Scalars['String'];
};

export type ReferralInputType = {
  link?: InputMaybe<Scalars['String']>;
  medium?: InputMaybe<Scalars['String']>;
};

export type ReferralType = {
  __typename?: 'ReferralType';
  link?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
};

export type Referrer = {
  __typename?: 'Referrer';
  /** On chain address of the referrer. Must be unique */
  address: Scalars['String'];
  /** Fee tier of the referrer. Must be between [0, 1] */
  feeTier: Scalars['String'];
  id: Scalars['String'];
  link: Scalars['String'];
  name: Scalars['String'];
};

export type ReferrerWithFees = {
  __typename?: 'ReferrerWithFees';
  /** On chain address of the referrer. Must be unique */
  address: Scalars['String'];
  /** Fees that the referrer already claimed from XDEFI */
  collectedFees?: Maybe<Scalars['Decimal']>;
  /** Fee tier of the referrer. Must be between [0, 1] */
  feeTier: Scalars['String'];
  /** Total fees generated by the referrer for XDEFI */
  generatedFees?: Maybe<Scalars['Decimal']>;
  id: Scalars['String'];
  link: Scalars['String'];
  name: Scalars['String'];
};

export type RefuelInfoType = {
  __typename?: 'RefuelInfoType';
  destChain: Scalars['String'];
  maxAmount: Scalars['Decimal'];
  minAmount: Scalars['Decimal'];
  srcChain: Scalars['String'];
};

export type Reputation = {
  __typename?: 'Reputation';
  comments: Array<ReputationComment>;
  commentsLimit: Scalars['Int'];
  commentsOffset: Scalars['Int'];
  commentsTotal: Scalars['Int'];
  location: Scalars['String'];
};

export type ReputationComment = {
  __typename?: 'ReputationComment';
  approved: Scalars['Boolean'];
  commentId: Scalars['Int'];
  date: Scalars['DateTime'];
  source: Scalars['String'];
  text: Scalars['String'];
};

export type RouteInputTypeV2 = {
  addresses: Array<AddressRouteInputTypeV2>;
  amountIn: Scalars['Decimal'];
  approvalInfiniteFlag?: InputMaybe<Scalars['Boolean']>;
  destAddress: Scalars['String'];
  errorBuildingRoute?: InputMaybe<Scalars['String']>;
  gasPrices?: InputMaybe<Scalars['JSON']>;
  isOptIn?: InputMaybe<Scalars['Boolean']>;
  priceImpact: Scalars['String'];
  priceRate: Scalars['Decimal'];
  priceRateText: Scalars['String'];
  slippage: Scalars['Decimal'];
  tradesRoute: Array<TradeRouteInputTypeV2>;
};

export type RouteTradeInputType = {
  amountIn: Scalars['Float'];
  amountOut: Scalars['Float'];
  assetIn: RoutingTokenInputType;
  assetOut: RoutingTokenInputType;
  fee: FeeInputType;
  minAmountReceived: Scalars['Float'];
  priceRateUsdAssetIn: Scalars['Float'];
  priceRateUsdAssetOut: Scalars['Float'];
  provider: ProviderInputType;
  tradeType: Scalars['String'];
};

export type RouteTradeType = {
  __typename?: 'RouteTradeType';
  amountIn: Scalars['Float'];
  amountOut: Scalars['Float'];
  assetIn: RoutingTokenType;
  assetOut: RoutingTokenType;
  fee: RoutingFeeType;
  minAmountReceived: Scalars['Float'];
  priceRateUsdAssetIn: Scalars['Float'];
  priceRateUsdAssetOut: Scalars['Float'];
  provider: ProviderType;
  tradeType: Scalars['String'];
};

export type RouteTradeTypeV2 = {
  __typename?: 'RouteTradeTypeV2';
  amountIn: Scalars['Decimal'];
  amountOut: Scalars['Decimal'];
  assetIn: RoutingTokenTypeV2;
  assetOut: RoutingTokenTypeV2;
  fee: RoutingFeeTypeV2;
  minAmountReceived: Scalars['Decimal'];
  priceRateUsdAssetIn: Scalars['Decimal'];
  priceRateUsdAssetOut: Scalars['Decimal'];
  provider: ProviderTypeV2;
  referral?: Maybe<ReferralType>;
  tradeType: Scalars['String'];
};

export type RouteTransactionInputType = {
  addresses: Array<AddressRouteInputType>;
  amountIn?: InputMaybe<Scalars['Float']>;
  approvalInfiniteFlag?: InputMaybe<Scalars['String']>;
  destAddress: Scalars['String'];
  errorBuildingRoute?: InputMaybe<Scalars['String']>;
  gasPrices?: InputMaybe<Scalars['String']>;
  priceImpact?: InputMaybe<Scalars['String']>;
  priceRate: Scalars['Float'];
  priceRateText?: InputMaybe<Scalars['String']>;
  slippage: Scalars['Float'];
  tradesRoute: Array<RouteTradeInputType>;
};

export type RouteTransactionStatus = {
  __typename?: 'RouteTransactionStatus';
  status?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
};

export type RouteTransactionStatusV2 = {
  __typename?: 'RouteTransactionStatusV2';
  status?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
};

export type RouteTransactionTradeType = {
  __typename?: 'RouteTransactionTradeType';
  routeId: Scalars['String'];
  status: RouteTransactionStatus;
  tradeRoute: RouteTradeType;
  transaction?: Maybe<RouteTransactionType>;
};

export type RouteTransactionTradeTypeV2 = {
  __typename?: 'RouteTransactionTradeTypeV2';
  routeId: Scalars['String'];
  status: RouteTransactionStatusV2;
  tradeRoute: RouteTradeTypeV2;
  transaction?: Maybe<RouteTransactionTypeV2>;
};

export type RouteTransactionType = {
  __typename?: 'RouteTransactionType';
  amount?: Maybe<Scalars['Float']>;
  chain?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
  feeRate?: Maybe<Scalars['Float']>;
  gasLimit?: Maybe<Scalars['Float']>;
  gasPrice?: Maybe<Scalars['Float']>;
  memo?: Maybe<Scalars['String']>;
  recipient?: Maybe<Scalars['String']>;
  routeId?: Maybe<Scalars['String']>;
  tradeId?: Maybe<Scalars['Float']>;
  txType?: Maybe<Scalars['String']>;
  unsignedStdTx?: Maybe<Scalars['String']>;
};

export type RouteTransactionTypeV2 = {
  __typename?: 'RouteTransactionTypeV2';
  actions?: Maybe<Scalars['JSON']>;
  amount: Scalars['Decimal'];
  chain: Scalars['String'];
  data?: Maybe<Scalars['String']>;
  feeRate: Scalars['String'];
  gasLimit?: Maybe<Scalars['String']>;
  gasPrice?: Maybe<Scalars['String']>;
  memo?: Maybe<Scalars['String']>;
  receiverId?: Maybe<Scalars['String']>;
  recipient?: Maybe<Scalars['String']>;
  routeId?: Maybe<Scalars['String']>;
  signerId?: Maybe<Scalars['String']>;
  tradeId: Scalars['String'];
  txType: Scalars['String'];
  unsignedStdTx?: Maybe<Scalars['String']>;
};

export type RouteType = {
  __typename?: 'RouteType';
  addresses: Array<AddressRouteType>;
  amountIn?: Maybe<Scalars['Float']>;
  approvalInfiniteFlag?: Maybe<Scalars['String']>;
  destAddress: Scalars['String'];
  errorBuildingRoute?: Maybe<Scalars['String']>;
  gasPrices?: Maybe<Scalars['String']>;
  priceImpact?: Maybe<Scalars['String']>;
  priceRate: Scalars['Float'];
  priceRateText?: Maybe<Scalars['String']>;
  slippage: Scalars['Float'];
  tradesRoute: Array<RouteTradeType>;
};

export type RouteTypeV2 = {
  __typename?: 'RouteTypeV2';
  addresses: Array<AddressRouteTypeV2>;
  amountIn: Scalars['Decimal'];
  approvalInfiniteFlag?: Maybe<Scalars['Boolean']>;
  destAddress: Scalars['String'];
  errorBuildingRoute?: Maybe<Scalars['String']>;
  gasPrices?: Maybe<Scalars['JSON']>;
  isOptIn?: Maybe<Scalars['Boolean']>;
  priceImpact: Scalars['String'];
  priceRate: Scalars['Decimal'];
  priceRateText: Scalars['String'];
  slippage: Scalars['Decimal'];
  tradesRoute: Array<RouteTradeTypeV2>;
};

export type RoutingChainType = {
  __typename?: 'RoutingChainType';
  name: Scalars['String'];
  tokens: Array<RoutingTokenType>;
};

export type RoutingChainTypeTokensArgs = {
  addresses?: InputMaybe<Array<AddressRouteInputType>>;
  srcToken?: InputMaybe<Scalars['String']>;
};

export type RoutingChainTypeV2 = {
  __typename?: 'RoutingChainTypeV2';
  name: Scalars['String'];
  tokens: Array<Maybe<RoutingTokenTypeV2>>;
};

export type RoutingFeeInputTypeV2 = {
  feeRateTransaction: Scalars['Decimal'];
  inboundFeeAsset: Scalars['Decimal'];
  inboundFeeDollar: Scalars['Decimal'];
  networkFeeAsset: Scalars['Decimal'];
  networkFeeDollar: Scalars['Decimal'];
  swapFee: Scalars['Decimal'];
  xdefiSwapFee?: Scalars['Decimal'];
  xdefiSwapFeeDollar?: Scalars['Decimal'];
};

export type RoutingFeeType = {
  __typename?: 'RoutingFeeType';
  feeRateTransaction: Scalars['Float'];
  inboundFeeAsset: Scalars['Float'];
  inboundFeeDollar: Scalars['Float'];
  networkFeeAsset: Scalars['Float'];
  networkFeeDollar: Scalars['Float'];
  swapFee: Scalars['Float'];
};

export type RoutingFeeTypeV2 = {
  __typename?: 'RoutingFeeTypeV2';
  feeRateTransaction: Scalars['Decimal'];
  inboundFeeAsset: Scalars['Decimal'];
  inboundFeeDollar: Scalars['Decimal'];
  networkFeeAsset: Scalars['Decimal'];
  networkFeeDollar: Scalars['Decimal'];
  swapFee: Scalars['Decimal'];
  xdefiSwapFee?: Maybe<Scalars['Decimal']>;
  xdefiSwapFeeDollar?: Maybe<Scalars['Decimal']>;
};

export type RoutingTokenInputType = {
  asset?: InputMaybe<CryptoAssetInput>;
  id: Scalars['ID'];
  listProviders?: InputMaybe<Array<Scalars['String']>>;
};

export type RoutingTokenInputTypeV2 = {
  asset?: InputMaybe<CryptoAssetInputV2>;
  id: Scalars['String'];
  listProviders?: InputMaybe<Array<Scalars['String']>>;
};

export type RoutingTokenType = {
  __typename?: 'RoutingTokenType';
  asset?: Maybe<CryptoAsset>;
  id: Scalars['ID'];
  listProviders?: Maybe<Array<Scalars['String']>>;
};

export type RoutingTokenTypeV2 = {
  __typename?: 'RoutingTokenTypeV2';
  asset: CryptoAsset;
  id: Scalars['String'];
  listProviders: Array<Scalars['String']>;
};

export type RoutingType = {
  __typename?: 'RoutingType';
  chain?: Maybe<RoutingChainType>;
  chains: Array<RoutingChainType>;
  route?: Maybe<RouteType>;
  token?: Maybe<RoutingTokenType>;
  tokens?: Maybe<Array<RoutingTokenType>>;
  trades?: Maybe<Array<RouteTransactionTradeType>>;
};

export type RoutingTypeChainArgs = {
  name: Scalars['String'];
};

export type RoutingTypeRouteArgs = {
  addresses: Array<AddressRouteInputType>;
  amountSource?: InputMaybe<Scalars['String']>;
  destAddress: Scalars['String'];
  destToken: Scalars['String'];
  slippage: Scalars['String'];
  srcToken: Scalars['String'];
};

export type RoutingTypeTokenArgs = {
  id: Scalars['String'];
};

export type RoutingTypeTokensArgs = {
  names?: InputMaybe<Array<Scalars['String']>>;
  tokenIds?: InputMaybe<Array<Scalars['String']>>;
};

export type RoutingTypeTradesArgs = {
  routeId: Scalars['String'];
};

export type RoutingTypeV2 = {
  __typename?: 'RoutingTypeV2';
  addressCheckV2: AddressRouteCheckTypeV2;
  allReferrers?: Maybe<Array<ReferrerWithFees>>;
  bridgeableTokens: Array<RoutingTokenTypeV2>;
  chainV2: RoutingChainTypeV2;
  chainsV2: Array<RoutingChainTypeV2>;
  dailyVolume?: Maybe<Array<VolumeHistory>>;
  getArbGauge: ReferralBonus;
  referrerSummary: ReferralFeeSummary;
  refuel: RouteTypeV2;
  refuelInfo: RefuelInfoType;
  routeV2: RouteTypeV2;
  tokenV2: RoutingTokenTypeV2;
  tokensV2: Array<RoutingTokenTypeV2>;
  tradeV2: RouteTransactionTradeTypeV2;
  tradesV2: Array<RouteTransactionTradeTypeV2>;
};

export type RoutingTypeV2AddressCheckV2Args = {
  address: AddressRouteInputTypeV2;
};

export type RoutingTypeV2BridgeableTokensArgs = {
  bridgeToken?: InputMaybe<BridgeTokenInput>;
  tokenId?: InputMaybe<Scalars['String']>;
};

export type RoutingTypeV2ChainV2Args = {
  name: Scalars['String'];
};

export type RoutingTypeV2DailyVolumeArgs = {
  startDate?: Scalars['String'];
};

export type RoutingTypeV2RefuelArgs = {
  addresses: Array<AddressRouteInputTypeV2>;
  amountSource?: InputMaybe<Scalars['String']>;
  destAddress: Scalars['String'];
  destToken: Scalars['String'];
  referral?: InputMaybe<ReferralInputType>;
  srcToken: Scalars['String'];
};

export type RoutingTypeV2RefuelInfoArgs = {
  destChain: Scalars['String'];
  srcChain: Scalars['String'];
};

export type RoutingTypeV2RouteV2Args = {
  addresses: Array<AddressRouteInputTypeV2>;
  amountSource?: InputMaybe<Scalars['String']>;
  destAddress: Scalars['String'];
  destToken: Scalars['String'];
  infiniteApproval?: InputMaybe<Scalars['Boolean']>;
  isLedgerLive?: InputMaybe<Scalars['Boolean']>;
  isOptedIn?: InputMaybe<Scalars['Boolean']>;
  referral?: InputMaybe<ReferralInputType>;
  slippage: Scalars['String'];
  srcToken: Scalars['String'];
};

export type RoutingTypeV2TokenV2Args = {
  id: Scalars['String'];
};

export type RoutingTypeV2TokensV2Args = {
  names?: InputMaybe<Array<Scalars['String']>>;
  tokenIds?: InputMaybe<Array<Scalars['String']>>;
};

export type RoutingTypeV2TradeV2Args = {
  tradeId: Scalars['String'];
};

export type RoutingTypeV2TradesV2Args = {
  routeId: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
  private?: Maybe<Scalars['String']>;
};

export type SolanaChain = {
  __typename?: 'SolanaChain';
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
  nfts: Array<Nft>;
  status: SolanaStatus;
  transactions: Array<SolanaTransaction>;
  version: Array<Version>;
};

export type SolanaChainBalancesArgs = {
  address: Scalars['String'];
};

export type SolanaChainLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type SolanaChainNftsArgs = {
  address: Scalars['String'];
};

export type SolanaChainTransactionsArgs = {
  address: Scalars['String'];
  dateRange?: InputMaybe<DateRange>;
  slotRange?: InputMaybe<BlockRange>;
};

export type SolanaStatus = {
  __typename?: 'SolanaStatus';
  lastBlock?: Maybe<LastSlotStatus>;
};

export type SolanaTransaction = {
  __typename?: 'SolanaTransaction';
  fee: Fee;
  hash: Scalars['String'];
  signers: Array<Scalars['String']>;
  slot: Scalars['Int'];
  status: Scalars['String'];
  timestamp?: Maybe<Scalars['DateTime']>;
  transfers: Array<AssetTransfer>;
};

export type StargazeChain = {
  __typename?: 'StargazeChain';
  balances: Array<Balance>;
  name: Scalars['String'];
  nfts: Array<Nft>;
  status: Status;
  transactions: CosmosLikeTransactionConnection;
  version: Array<Version>;
};

export type StargazeChainBalancesArgs = {
  address: Scalars['String'];
};

export type StargazeChainNftsArgs = {
  address: Scalars['String'];
};

export type StargazeChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  pagination?: CursorPagination;
};

export type Status = {
  __typename?: 'Status';
  lastBlock: Scalars['Int'];
};

export type TerraChain = {
  __typename?: 'TerraChain';
  legacyNFTs: Array<NfTv2>;
  name: Scalars['String'];
};

export type TerraChainLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type ThorChain = {
  __typename?: 'ThorChain';
  balances: Array<Balance>;
  name: Scalars['String'];
  status: Status;
  transactions: Array<ThorchainTransaction>;
  version: Array<Version>;
};

export type ThorChainBalancesArgs = {
  address: Scalars['String'];
};

export type ThorChainTransactionsArgs = {
  address: Scalars['String'];
};

export type ThorchainFee = {
  __typename?: 'ThorchainFee';
  amount: Amount;
  asset: CryptoAsset;
};

export type ThorchainTransaction = {
  __typename?: 'ThorchainTransaction';
  blockHeight: Scalars['Int'];
  fee?: Maybe<Array<ThorchainFee>>;
  hash: Scalars['String'];
  status: Scalars['String'];
  timestamp?: Maybe<Scalars['LocalDateTime']>;
  transfers: Array<AssetTransfer>;
};

export type TokenContractType = {
  __typename?: 'TokenContractType';
  address: AddressType;
  scalingFactor: Scalars['Float'];
  symbol: Scalars['String'];
};

export type TokenFilter = {
  address?: InputMaybe<Array<Scalars['String']>>;
  chains?: InputMaybe<Array<AddressChain>>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  symbols?: InputMaybe<Array<Scalars['String']>>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  page: AssetTokenTypeConnection;
  pageData?: Maybe<PageDataType>;
};

export type TokenType = {
  __typename?: 'TokenType';
  contract: Scalars['String'];
  contracts: Array<TokenContractType>;
  icon?: Maybe<ImageType>;
  id: Scalars['ID'];
  /** Known name that identifies token */
  name: Scalars['String'];
  price?: Maybe<AmountType>;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
};

export type TradeRouteInputTypeV2 = {
  amountIn: Scalars['Decimal'];
  amountOut: Scalars['Decimal'];
  assetIn: RoutingTokenInputTypeV2;
  assetOut: RoutingTokenInputTypeV2;
  fee: RoutingFeeInputTypeV2;
  minAmountReceived: Scalars['Decimal'];
  priceRateUsdAssetIn: Scalars['Decimal'];
  priceRateUsdAssetOut: Scalars['Decimal'];
  provider: ProviderInputTypeV2;
  referral?: InputMaybe<ReferralInputType>;
  tradeType: Scalars['String'];
};

export type TransactionCallArg = {
  __typename?: 'TransactionCallArg';
  name: Scalars['String'];
  standardisedName: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export enum TransactionType {
  CLAIM = 'CLAIM',
  DEPOSIT = 'DEPOSIT',
  MINT = 'MINT',
  STAKE = 'STAKE',
  SWAP = 'SWAP',
  UNCLASSIFIED = 'UNCLASSIFIED',
  WITHDRAW = 'WITHDRAW',
}

export type Tron = {
  __typename?: 'Tron';
  balances: Array<Balance>;
  dailyBalances: Array<DailyBalances>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: Array<EvmTransaction>;
  version: Array<Version>;
};

export type TronBalancesArgs = {
  address: Scalars['String'];
};

export type TronDailyBalancesArgs = {
  address: Scalars['String'];
  dateRange?: InputMaybe<OptDateRange>;
};

export type TronNftsArgs = {
  address: Scalars['String'];
};

export type TronTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
};

export type UtxoScriptPubkey = {
  __typename?: 'UTXOScriptPubkey';
  /** (string, optional) The Bitcoin address (only if a well-defined address exists) */
  address?: Maybe<Scalars['String']>;
  /** (string) the asm */
  asm: Scalars['String'];
  /** (string, optional) Inferred descriptor for the output */
  desc?: Maybe<Scalars['String']>;
  /** (string) the hex */
  hex: Scalars['String'];
  /** (string) The type, eg 'pubkeyhash' */
  scriptType: Scalars['String'];
};

export type UtxoScriptSig = {
  __typename?: 'UTXOScriptSig';
  /** asm */
  asm: Scalars['String'];
  /** hex */
  hex: Scalars['String'];
};

export type UtxoTransaction = {
  __typename?: 'UTXOTransaction';
  blockIndex?: Maybe<Scalars['Int']>;
  blockNumber?: Maybe<Scalars['Int']>;
  fee: Amount;
  hash: Scalars['String'];
  inputs: Array<Input>;
  outputs: Array<Output>;
  status?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['DateTime']>;
};

export type UtxoTransactionByHash = {
  __typename?: 'UTXOTransactionByHash';
  /**
   * (numeric, optional) the index of the transaction in the transactions list of the
   * block in which this tx is mined.
   */
  blockIndex?: Maybe<Scalars['Int']>;
  /** (numeric, optional) the block number in which this transaction is mined. */
  blockNumber?: Maybe<Scalars['Int']>;
  /** (string, optional) the block hash */
  blockhash?: Maybe<Scalars['String']>;
  /** (numeric, optional) The block time expressed in UNIX epoch time */
  blocktime?: Maybe<Scalars['Int']>;
  /** (numeric, optional) The confirmations */
  confirmations?: Maybe<Scalars['Int']>;
  /** the amout of Satushi spent for this tx to be mined by a miner. */
  fee: Amount;
  /** (string) The transaction hash (differs from txid for witness transactions) */
  hash: Scalars['String'];
  /** (string) The serialized, hex-encoded data for 'txid' */
  hex: Scalars['String'];
  /** Inputs from the privous outputs, as addresses and values */
  inputs: Array<Input>;
  /** (numeric) The lock time */
  locktime: Scalars['Int'];
  /** outputs containing */
  outputs: Array<Output>;
  /** (numeric) The serialized transaction size */
  size: Scalars['Int'];
  /** (numeric, optional) Same as "blocktime" */
  time?: Maybe<Scalars['Int']>;
  /** (string) The transaction id (same as provided) */
  txid: Scalars['String'];
  /** (numeric) The version */
  version: Scalars['Int'];
  /**
   * vin, input records directly from the node's response.
   * contains the privious outputs data.
   */
  vin: Array<UtxoVin>;
  /** vout */
  vout: Array<UtxoVout>;
  /** (numeric) The virtual transaction size (differs from size for witness transactions) */
  vsize?: Maybe<Scalars['Int']>;
  /** (numeric) The transaction's weight (between vsize*4-3 and vsize*4) */
  weight?: Maybe<Scalars['Int']>;
};

export type UtxoTransactionConnection = {
  __typename?: 'UTXOTransactionConnection';
  /** A list of edges. */
  edges: Array<UtxoTransactionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UtxoTransactionEdge = {
  __typename?: 'UTXOTransactionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: UtxoTransaction;
};

export type UtxoVin = {
  __typename?: 'UTXOVin';
  /** (string, optional) Coinbase, if the transactions is a coinbase tx */
  coinbase?: Maybe<Scalars['String']>;
  /** (json object, option) The script */
  scriptSig?: Maybe<UtxoScriptSig>;
  /** (numeric) The script sequence number */
  sequence: Scalars['Int'];
  /** (string, optional) The transaction id, if not coinbase */
  txid?: Maybe<Scalars['String']>;
  /** (json array, optional), [(string) hex-encoded witness data (if any)] */
  txinwitness?: Maybe<Array<Scalars['String']>>;
  /** (numeric) The output number */
  vout?: Maybe<Scalars['Int']>;
};

export type UtxoVout = {
  __typename?: 'UTXOVout';
  /** (numeric) index */
  n: Scalars['Int'];
  /** scriptPubkey */
  scriptPubkey: UtxoScriptPubkey;
  /** (numeric) The value in BTC */
  value: Scalars['Float'];
};

export type UnspentTransactionOutput = {
  __typename?: 'UnspentTransactionOutput';
  address: Scalars['String'];
  iTxHash?: Maybe<Scalars['String']>;
  iTxIndex?: Maybe<Scalars['Int']>;
  isCoinbase: Scalars['Boolean'];
  isSpent: Scalars['Boolean'];
  oIndex: Scalars['Int'];
  oTxBlockIndex: Scalars['Int'];
  oTxBlockNumber: Scalars['Int'];
  oTxHash: Scalars['String'];
  oTxTime: Scalars['DateTime'];
  scriptHex: Scalars['String'];
  value: Amount;
};

export type UnspentTransactionOutputConnection = {
  __typename?: 'UnspentTransactionOutputConnection';
  /** A list of edges. */
  edges: Array<UnspentTransactionOutputEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UnspentTransactionOutputEdge = {
  __typename?: 'UnspentTransactionOutputEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: UnspentTransactionOutput;
};

export type User = {
  __typename?: 'User';
  addresses?: Maybe<Array<Address>>;
  id: Scalars['ID'];
  settings?: Maybe<Settings>;
  username: Scalars['String'];
};

export type UserSettingsInput = {
  private?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type Version = {
  __typename?: 'Version';
  /** date of compilation */
  compilationDate?: Maybe<Scalars['String']>;
  /** unique hash that represent source code that was used to build */
  compilationHash?: Maybe<Scalars['String']>;
  /** aplication name */
  name: Scalars['String'];
  /** schematic version (semver.org) */
  version: Scalars['String'];
};

export type VolumeHistory = {
  __typename?: 'VolumeHistory';
  date: Scalars['String'];
  volume: Scalars['String'];
};

export type Wallet = {
  __typename?: 'Wallet';
  name: Scalars['String'];
};

export type EthereumBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type EthereumBalanceQuery = {
  __typename?: 'Query';
  ethereum: {
    __typename?: 'Ethereum';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      asset: {
        __typename?: 'CryptoAsset';
        symbol?: string | null;
        contract?: string | null;
        id?: string | null;
        name?: string | null;
        image?: string | null;
        chain?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type CosmosBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type CosmosBalanceQuery = {
  __typename?: 'Query';
  cosmos: {
    __typename?: 'CosmosBasedChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; scalingFactor: number; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        id?: string | null;
        name?: string | null;
        symbol?: string | null;
        image?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          scalingFactor: number;
          amount: string;
        } | null;
      };
    }>;
  };
};

export type GetCosmosTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  pagination: CursorPagination;
  blockRange: OptBlockRange;
}>;

export type GetCosmosTransactionsQuery = {
  __typename?: 'Query';
  cosmos: {
    __typename?: 'CosmosBasedChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: {
              __typename?: 'Amount';
              scalingFactor: number;
              value: string;
            };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              id?: string | null;
              name?: string | null;
              image?: string | null;
              symbol?: string | null;
              price?: {
                __typename?: 'AssetAmountType';
                amount: string;
                scalingFactor: number;
              } | null;
            };
          }>;
        };
      }>;
    };
  };
};

export type GetCosmosStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetCosmosStatusQuery = {
  __typename?: 'Query';
  cosmos: {
    __typename?: 'CosmosBasedChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export const EthereumBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EthereumBalance' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'address' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ethereum' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'balances' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'address' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'address' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'asset' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contract' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'chain' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'amount' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'scalingFactor',
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EthereumBalanceQuery,
  EthereumBalanceQueryVariables
>;
export const CosmosBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CosmosBalance' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'address' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cosmos' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'balances' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'address' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'address' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'scalingFactor' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'asset' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'chain' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contract' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'scalingFactor',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'amount' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CosmosBalanceQuery, CosmosBalanceQueryVariables>;
export const GetCosmosTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCosmosTransactions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'address' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pagination' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CursorPagination' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'blockRange' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'OptBlockRange' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cosmos' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'address' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'address' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'pagination' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pagination' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pageInfo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'endCursor' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'hasNextPage' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'hasPreviousPage' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'startCursor' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'blockHeight',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'blockIndex' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'hash' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'status' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'transfers' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'amount',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'scalingFactor',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'value',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'fromAddress',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'toAddress',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'asset',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'chain',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'contract',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'name',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'symbol',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'price',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'amount',
                                                      },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'scalingFactor',
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCosmosTransactionsQuery,
  GetCosmosTransactionsQueryVariables
>;
export const GetCosmosStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCosmosStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cosmos' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastBlock' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCosmosStatusQuery,
  GetCosmosStatusQueryVariables
>;

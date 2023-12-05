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
  UUID: any;
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
  Archway = 'Archway',
  ArchwayTestnet = 'ArchwayTestnet',
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
  BerachainTestnet = 'BerachainTestnet',
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
  CronosEVM = 'CronosEVM',
  CronosPOS = 'CronosPOS',
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
  MAYAChain = 'MAYAChain',
  MarsProtocol = 'MarsProtocol',
  Medibloc = 'Medibloc',
  Mumbai = 'Mumbai',
  /** Legacy, use "Near" instead */
  NEAR = 'NEAR',
  Near = 'Near',
  Neutron = 'Neutron',
  Noble = 'Noble',
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
  Quasar = 'Quasar',
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

/** Portfolio by wallet address */
export type AddressPortfolioFiat = {
  __typename?: 'AddressPortfolioFiat';
  /** wallet address */
  address: Scalars['String'];
  /** errors if there was some issue with fetching data */
  errors: Array<FetchingError>;
  /** granularity of data (NOTE: experimental, can be removed) */
  granularity?: Maybe<FiatGranularity>;
  /** historical balances USD at specific datetime */
  historicalBalanceSum: Array<DatedAmountFiat>;
};

export type AddressRouteCheckTypeV2 = {
  __typename?: 'AddressRouteCheckTypeV2';
  address: Scalars['String'];
  chain: Scalars['String'];
  isValid: Scalars['Boolean'];
};

export type AddressRouteCheckTypeV3 = {
  __typename?: 'AddressRouteCheckTypeV3';
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

export type AddressRouteInputTypeV3 = {
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

export type AddressRouteTypeV3 = {
  __typename?: 'AddressRouteTypeV3';
  address: Scalars['String'];
  chain: Scalars['String'];
};

export type AddressType = {
  __typename?: 'AddressType';
  address?: Maybe<Scalars['String']>;
  chain: ChainType;
};

export type AllAssetsFilter = {
  assetTypes?: InputMaybe<Array<AssetInternalType>>;
  ids?: InputMaybe<Array<Scalars['String']>>;
};

export type AllAssetsResponse = {
  __typename?: 'AllAssetsResponse';
  page: AssetAllAssetsTypeConnection;
  pageData?: Maybe<PageDataType>;
};

export type Amount = {
  __typename?: 'Amount';
  /** @deprecated use `decimals` from CryptoAsset */
  scalingFactor?: Maybe<Scalars['Int']>;
  value: Scalars['String'];
};

/** Represent fiat amount in USD */
export type AmountFiat = {
  __typename?: 'AmountFiat';
  amount: Scalars['String'];
  scalingFactor: Scalars['Int'];
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

export type AnnualPercentageRate = {
  __typename?: 'AnnualPercentageRate';
  asset?: Maybe<SupportedAssets>;
  error?: Maybe<Scalars['String']>;
  provider?: Maybe<Providers>;
  rate?: Maybe<Scalars['Float']>;
};

export type Arbitrum = {
  __typename?: 'Arbitrum';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type ArbitrumBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type ArbitrumLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type ArbitrumNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type ArbitrumTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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

export type AssetAllAssetsType = AssetBaseType & {
  __typename?: 'AssetAllAssetsType';
  /** Only for "CRYPTOCURRENCY" type */
  chain?: Maybe<Scalars['String']>;
  /** For "TOKEN" and "LP_TOKEN" types */
  contracts?: Maybe<Array<AssetTokenContractType>>;
  /** Additional info about asset: description, social and tech links, etc. */
  externalData: Scalars['JSON'];
  /** Icon URL */
  icon?: Maybe<Scalars['String']>;
  /** Unique identifier in the database */
  id: Scalars['ID'];
  /** Market capitalization is total value of a publicly traded company's outstanding common shares owned by stockholders */
  marketCap?: Maybe<Scalars['Float']>;
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  priceHistory: PriceHistoryType;
  /** Only for "CRYPTOCURRENCY" type */
  scalingFactor?: Maybe<Scalars['Float']>;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
  type: AssetInternalType;
};

export type AssetAllAssetsTypeConnection = {
  __typename?: 'AssetAllAssetsTypeConnection';
  edges?: Maybe<Array<AssetAllAssetsTypeEdge>>;
  pageInfo?: Maybe<AssetAllAssetsTypePageInfo>;
};

export type AssetAllAssetsTypeEdge = {
  __typename?: 'AssetAllAssetsTypeEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<AssetAllAssetsType>;
};

export type AssetAllAssetsTypePageInfo = {
  __typename?: 'AssetAllAssetsTypePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
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
  /** 24 Hour Trading Volume */
  dailyTradingVolume?: Maybe<Scalars['String']>;
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
  /** Updated on */
  updatedOn: Scalars['Float'];
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
  type: AssetInternalType;
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
  type: AssetInternalType;
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
  /** Additional info about asset: description, social and tech links, etc. */
  externalData: Scalars['JSON'];
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
  priceHistory: PriceHistoryType;
  scalingFactor?: Maybe<Scalars['Float']>;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
  type: AssetInternalType;
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
  /** Address chain name */
  chain: Scalars['String'];
  icon: Scalars['String'];
  name: Scalars['String'];
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

export enum AssetInternalType {
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
  LP_TOKEN = 'LP_TOKEN',
  TOKEN = 'TOKEN',
}

export type AssetPayload = NftV0 | TokenV0;

export type AssetTokenContractType = {
  __typename?: 'AssetTokenContractType';
  address: Scalars['String'];
  /** Address chain name */
  chain: Scalars['String'];
  /** DefiProtocol */
  defiProtocol?: Maybe<AssetDefiProtocolType>;
  /** Chain fee */
  fee: AssetFeeType;
  /** Unique identifier in the database */
  id: Scalars['Float'];
  /** The scaling factor is needed to convert contract to token price */
  scalingFactor: Scalars['Float'];
  /** The symbol that identifies token */
  symbol: Scalars['String'];
};

export type AssetTokenType = AssetBaseType & {
  __typename?: 'AssetTokenType';
  /** Assets contracts */
  contracts?: Maybe<Array<AssetTokenContractType>>;
  /** Additional info about asset: description, social and tech links, etc. */
  externalData: Scalars['JSON'];
  /** Icon URL */
  icon?: Maybe<Scalars['String']>;
  /** Unique identifier in the database */
  id: Scalars['ID'];
  /** Market capitalization is total value of a publicly traded company's outstanding common shares owned by stockholders */
  marketCap?: Maybe<Scalars['Float']>;
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  priceHistory: PriceHistoryType;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
  type: AssetInternalType;
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

export type AssetTransferV2 = {
  __typename?: 'AssetTransferV2';
  amount: Amount;
  asset: AssetVariant;
  fromAddress?: Maybe<Scalars['String']>;
  toAddress?: Maybe<Scalars['String']>;
};

export type AssetType = {
  __typename?: 'AssetType';
  /** All assets including tokens, lpTokens and cryptoCurrencies */
  allAssets?: Maybe<AllAssetsResponse>;
  /** Scaling factor for market cap */
  compositeTokens?: Maybe<CompositeTokenResponse>;
  /** Crypto assets */
  cryptoAssets?: Maybe<Array<CryptoAsset>>;
  /** Scaling factor for market cap */
  cryptoCurrencies?: Maybe<CryptoCurrencyResponse>;
  /** Scaling factor for market cap */
  fiatCurrencies?: Maybe<FiatCurrencyResponse>;
  /** Trending gainers (by day price change) */
  gainers?: Maybe<Array<TrendingTokensType>>;
  /** Trending losers (by day price change) */
  losers?: Maybe<Array<TrendingTokensType>>;
  /** Scaling factor for market cap */
  lpTokens?: Maybe<TokenResponse>;
  /** Trending popular (by market cap) */
  popular?: Maybe<Array<TrendingTokensType>>;
  /** Scaling factor for market cap */
  tokens?: Maybe<TokenResponse>;
};

export type AssetTypeAllAssetsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  afterPrice?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<AllAssetsFilter>;
  page: ConnectionArgs;
};

export type AssetTypeCompositeTokensArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  afterPrice?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<CompositeTokenFilter>;
  page: ConnectionArgs;
};

export type AssetTypeCryptoAssetsArgs = {
  input: Array<CryptoAssetArgs>;
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

export type AssetTypeLpTokensArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  afterPrice?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<TokenFilter>;
  page: ConnectionArgs;
};

export type AssetTypeTokensArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  afterPrice?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<TokenFilter>;
  page: ConnectionArgs;
};

/** (experimental) Type that is responsible to resolve details (nft or token) */
export type AssetV0 = {
  __typename?: 'AssetV0';
  chain: Scalars['String'];
  /** Contract address (EVM/Cosmos) or program_id (Solana */
  contract?: Maybe<Scalars['String']>;
  payload?: Maybe<AssetPayload>;
  /** Token id (EVM/Cosmos) or mint (Solana) */
  tokenId?: Maybe<Scalars['String']>;
};

export type AssetVariant = CryptoAsset | NftAsset;

export type AssetWithAmount = {
  __typename?: 'AssetWithAmount';
  amount: Amount;
  asset: CryptoAsset;
};

export type Aurora = {
  __typename?: 'Aurora';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type AuroraBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type AuroraLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type AuroraNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type AuroraTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Auth = {
  __typename?: 'Auth';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type Avalanche = {
  __typename?: 'Avalanche';
  average24hFee?: Maybe<Eip1559GasFee>;
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type AvalancheBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type AvalancheLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type AvalancheNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type AvalancheTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Balance = {
  __typename?: 'Balance';
  address: Scalars['String'];
  amount: Amount;
  asset: CryptoAsset;
};

export type Base = {
  __typename?: 'Base';
  average24hFee?: Maybe<Eip1559GasFee>;
  fee?: Maybe<Eip1559GasFee>;
  name: Scalars['String'];
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
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockSelector>;
  dateRange?: InputMaybe<OptDateSelector>;
  first?: InputMaybe<Scalars['Int']>;
};

export type BinanceSmartChain = {
  __typename?: 'BinanceSmartChain';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type BinanceSmartChainBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type BinanceSmartChainLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type BinanceSmartChainNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type BinanceSmartChainTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  decodeRawTransaction: Scalars['String'];
  fee?: Maybe<DefaultGasFee>;
  getTransactionByHash: UtxoTransactionByHashV4;
  isTestNet: Scalars['Boolean'];
  latestHistoryActivityV0: WalletActivityV0Connection;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type BitcoinChainBalancesArgs = {
  address: Scalars['String'];
};

export type BitcoinChainBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoinChainDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoinChainGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type BitcoinChainLatestHistoryActivityV0Args = {
  address: Scalars['String'];
};

export type BitcoinChainLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type BitcoinChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type BitcoinChainTransactionsV2Args = {
  address: Scalars['String'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type BitcoinChainUnspentTxOutputsArgs = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type BitcoinChainUnspentTxOutputsV5Args = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type BitcoinChainTestNet = {
  __typename?: 'BitcoinChainTestNet';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  decodeRawTransaction: Scalars['String'];
  fee?: Maybe<DefaultGasFee>;
  getTransactionByHash: UtxoTransactionByHashV4;
  isTestNet: Scalars['Boolean'];
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type BitcoinChainTestNetBalancesArgs = {
  address: Scalars['String'];
};

export type BitcoinChainTestNetBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoinChainTestNetDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoinChainTestNetGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type BitcoinChainTestNetTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type BitcoinChainTestNetTransactionsV2Args = {
  address: Scalars['String'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type BitcoinChainTestNetUnspentTxOutputsArgs = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type BitcoinChainTestNetUnspentTxOutputsV5Args = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type BitcoincashChain = {
  __typename?: 'BitcoincashChain';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  decodeRawTransaction: Scalars['String'];
  fee?: Maybe<DefaultGasFee>;
  getTransactionByHash: UtxoTransactionByHashV4;
  isTestNet: Scalars['Boolean'];
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type BitcoincashChainBalancesArgs = {
  address: Scalars['String'];
};

export type BitcoincashChainBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoincashChainDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoincashChainGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type BitcoincashChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type BitcoincashChainTransactionsV2Args = {
  address: Scalars['String'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type BitcoincashChainUnspentTxOutputsArgs = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type BitcoincashChainUnspentTxOutputsV5Args = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type BitcoincashChainTestNet = {
  __typename?: 'BitcoincashChainTestNet';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  decodeRawTransaction: Scalars['String'];
  fee?: Maybe<DefaultGasFee>;
  getTransactionByHash: UtxoTransactionByHashV4;
  isTestNet: Scalars['Boolean'];
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type BitcoincashChainTestNetBalancesArgs = {
  address: Scalars['String'];
};

export type BitcoincashChainTestNetBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoincashChainTestNetDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoincashChainTestNetGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type BitcoincashChainTestNetTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type BitcoincashChainTestNetTransactionsV2Args = {
  address: Scalars['String'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type BitcoincashChainTestNetUnspentTxOutputsArgs = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type BitcoincashChainTestNetUnspentTxOutputsV5Args = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type BridgeTokenInput = {
  address: Scalars['String'];
  name: Scalars['String'];
};

export type BridgeTokenInputV3 = {
  address: Scalars['String'];
  name: Scalars['String'];
};

export enum CacheControlScope {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export type CantoChain = {
  __typename?: 'CantoChain';
  average24hFee?: Maybe<DefaultGasFee>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
};

export type CantoEvm = {
  __typename?: 'CantoEVM';
  average24hFee?: Maybe<Eip1559GasFee>;
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type CantoEvmBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type CantoEvmLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type CantoEvmNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type CantoEvmTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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

export type ChainPortfolio = {
  __typename?: 'ChainPortfolio';
  chain: PortfolioChainVariant;
  portfolioByAddr: Array<AddressPortfolioFiat>;
};

export type ChainType = {
  __typename?: 'ChainType';
  /** @deprecated The fee field is deprecated. To handle fee-related operations, utilize the fees-service directly. Deadline for transition: January 2024. */
  fee: FeeType;
  name: Scalars['String'];
};

export type ChainedAddresses = {
  addresses: Array<Scalars['String']>;
  chain: PortfolioChainVariant;
};

export enum Chains {
  akash = 'akash',
  alexar = 'alexar',
  avalanche = 'avalanche',
  cosmoshub = 'cosmoshub',
  crescent = 'crescent',
  ethereum = 'ethereum',
  juno = 'juno',
  kava = 'kava',
  kujira = 'kujira',
  osmosis = 'osmosis',
  polygon = 'polygon',
  sei = 'sei',
  solana = 'solana',
  stargaze = 'stargaze',
  stride = 'stride',
  terra2 = 'terra2',
}

export type ClaimStatus = {
  __typename?: 'ClaimStatus';
  amountUsd: Scalars['Float'];
  bonus: Scalars['Float'];
  claimId: Scalars['String'];
  dateModification?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
};

export type ClaimStatusV3 = {
  __typename?: 'ClaimStatusV3';
  amountUsd: Scalars['Float'];
  bonus: Scalars['Float'];
  claimId: Scalars['String'];
  dateModification?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
};

export enum ClassifierChainType {
  Arbitrum = 'Arbitrum',
  Avalanche = 'Avalanche',
  BinanceSmartChain = 'BinanceSmartChain',
  Ethereum = 'Ethereum',
  Fantom = 'Fantom',
  Polygon = 'Polygon',
}

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

export type Contract = {
  __typename?: 'Contract';
  info: CryptoAsset;
  name: Scalars['String'];
};

export type CosmosBalanceChain = {
  __typename?: 'CosmosBalanceChain';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
  status: Status;
  version: Array<Version>;
};

export type CosmosBalanceChainBalancesArgs = {
  address: Scalars['String'];
};

export type CosmosBasedChain = {
  __typename?: 'CosmosBasedChain';
  average24hFee: DefaultGasFee;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
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
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type CosmosBasedChainV2 = {
  __typename?: 'CosmosBasedChainV2';
  average24hFee?: Maybe<DefaultGasFee>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
};

export type CosmosBasedChainWithNft = {
  __typename?: 'CosmosBasedChainWithNft';
  average24hFee?: Maybe<DefaultGasFee>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
};

export type CosmosDelegationInput = {
  amount: Scalars['Decimal'];
  asset: SupportedAssets;
  delegatorAddress: Scalars['String'];
  delegatorPubkeyHex: Scalars['String'];
  gasLimit?: InputMaybe<Scalars['Decimal']>;
  memo: Scalars['String'];
};

export type CosmosFee = {
  __typename?: 'CosmosFee';
  amount: Array<AssetWithAmount>;
  payer?: Maybe<Scalars['String']>;
};

export type CosmosIbcTransferInput = {
  amount: Scalars['Decimal'];
  destChain: Chains;
  gasLimit?: InputMaybe<Scalars['Decimal']>;
  memo: Scalars['String'];
  recieverAddr: Scalars['String'];
  senderAddr: Scalars['String'];
  senderAsset: SupportedAssets;
  senderPubkeyHex: Scalars['String'];
  srcChain: Chains;
  timeoutHeight: Scalars['Int'];
};

export type CosmosLikeTransaction = {
  __typename?: 'CosmosLikeTransaction';
  blockHeight: Scalars['Int'];
  blockIndex?: Maybe<Scalars['Int']>;
  fee?: Maybe<CosmosFee>;
  hash: Scalars['String'];
  signers: Array<Scalars['String']>;
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
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

export type CosmosNativeStakedBalance = {
  __typename?: 'CosmosNativeStakedBalance';
  amount: Scalars['Int'];
  decimal: Scalars['Int'];
  denom: Scalars['String'];
  validatorAddress: Scalars['String'];
  validatorName?: Maybe<Scalars['String']>;
};

export type CreateReferrer = {
  /** On chain wallet address of the referrer. Must be unique */
  address: Scalars['String'];
  /** Unique name of the Referrer */
  name: Scalars['String'];
  /** Signed by the address to verify ownership. Must be {address}:{name} and signed by the address */
  signedMessage: Scalars['String'];
};

export type CreateReferrerV3 = {
  /** On chain wallet address of the referrer. Must be unique */
  address: Scalars['String'];
  /** Unique name of the Referrer */
  name: Scalars['String'];
  /** Signed by the address to verify ownership. Must be {address}:{name} and signed by the address */
  signedMessage: Scalars['String'];
};

export enum CreditOutcome {
  CONSUMED = 'CONSUMED',
  INSUFFICIENT = 'INSUFFICIENT',
}

export type Credits = {
  __typename?: 'Credits';
  amount: Scalars['Int'];
};

export type CronosEvm = {
  __typename?: 'CronosEVM';
  average24hFee?: Maybe<Eip1559GasFee>;
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type CronosEvmBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type CronosEvmLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type CronosEvmNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type CronosEvmTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type CryptoAsset = {
  __typename?: 'CryptoAsset';
  /** supported list of chain are in [`crate::chain::Chain`] enum */
  chain?: Maybe<Scalars['String']>;
  /** ID of token (contract address in most chain) */
  contract?: Maybe<Scalars['String']>;
  /** Number of decimals for current asset */
  decimals?: Maybe<Scalars['Float']>;
  /** Unique asset identifier */
  id?: Maybe<Scalars['ID']>;
  /** Asset image */
  image?: Maybe<Scalars['String']>;
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  /** The symbol that identifies token */
  symbol?: Maybe<Scalars['String']>;
  type?: Maybe<AssetInternalType>;
};

export type CryptoAssetArgs = {
  chain: AddressChain;
  contract?: InputMaybe<Scalars['String']>;
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
  decimals?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<PriceInputV2>;
  symbol?: InputMaybe<Scalars['String']>;
};

export type CryptoAssetInputV3 = {
  chain?: InputMaybe<Scalars['String']>;
  contract?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<PriceInputV3>;
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

export type DAppReputation = {
  __typename?: 'DAppReputation';
  chains?: Maybe<Array<Scalars['String']>>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  url: Scalars['String'];
};

export type DAppReputationInput = {
  url: Scalars['String'];
};

/** Fiat amount at specific point of time (similar to `DatedAmount`) */
export type DatedAmountFiat = {
  __typename?: 'DatedAmountFiat';
  amount: AmountFiat;
  date: Scalars['DateTime'];
};

export type DecodedTransaction = {
  __typename?: 'DecodedTransaction';
  args: Array<TransactionCallArg>;
  contract: Contract;
  fname: Scalars['String'];
  type: Scalars['String'];
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
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  decodeRawTransaction: Scalars['String'];
  fee: DefaultGasFee;
  getTransactionByHash: UtxoTransactionByHashV4;
  isTestNet: Scalars['Boolean'];
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type DogeChainBalancesArgs = {
  address: Scalars['String'];
};

export type DogeChainBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type DogeChainDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type DogeChainGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type DogeChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type DogeChainTransactionsV2Args = {
  address: Scalars['String'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type DogeChainUnspentTxOutputsArgs = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type DogeChainUnspentTxOutputsV5Args = {
  address: Scalars['String'];
  page: Scalars['Int'];
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
  /** Default gasPrice field for legacy transactions */
  defaultGasPrice?: Maybe<Scalars['Float']>;
  high?: Maybe<Eip1559Fee>;
  low?: Maybe<Eip1559Fee>;
  medium?: Maybe<Eip1559Fee>;
};

export type EvmTransactionLog = {
  __typename?: 'EVMTransactionLog';
  data?: Maybe<Scalars['String']>;
  topic0?: Maybe<Scalars['String']>;
  topic1?: Maybe<Scalars['String']>;
  topic2?: Maybe<Scalars['String']>;
  topic3?: Maybe<Scalars['String']>;
};

export type EvmTransactionV2 = {
  __typename?: 'EVMTransactionV2';
  blockIndex: Scalars['Int'];
  blockNumber: Scalars['Int'];
  decoded?: Maybe<DecodedTransaction>;
  fee: Scalars['JSON'];
  fromAddress: Scalars['String'];
  hash: Scalars['String'];
  inputData: Scalars['String'];
  logs: Array<EvmTransactionLog>;
  rawData: Scalars['String'];
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
  toAddress: Scalars['String'];
  transfers: Array<AssetTransferV2>;
  value: Scalars['String'];
};

export type EvmTransactionV2Connection = {
  __typename?: 'EVMTransactionV2Connection';
  /** A list of edges. */
  edges: Array<EvmTransactionV2Edge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type EvmTransactionV2Edge = {
  __typename?: 'EVMTransactionV2Edge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: EvmTransactionV2;
};

export type Ethereum = {
  __typename?: 'Ethereum';
  average24hFee?: Maybe<Eip1559GasFee>;
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type EthereumBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type EthereumLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type EthereumNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type EthereumTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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
  average24hFee?: Maybe<Eip1559GasFee>;
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type FantomBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type FantomLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type FantomNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type FantomTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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

/** Unable to fetch some or all tokens information */
export type FetchingError = {
  __typename?: 'FetchingError';
  /** General error without with hidden details (for user) */
  error: Scalars['String'];
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

export enum FiatGranularity {
  DAY = 'DAY',
  FIVE_MINUTE = 'FIVE_MINUTE',
  THIRTY_MINUTES = 'THIRTY_MINUTES',
  TWO_HOURS = 'TWO_HOURS',
}

export type FilterArgs = {
  chains?: InputMaybe<Array<Chain>>;
  pool?: InputMaybe<Pool>;
};

export type GetTokensArgs = {
  address?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  symbols?: InputMaybe<Array<Scalars['String']>>;
};

export type Gnosis = {
  __typename?: 'Gnosis';
  average24hFee?: Maybe<Eip1559GasFee>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
};

export type GnosisLegacyNfTsArgs = {
  address: Scalars['String'];
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
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
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
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Klaytn = {
  __typename?: 'Klaytn';
  average24hFee?: Maybe<Eip1559GasFee>;
  fee?: Maybe<Eip1559GasFee>;
  name: Scalars['String'];
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

export type Leaderboard = {
  __typename?: 'Leaderboard';
  /** CCTP leaderboard details */
  cctp?: Maybe<Array<LeaderboardEntry>>;
};

export type LeaderboardEntry = {
  __typename?: 'LeaderboardEntry';
  /** EVM address of the user */
  evmAddress: Scalars['String'];
  /** Volume that was swapped by the address */
  volumeUsd: Scalars['Decimal'];
};

export type LeaderboardEntryV3 = {
  __typename?: 'LeaderboardEntryV3';
  /** EVM address of the user */
  evmAddress: Scalars['String'];
  /** Volume that was swapped by the address */
  volumeUsd: Scalars['Decimal'];
};

export type LeaderboardV3 = {
  __typename?: 'LeaderboardV3';
  /** CCTP leaderboard details */
  cctpV3?: Maybe<Array<LeaderboardEntryV3>>;
};

export type LidoStakePreview = {
  __typename?: 'LidoStakePreview';
  chainId: Scalars['Int'];
  data: Scalars['String'];
  fromAddress: Scalars['String'];
  gas: Scalars['String'];
  maxFeePerGas: Scalars['String'];
  nonce: Scalars['Int'];
  toAddress: Scalars['String'];
  value: Scalars['String'];
};

export type LidoStakedAssetBalance = {
  __typename?: 'LidoStakedAssetBalance';
  amount: Scalars['String'];
  asset: Scalars['String'];
  chain: Scalars['String'];
  decimal: Scalars['Int'];
};

export type LidoStakingInput = {
  address: Scalars['String'];
  asset: SupportedAssets;
  gas: Scalars['Decimal'];
  maxFeePerGas: Scalars['Decimal'];
  maxPriorityFeePerGas: Scalars['Decimal'];
  nonce: Scalars['Int'];
  stakeValue: Scalars['Decimal'];
};

export type LitecoinChain = {
  __typename?: 'LitecoinChain';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  decodeRawTransaction: Scalars['String'];
  fee?: Maybe<DefaultGasFee>;
  getTransactionByHash: UtxoTransactionByHashV4;
  isTestNet: Scalars['Boolean'];
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type LitecoinChainBalancesArgs = {
  address: Scalars['String'];
};

export type LitecoinChainBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type LitecoinChainDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type LitecoinChainGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type LitecoinChainTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type LitecoinChainTransactionsV2Args = {
  address: Scalars['String'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type LitecoinChainUnspentTxOutputsArgs = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type LitecoinChainUnspentTxOutputsV5Args = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type LitecoinChainTestNet = {
  __typename?: 'LitecoinChainTestNet';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  decodeRawTransaction: Scalars['String'];
  fee?: Maybe<DefaultGasFee>;
  getTransactionByHash: UtxoTransactionByHashV4;
  isTestNet: Scalars['Boolean'];
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type LitecoinChainTestNetBalancesArgs = {
  address: Scalars['String'];
};

export type LitecoinChainTestNetBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type LitecoinChainTestNetDecodeRawTransactionArgs = {
  rawHex: Scalars['String'];
};

export type LitecoinChainTestNetGetTransactionByHashArgs = {
  txHash: Scalars['String'];
};

export type LitecoinChainTestNetTransactionsArgs = {
  address: Scalars['String'];
  blockRange?: OptBlockRange;
  dateRange?: OptDateRange;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type LitecoinChainTestNetTransactionsV2Args = {
  address: Scalars['String'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type LitecoinChainTestNetUnspentTxOutputsArgs = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export type LitecoinChainTestNetUnspentTxOutputsV5Args = {
  address: Scalars['String'];
  page: Scalars['Int'];
};

export enum LoginChain {
  BITCOIN = 'BITCOIN',
  ETHEREUM = 'ETHEREUM',
}

export type LpBalance = {
  __typename?: 'LpBalance';
  address: Scalars['String'];
  balance: Scalars['Float'];
  balanceUSD: Scalars['Float'];
  createdAt: Scalars['String'];
  decimals: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['String']>>;
  key: Scalars['String'];
  liquidity: Scalars['Float'];
  name: Scalars['String'];
  network: Scalars['String'];
  platform: Scalars['String'];
  poolAddress?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  rawBalance: Scalars['String'];
  symbol: Scalars['String'];
  tokens: Array<LpToken>;
  updatedAt: Scalars['String'];
};

export type LpToken = {
  __typename?: 'LpToken';
  address: Scalars['String'];
  createdAt: Scalars['String'];
  decimals: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['String']>>;
  key: Scalars['String'];
  liquidity: Scalars['Float'];
  name: Scalars['String'];
  network: Scalars['String'];
  platform: Scalars['String'];
  poolAddress?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  symbol: Scalars['String'];
  updatedAt: Scalars['String'];
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

/**
 * (experimental) Represent base activity
 *
 * All other activities should be build on top of these
 */
export type MoveAssetActivityV0 = ReceiveAssetActivityV0 | SendAssetActivityV0;

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Reputation;
  addCreditsForUser: Credits;
  addUserAddress: User;
  anonymousLogin: Auth;
  claimFees?: Maybe<ClaimStatus>;
  claimFeesV3?: Maybe<ClaimStatusV3>;
  consumeCreditsForUser: CreditOutcome;
  /** Publicly exposed Create a referrer */
  createReferrer?: Maybe<Referrer>;
  /** Publicly exposed Create a referrer */
  createReferrerV3?: Maybe<ReferrerV3>;
  createUser: Auth;
  /**
   * The difference between these two credit consumption methods is that first checks and tries
   * to consume credits or fails if they are insufficent
   * the second one just blindly subtracts them with possibility to go to negative
   * Those two methods are required to support the following scenario for query cost calculation:
   * 1. router gets request from user
   * 2. it calculates (statically) query cost and credits by analyzing query and tries to subtract credits
   * BEFORE query execution. Rejects if insufficient credits
   * 3. when query is executed, response is analyzed to calculated adjusted cost and credits
   * 4. router then forces user credit subtraction without any tries, because query is already executed
   * If we go into negative territory it will efficiently stop query execution at point 2. anyway and also
   * will require user to cover for any consumed credits
   * Alternative approach would be permit or reservation based, when step 2. reserves some amount and step 4. commits actual one,
   * but it still requires to know reservation size in advance and requires more coordination on db level.
   */
  forceConsumeCreditsForUser: CreditOutcome;
  loginWithPassword: Auth;
  loginWithSignature: Auth;
  refreshAccessToken: Auth;
  transactionHashV2: Scalars['String'];
  transactionHashV3: Scalars['String'];
  transactions: Array<RouteTransactionType>;
  transactionsV2: PostRouteTypeV2;
  transactionsV3: PostRouteTypeV3;
  transactonHash: Scalars['String'];
  updateUserSettings: User;
  /** Create or update a referrer. If id is provided, the referrer will be updated.Otherwise, a new referrer will be created. Sig controlled by an admin */
  upsertReferrer?: Maybe<Referrer>;
  /** Create or update a referrer. If id is provided, the referrer will be updated.Otherwise, a new referrer will be created. Sig controlled by an admin */
  upsertReferrerV3?: Maybe<ReferrerV3>;
};

export type MutationAddCommentArgs = {
  address: Scalars['String'];
  comment: Scalars['String'];
  source: Scalars['String'];
};

export type MutationAddCreditsForUserArgs = {
  creditAmount: Scalars['Int'];
  externalUserId: Scalars['String'];
};

export type MutationAddUserAddressArgs = {
  address: Scalars['String'];
  chain: LoginChain;
  signature: Scalars['String'];
};

export type MutationConsumeCreditsForUserArgs = {
  creditAmount: Scalars['Int'];
  externalUserId: Scalars['String'];
};

export type MutationCreateReferrerArgs = {
  referrer: CreateReferrer;
};

export type MutationCreateReferrerV3Args = {
  referrer: CreateReferrerV3;
};

export type MutationCreateUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationForceConsumeCreditsForUserArgs = {
  creditAmount: Scalars['Int'];
  externalUserId: Scalars['String'];
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

export type MutationTransactionHashV3Args = {
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

export type MutationTransactionsV3Args = {
  routeData: RouteInputTypeV3;
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
  address: Scalars['String'];
  feeTier: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type MutationUpsertReferrerV3Args = {
  address: Scalars['String'];
  feeTier: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

/** attributes data from opensea spec <https://docs.opensea.io/docs/metadata-standards> */
export type NftAttribute = {
  __typename?: 'NFTAttribute';
  displayType?: Maybe<Scalars['String']>;
  traitType: Scalars['String'];
  /** according to opensea spec this can be string or number or float number */
  value: Scalars['JSON'];
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

export type NftLastSaleV2 = {
  __typename?: 'NFTLastSaleV2';
  cryptoPrice?: Maybe<Amount>;
  fiatPrice?: Maybe<Amount>;
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

export type NfTv3 = {
  __typename?: 'NFTv3';
  attributes: Array<NftAttribute>;
  balance: Amount;
  collection?: Maybe<NftCollectionV2>;
  contractType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isNftSpam: Scalars['Boolean'];
  lastSale?: Maybe<NftLastSaleV2>;
  location?: Maybe<Scalars['String']>;
  media: Array<MediaV2>;
  name: Scalars['String'];
  owner: Scalars['String'];
  spamScore?: Maybe<Scalars['Float']>;
  symbol: Scalars['String'];
};

export type NearChain = {
  __typename?: 'NearChain';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: NearTransactionConnection;
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
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type NearTransaction = {
  __typename?: 'NearTransaction';
  blockIndex: Scalars['Int'];
  blockNumber: Scalars['Int'];
  fee?: Maybe<Scalars['JSON']>;
  fromAddress: Scalars['String'];
  hash: Scalars['String'];
  inputData?: Maybe<Scalars['JSON']>;
  logs?: Maybe<Scalars['JSON']>;
  raw?: Maybe<Scalars['JSON']>;
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
  toAddress: Scalars['String'];
  transfers: Array<AssetTransferV2>;
  type: Scalars['String'];
};

export type NearTransactionConnection = {
  __typename?: 'NearTransactionConnection';
  /** A list of edges. */
  edges: Array<NearTransactionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type NearTransactionEdge = {
  __typename?: 'NearTransactionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: NearTransaction;
};

export type NftAsset = {
  __typename?: 'NftAsset';
  /** supported list of chain are in [`crate::chain::Chain`] enum */
  chain?: Maybe<Scalars['String']>;
  /** ID of contract (contract address in most chain) */
  contract?: Maybe<Scalars['String']>;
  /** Details of the NFT */
  nft?: Maybe<NfTv2>;
  /** ID of the token. */
  tokenId: Scalars['String'];
};

/**
 * (experimental) NFT for a given chain, contract and token_id
 *
 * # Note
 * This is just to query different service to resolve NFT details
 */
export type NftV0 = {
  __typename?: 'NftV0';
  attributes: Array<NftAttribute>;
  chain: Scalars['String'];
  contract: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  symbol?: Maybe<Scalars['String']>;
  tokenId: Scalars['String'];
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
  average24hFee?: Maybe<Eip1559GasFee>;
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type OptimismBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type OptimismLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type OptimismNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type OptimismTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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
  average24hFee?: Maybe<Eip1559GasFee>;
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type PolygonBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type PolygonLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type PolygonNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type PolygonTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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

export enum PortfolioChainVariant {
  Akash = 'Akash',
  Arbitrum = 'Arbitrum',
  AssetMantle = 'AssetMantle',
  Aurora = 'Aurora',
  Avalanche = 'Avalanche',
  Axelar = 'Axelar',
  Band = 'Band',
  BinanceChain = 'BinanceChain',
  BinanceSmartChain = 'BinanceSmartChain',
  Bitcanna = 'Bitcanna',
  Bitcoin = 'Bitcoin',
  BitcoinCash = 'BitcoinCash',
  Bitsong = 'Bitsong',
  Canto = 'Canto',
  CantoEVM = 'CantoEVM',
  Celo = 'Celo',
  Cerberus = 'Cerberus',
  Chihuahua = 'Chihuahua',
  Comdex = 'Comdex',
  Cosmos = 'Cosmos',
  Crescent = 'Crescent',
  Cronos = 'Cronos',
  Cudos = 'Cudos',
  Desmos = 'Desmos',
  Dogecoin = 'Dogecoin',
  Emoney = 'Emoney',
  Ethereum = 'Ethereum',
  Evmos = 'Evmos',
  Fantom = 'Fantom',
  Gnosis = 'Gnosis',
  Harmony = 'Harmony',
  Injective = 'Injective',
  Iris = 'Iris',
  JUNO = 'JUNO',
  Kava = 'Kava',
  KiChain = 'KiChain',
  Klaytn = 'Klaytn',
  Konstellation = 'Konstellation',
  Kujira = 'Kujira',
  LikeCoin = 'LikeCoin',
  Litecoin = 'Litecoin',
  Lum = 'Lum',
  MarsProtocol = 'MarsProtocol',
  Near = 'Near',
  Neutron = 'Neutron',
  OKExChain = 'OKExChain',
  Oasis = 'Oasis',
  Optimism = 'Optimism',
  Osmosis = 'Osmosis',
  Persistence = 'Persistence',
  Polygon = 'Polygon',
  Provenance = 'Provenance',
  Regen = 'Regen',
  Rizon = 'Rizon',
  Secret = 'Secret',
  Sentinel = 'Sentinel',
  Shentu = 'Shentu',
  Sifchain = 'Sifchain',
  Solana = 'Solana',
  Sommelier = 'Sommelier',
  Stargaze = 'Stargaze',
  Starname = 'Starname',
  Stride = 'Stride',
  THORChain = 'THORChain',
  Terra = 'Terra',
  TerraClassic = 'TerraClassic',
  TomoChain = 'TomoChain',
  Tron = 'Tron',
  Umee = 'Umee',
}

export type PostRouteTypeV2 = {
  __typename?: 'PostRouteTypeV2';
  routeId: Scalars['String'];
};

export type PostRouteTypeV3 = {
  __typename?: 'PostRouteTypeV3';
  routeId: Scalars['String'];
};

/** Prices history contains history information for each asset: its price, market caps and total volumes. All those metrics provided for different time frames: day, week, month and year. */
export type PriceHistoryType = {
  __typename?: 'PriceHistoryType';
  /** History metrics of asset for last day */
  day?: Maybe<TimeFrameItem>;
  /** History metrics of asset for last month */
  month?: Maybe<TimeFrameItem>;
  /** History metrics of asset for last week */
  week?: Maybe<TimeFrameItem>;
  /** History metrics of asset for last year */
  year?: Maybe<TimeFrameItem>;
};

export type PriceInputV2 = {
  amount?: Scalars['String'];
  scalingFactor?: Scalars['Int'];
};

export type PriceInputV3 = {
  amount?: Scalars['String'];
  scalingFactor?: Scalars['Int'];
};

export type ProviderHealth = {
  __typename?: 'ProviderHealth';
  error?: Maybe<Scalars['String']>;
  isFine: Scalars['Boolean'];
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

export type ProviderInputTypeV3 = {
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

export type ProviderTypeV3 = {
  __typename?: 'ProviderTypeV3';
  icon: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  time: Scalars['String'];
};

export enum Providers {
  Lido = 'Lido',
  Meria = 'Meria',
  StakeLab = 'StakeLab',
  Stride = 'Stride',
}

export type Query = {
  __typename?: 'Query';
  akash: CosmosBasedChain;
  arbitrum: Arbitrum;
  assets: AssetType;
  aurora: Aurora;
  avalanche: Avalanche;
  axelar: CosmosBasedChain;
  base: Base;
  binance: Binance;
  binanceSmartChain: BinanceSmartChain;
  bitcoin: BitcoinChain;
  bitcoinTestnet: BitcoinChainTestNet;
  bitcoincash: BitcoincashChain;
  bitcoincashTestnet: BitcoincashChainTestNet;
  canto: CantoChain;
  cantoEVM: CantoEvm;
  chains: Array<ChainType>;
  /** Fetch composite tokens */
  compositeTokens: Array<CompositeTokenType>;
  cosmos: CosmosBasedChain;
  cosmoshub: CosmosBasedChain;
  crescent: CosmosBasedChain;
  cronos: CosmosBasedChain;
  cronosEVM: CronosEvm;
  /** Fetch list of all available tokens */
  cryptoCurrencies: Array<CryptoCurrencyType>;
  dapp: DAppReputation;
  decodeTransaction?: Maybe<DecodedTransaction>;
  dogecoin: DogeChain;
  ethereum: Ethereum;
  /** @deprecated Passing a dictionary object is better than a JSON. Use explainTransactionV2. */
  explainTransaction?: Maybe<ExplainedTransaction>;
  explainTransactionV2?: Maybe<ExplainedTransaction>;
  fantom: Fantom;
  /** Fetch list of fiat currencies */
  fiatCurrencies: Array<FiatCurrencyType>;
  gnosis: Gnosis;
  injective: CosmosBasedChain;
  investing: InvestingType;
  juno: JunoChain;
  kava: CosmosBasedChain;
  klaytn: Klaytn;
  kujira: CosmosBasedChain;
  litecoin: LitecoinChain;
  litecoinTestnet: LitecoinChainTestNet;
  lpTokens: Array<LpBalance>;
  mars: CosmosBasedChain;
  near: NearChain;
  optimism: Optimism;
  osmosis: CosmosBasedChain;
  polygon: Polygon;
  portfolio: Array<ChainPortfolio>;
  quasar: CosmosBasedChain;
  reputation: Reputation;
  routing: RoutingType;
  routingV2?: Maybe<RoutingTypeV2>;
  routingV3?: Maybe<RoutingTypeV3>;
  sei: CosmosBalanceChain;
  solana: SolanaChain;
  staking: StakingService;
  stargaze: StargazeChain;
  stride: CosmosBasedChain;
  /** Terra2 */
  terra: TerraChain;
  /** Terra1 */
  terraClassic: TerraChain;
  thorchain: ThorChain;
  /** Fetch list of all available tokens */
  tokens: Array<TokenType>;
  trackWalletConnect?: Maybe<Wallet>;
  trackWalletConnectV3?: Maybe<WalletV3>;
  tron: Tron;
  user: User;
  version: Scalars['String'];
  /** Fetch wallet information */
  walletInfo: WalletInfo;
  /** Fetch wallet information */
  walletInfoV3: WalletInfoV3;
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

export type QueryDappArgs = {
  app: DAppReputationInput;
};

export type QueryDecodeTransactionArgs = {
  chain: Scalars['String'];
  payload: Scalars['String'];
  to: Scalars['String'];
};

export type QueryExplainTransactionArgs = {
  chain: Scalars['String'];
  payload: Scalars['String'];
};

export type QueryExplainTransactionV2Args = {
  payload: TransactionPayload;
};

export type QueryFiatCurrenciesArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
};

export type QueryLpTokensArgs = {
  address: Scalars['String'];
  chains?: InputMaybe<Array<Scalars['String']>>;
};

export type QueryPortfolioArgs = {
  timePeriod: TimePeriod;
  wallets: Array<ChainedAddresses>;
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

export type QueryTrackWalletConnectV3Args = {
  walletAddress: Scalars['String'];
  walletProvider: Scalars['String'];
};

export type QueryWalletInfoArgs = {
  address: Scalars['String'];
};

export type QueryWalletInfoV3Args = {
  address: Scalars['String'];
};

/** (experimental) Represent receive asset activity, valid with wallet context */
export type ReceiveAssetActivityV0 = {
  __typename?: 'ReceiveAssetActivityV0';
  amount: Scalars['String'];
  asset: AssetV0;
  /** Represent wallet address that send the asset */
  from: Array<Scalars['String']>;
};

export type ReferralBonus = {
  __typename?: 'ReferralBonus';
  bonus?: Maybe<Scalars['Decimal']>;
};

export type ReferralBonusV3 = {
  __typename?: 'ReferralBonusV3';
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

export type ReferralFeeSummaryV3 = {
  __typename?: 'ReferralFeeSummaryV3';
  bonusArbEarned: Scalars['Decimal'];
  claimHistory: Array<ClaimStatusV3>;
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

export type ReferralInputTypeV3 = {
  link?: InputMaybe<Scalars['String']>;
  medium?: InputMaybe<Scalars['String']>;
};

export type ReferralType = {
  __typename?: 'ReferralType';
  link?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
};

export type ReferralTypeV3 = {
  __typename?: 'ReferralTypeV3';
  link?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
};

export type Referrer = {
  __typename?: 'Referrer';
  /** On chain wallet address of the referrer. Must be unique */
  address: Scalars['String'];
  /** Fee tier of the referrer. Must be between [0, 1] */
  feeTier: Scalars['String'];
  id: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  /** Name of the Referrer. Must be unique */
  name: Scalars['String'];
};

export type ReferrerV3 = {
  __typename?: 'ReferrerV3';
  /** On chain wallet address of the referrer. Must be unique */
  address: Scalars['String'];
  /** Fee tier of the referrer. Must be between [0, 1] */
  feeTier: Scalars['String'];
  id: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  /** Name of the Referrer. Must be unique */
  name: Scalars['String'];
};

export type ReferrerWithFees = {
  __typename?: 'ReferrerWithFees';
  /** On chain wallet address of the referrer. Must be unique */
  address: Scalars['String'];
  /** Fees that the referrer already claimed from XDEFI */
  collectedFees?: Maybe<Scalars['Decimal']>;
  /** Fee tier of the referrer. Must be between [0, 1] */
  feeTier: Scalars['String'];
  /** Total fees generated by the referrer for XDEFI */
  generatedFees?: Maybe<Scalars['Decimal']>;
  id: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  /** Name of the Referrer. Must be unique */
  name: Scalars['String'];
};

export type ReferrerWithFeesV3 = {
  __typename?: 'ReferrerWithFeesV3';
  /** On chain wallet address of the referrer. Must be unique */
  address: Scalars['String'];
  /** Fees that the referrer already claimed from XDEFI */
  collectedFees?: Maybe<Scalars['Decimal']>;
  /** Fee tier of the referrer. Must be between [0, 1] */
  feeTier: Scalars['String'];
  /** Total fees generated by the referrer for XDEFI */
  generatedFees?: Maybe<Scalars['Decimal']>;
  id: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  /** Name of the Referrer. Must be unique */
  name: Scalars['String'];
};

export type RefuelInfoType = {
  __typename?: 'RefuelInfoType';
  destChain: Scalars['String'];
  maxAmount: Scalars['Decimal'];
  minAmount: Scalars['Decimal'];
  srcChain: Scalars['String'];
};

export type RefuelInfoTypeV3 = {
  __typename?: 'RefuelInfoTypeV3';
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

export type RewardInputType = {
  amount?: Scalars['Decimal'];
  amountUsd?: Scalars['Decimal'];
  asset: RoutingTokenInputTypeV2;
};

export type RewardInputTypeV3 = {
  amount?: Scalars['Decimal'];
  amountUsd?: Scalars['Decimal'];
  asset: RoutingTokenInputTypeV3;
};

export type RewardType = {
  __typename?: 'RewardType';
  amount: Scalars['Decimal'];
  amountUsd: Scalars['Decimal'];
  asset: RoutingTokenTypeV2;
};

export type RewardTypeV3 = {
  __typename?: 'RewardTypeV3';
  amount: Scalars['Decimal'];
  amountUsd: Scalars['Decimal'];
  asset: RoutingTokenTypeV3;
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

export type RouteInputTypeV3 = {
  addresses: Array<AddressRouteInputTypeV3>;
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
  tradesRoute: Array<TradeRouteInputTypeV3>;
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
  reward?: Maybe<RewardType>;
  tradeType: Scalars['String'];
};

export type RouteTradeTypeV3 = {
  __typename?: 'RouteTradeTypeV3';
  amountIn: Scalars['Decimal'];
  amountOut: Scalars['Decimal'];
  assetIn: RoutingTokenTypeV3;
  assetOut: RoutingTokenTypeV3;
  fee: RoutingFeeTypeV3;
  minAmountReceived: Scalars['Decimal'];
  priceRateUsdAssetIn: Scalars['Decimal'];
  priceRateUsdAssetOut: Scalars['Decimal'];
  provider: ProviderTypeV3;
  referral?: Maybe<ReferralTypeV3>;
  reward?: Maybe<RewardTypeV3>;
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

export type RouteTransactionStatusV3 = {
  __typename?: 'RouteTransactionStatusV3';
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
  tradeId: Scalars['String'];
  tradeRoute: RouteTradeTypeV2;
  transaction?: Maybe<RouteTransactionTypeV2>;
};

export type RouteTransactionTradeTypeV3 = {
  __typename?: 'RouteTransactionTradeTypeV3';
  routeId: Scalars['String'];
  status: RouteTransactionStatusV3;
  tradeId: Scalars['String'];
  tradeRoute: RouteTradeTypeV3;
  transaction?: Maybe<RouteTransactionTypeV3>;
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

export type RouteTransactionTypeV3 = {
  __typename?: 'RouteTransactionTypeV3';
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
  /**
   * On chain wallet address of the referrer. Must be unique
   * @deprecated Not necessary anymore, now this data is stored in the Campaigns service
   */
  isOptIn?: Maybe<Scalars['Boolean']>;
  priceImpact: Scalars['String'];
  priceRate: Scalars['Decimal'];
  priceRateText: Scalars['String'];
  slippage: Scalars['Decimal'];
  tradesRoute: Array<RouteTradeTypeV2>;
};

export type RouteTypeV3 = {
  __typename?: 'RouteTypeV3';
  addresses: Array<AddressRouteTypeV3>;
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
  tradesRoute: Array<RouteTradeTypeV3>;
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

export type RoutingChainTypeV3 = {
  __typename?: 'RoutingChainTypeV3';
  name: Scalars['String'];
  tokens: Array<Maybe<RoutingTokenTypeV3>>;
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

export type RoutingFeeInputTypeV3 = {
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

export type RoutingFeeTypeV3 = {
  __typename?: 'RoutingFeeTypeV3';
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

export type RoutingTokenInputTypeV3 = {
  asset?: InputMaybe<CryptoAssetInputV3>;
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

export type RoutingTokenTypeV3 = {
  __typename?: 'RoutingTokenTypeV3';
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
  leaderboard: Leaderboard;
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
  routeId: Scalars['UUID'];
};

export type RoutingTypeV3 = {
  __typename?: 'RoutingTypeV3';
  addressCheckV3: AddressRouteCheckTypeV3;
  allReferrersV3?: Maybe<Array<ReferrerWithFeesV3>>;
  bridgeableTokensV3: Array<RoutingTokenTypeV3>;
  chainV3: RoutingChainTypeV3;
  chainsV3: Array<RoutingChainTypeV3>;
  dailyVolumeV3?: Maybe<Array<VolumeHistoryV3>>;
  getArbGaugeV3: ReferralBonusV3;
  leaderboardV3: LeaderboardV3;
  referrerSummaryV3: ReferralFeeSummaryV3;
  refuelInfoV3: RefuelInfoTypeV3;
  refuelV3: RouteTypeV3;
  routeV3: RouteTypeV3;
  tokenV3: RoutingTokenTypeV3;
  tokensV3: Array<RoutingTokenTypeV3>;
  tradeV3: RouteTransactionTradeTypeV3;
  tradesV3: Array<RouteTransactionTradeTypeV3>;
};

export type RoutingTypeV3AddressCheckV3Args = {
  address: AddressRouteInputTypeV3;
};

export type RoutingTypeV3BridgeableTokensV3Args = {
  bridgeToken?: InputMaybe<BridgeTokenInputV3>;
  tokenId?: InputMaybe<Scalars['String']>;
};

export type RoutingTypeV3ChainV3Args = {
  name: Scalars['String'];
};

export type RoutingTypeV3DailyVolumeV3Args = {
  startDate?: Scalars['String'];
};

export type RoutingTypeV3RefuelInfoV3Args = {
  destChain: Scalars['String'];
  srcChain: Scalars['String'];
};

export type RoutingTypeV3RefuelV3Args = {
  addresses: Array<AddressRouteInputTypeV3>;
  amountSource?: InputMaybe<Scalars['String']>;
  destAddress: Scalars['String'];
  destToken: Scalars['String'];
  referral?: InputMaybe<ReferralInputTypeV3>;
  srcToken: Scalars['String'];
};

export type RoutingTypeV3RouteV3Args = {
  addresses: Array<AddressRouteInputTypeV3>;
  amountSource?: InputMaybe<Scalars['String']>;
  destAddress: Scalars['String'];
  destToken: Scalars['String'];
  infiniteApproval?: InputMaybe<Scalars['Boolean']>;
  isLedgerLive?: InputMaybe<Scalars['Boolean']>;
  isOptedIn?: InputMaybe<Scalars['Boolean']>;
  referral?: InputMaybe<ReferralInputTypeV3>;
  slippage: Scalars['String'];
  srcToken: Scalars['String'];
};

export type RoutingTypeV3TokenV3Args = {
  id: Scalars['String'];
};

export type RoutingTypeV3TokensV3Args = {
  names?: InputMaybe<Array<Scalars['String']>>;
  tokenIds?: InputMaybe<Array<Scalars['String']>>;
};

export type RoutingTypeV3TradeV3Args = {
  tradeId: Scalars['String'];
};

export type RoutingTypeV3TradesV3Args = {
  routeId: Scalars['String'];
};

/**
 * (experimental) Represent send asset activity, valid with wallet context
 * TODOs: check ReceiveAssetActivityV0
 */
export type SendAssetActivityV0 = {
  __typename?: 'SendAssetActivityV0';
  amount: Scalars['String'];
  asset: AssetV0;
  /** Represent wallet address that receive the asset */
  to: Array<Scalars['String']>;
};

export type Settings = {
  __typename?: 'Settings';
  private?: Maybe<Scalars['String']>;
};

export type SolanaChain = {
  __typename?: 'SolanaChain';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  /** (experimental) Get latest wallet activity */
  latestHistoryActivityV0: WalletActivityV0Connection;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: SolanaStatus;
  transactions: SolanaTransactionConnection;
  version: Array<Version>;
};

export type SolanaChainBalancesArgs = {
  address: Scalars['String'];
};

export type SolanaChainLatestHistoryActivityV0Args = {
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
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type SolanaStatus = {
  __typename?: 'SolanaStatus';
  lastBlock: Scalars['Int'];
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

export type SolanaTransactionConnection = {
  __typename?: 'SolanaTransactionConnection';
  /** A list of edges. */
  edges: Array<SolanaTransactionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SolanaTransactionEdge = {
  __typename?: 'SolanaTransactionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: SolanaTransaction;
};

export type StakingService = {
  __typename?: 'StakingService';
  /** Returns a delegate tx in json format for Cosmos chains, either provider a Cosmos validator from providers or a valoper address but not both. */
  createCosmosDelegateTx: Scalars['String'];
  createCosmosIbcTransferTx: Scalars['String'];
  /** Returns a delegate tx in json format for Cosmos chains, either provider a Cosmos validator from providers or a valoper address but not both. */
  createCosmosUndelegateTx: Scalars['String'];
  createLidoStakeTx: LidoStakePreview;
  createStrideLiquidStakingTx: Scalars['String'];
  /** Returns a list of all APRs for all of the supported Providers per supported asset for each provider. */
  getAnnualPercentageRates: Array<AnnualPercentageRate>;
  /** Returns the currenct cosmos zone height based on the asset */
  getCosmosChainHeight: Scalars['Int'];
  /** Returns nativly staked assets balances by the supported providers */
  getCosmosDelegations: Array<CosmosNativeStakedBalance>;
  /** Returns the transaction count for ETH only */
  getEthAddressNonce: Scalars['Int'];
  /** Returns balance for the staked token on Lido contract on Ethereum */
  getLidoStakedBalance: LidoStakedAssetBalance;
  /** Returns a list of supported assets for any given provider */
  getProviderSupportedAssets: Array<SupportedAssets>;
  getStrideStakedAssetBalance: StrideStakedAssetBalance;
  name: Scalars['String'];
  stakingServiceStatus: StakingServiceStatus;
};

export type StakingServiceCreateCosmosDelegateTxArgs = {
  delegationInput: CosmosDelegationInput;
  provider?: InputMaybe<Providers>;
  validatorAddress?: InputMaybe<Scalars['String']>;
};

export type StakingServiceCreateCosmosIbcTransferTxArgs = {
  input: CosmosIbcTransferInput;
  provider: Providers;
};

export type StakingServiceCreateCosmosUndelegateTxArgs = {
  delegationInput: CosmosDelegationInput;
  provider?: InputMaybe<Providers>;
  validatorAddress?: InputMaybe<Scalars['String']>;
};

export type StakingServiceCreateLidoStakeTxArgs = {
  input: LidoStakingInput;
};

export type StakingServiceCreateStrideLiquidStakingTxArgs = {
  input: StrideStakingInput;
};

export type StakingServiceGetCosmosChainHeightArgs = {
  asset: SupportedAssets;
};

export type StakingServiceGetCosmosDelegationsArgs = {
  address: Scalars['String'];
  asset: SupportedAssets;
};

export type StakingServiceGetEthAddressNonceArgs = {
  address: Scalars['String'];
};

export type StakingServiceGetLidoStakedBalanceArgs = {
  address: Scalars['String'];
  asset: SupportedAssets;
};

export type StakingServiceGetProviderSupportedAssetsArgs = {
  provider: Providers;
};

export type StakingServiceGetStrideStakedAssetBalanceArgs = {
  asset: SupportedAssets;
  strideAddress: Scalars['String'];
};

export type StakingServiceStatus = {
  __typename?: 'StakingServiceStatus';
  error?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type StargazeChain = {
  __typename?: 'StargazeChain';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
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
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Status = {
  __typename?: 'Status';
  lastBlock: Scalars['Int'];
};

export type Statusv2 = {
  __typename?: 'Statusv2';
  blockbookHealth: ProviderHealth;
  blockchairHealth: ProviderHealth;
};

export type StrideStakedAssetBalance = {
  __typename?: 'StrideStakedAssetBalance';
  amount: Scalars['Int'];
  decimal: Scalars['Int'];
  denom: Scalars['String'];
};

export type StrideStakingInput = {
  amount: Scalars['Decimal'];
  asset: SupportedAssets;
  gasLimit?: InputMaybe<Scalars['Decimal']>;
  recieverStrideAddr: Scalars['String'];
  senderAddr: Scalars['String'];
  senderPubkeyHex: Scalars['String'];
  timeoutHeight: Scalars['Int'];
};

export enum SupportedAssets {
  AKASH = 'AKASH',
  ATOM = 'ATOM',
  AVAX = 'AVAX',
  AXL = 'AXL',
  CRE = 'CRE',
  ETH = 'ETH',
  JUNO = 'JUNO',
  KAVA = 'KAVA',
  KUJI = 'KUJI',
  LUNA = 'LUNA',
  MATIC_ERC20 = 'MATIC_ERC20',
  OSMO = 'OSMO',
  SEI = 'SEI',
  SOL = 'SOL',
  STARS = 'STARS',
  STRD = 'STRD',
}

export type TerraChain = {
  __typename?: 'TerraChain';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  status: Status;
  version: Array<Version>;
};

export type TerraChainBalancesArgs = {
  address: Scalars['String'];
};

export type TerraChainLegacyNfTsArgs = {
  address: Scalars['String'];
};

export type ThorChain = {
  __typename?: 'ThorChain';
  balances: Array<Balance>;
  name: Scalars['String'];
  status: Status;
  transactions: ThorchainTransactionConnection;
  version: Array<Version>;
};

export type ThorChainBalancesArgs = {
  address: Scalars['String'];
};

export type ThorChainTransactionsArgs = {
  address: Scalars['String'];
  pagination?: CursorPagination;
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

export type ThorchainTransactionConnection = {
  __typename?: 'ThorchainTransactionConnection';
  /** A list of edges. */
  edges: Array<ThorchainTransactionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ThorchainTransactionEdge = {
  __typename?: 'ThorchainTransactionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: ThorchainTransaction;
};

/** Contains data item for each metric field of each time frame */
export type TimeFrameData = {
  __typename?: 'TimeFrameData';
  /** Assets price */
  price: Scalars['Float'];
  /** Timestamp for assets price */
  timestamp: Scalars['Float'];
};

/** Contains history metrcis of asset for one specific time frame */
export type TimeFrameItem = {
  __typename?: 'TimeFrameItem';
  /** Contains market caps of asset for one time frame */
  market_caps: Array<TimeFrameData>;
  /** Contains prices of asset for one time frame */
  prices: Array<TimeFrameData>;
  /** Contains total_volumes of asset for one time frame */
  total_volumes: Array<TimeFrameData>;
};

/** Chronoscales */
export enum TimePeriod {
  ALL = 'ALL',
  DAY = 'DAY',
  MONTH = 'MONTH',
  WEEK = 'WEEK',
  YEAR = 'YEAR',
}

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

/** (experimental) Represent Token for a given chain, contract and token_id */
export type TokenV0 = {
  __typename?: 'TokenV0';
  chain: Scalars['String'];
  /** Contract for EVM/Cosmos and program_id for Solana */
  contract?: Maybe<Scalars['String']>;
  decimals: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  /** Null for EVM/Cosmos and mint for Solana */
  tokenId?: Maybe<Scalars['String']>;
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
  reward?: InputMaybe<RewardInputType>;
  tradeType: Scalars['String'];
};

export type TradeRouteInputTypeV3 = {
  amountIn: Scalars['Decimal'];
  amountOut: Scalars['Decimal'];
  assetIn: RoutingTokenInputTypeV3;
  assetOut: RoutingTokenInputTypeV3;
  fee: RoutingFeeInputTypeV3;
  minAmountReceived: Scalars['Decimal'];
  priceRateUsdAssetIn: Scalars['Decimal'];
  priceRateUsdAssetOut: Scalars['Decimal'];
  provider: ProviderInputTypeV3;
  referral?: InputMaybe<ReferralInputTypeV3>;
  reward?: InputMaybe<RewardInputTypeV3>;
  tradeType: Scalars['String'];
};

export type TransactionCallArg = {
  __typename?: 'TransactionCallArg';
  name: Scalars['String'];
  standardisedName: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};

/** Transaction object with necessary fields for simulation and classification. */
export type TransactionPayload = {
  chain?: InputMaybe<ClassifierChainType>;
  data: Scalars['String'];
  fromAddress: Scalars['String'];
  to: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
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

export type TrendingTokensType = {
  __typename?: 'TrendingTokensType';
  assetId: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: AssetAmountType;
  symbol: Scalars['String'];
  type: AssetInternalType;
};

export type Tron = {
  __typename?: 'Tron';
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type TronBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type TronNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type TronTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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
  balanceChange?: Maybe<Amount>;
  /** @deprecated Not used in the txs, is to be removed in the next version */
  blockIndex?: Maybe<Scalars['Int']>;
  blockNumber?: Maybe<Scalars['Int']>;
  fee?: Maybe<Amount>;
  hash: Scalars['String'];
  inputs?: Maybe<Array<Input>>;
  outputs?: Maybe<Array<Output>>;
  status?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['DateTime']>;
};

export type UtxoTransactionByHashV4 = {
  __typename?: 'UTXOTransactionByHashV4';
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
  vin: Array<UtxoVinV2>;
  /** vout */
  vout: Array<UtxoVout>;
  /** (numeric) The virtual transaction size (differs from size for witness transactions) */
  vsize?: Maybe<Scalars['Int']>;
};

export type UtxoTransactionV2 = {
  __typename?: 'UTXOTransactionV2';
  balanceChange?: Maybe<Amount>;
  blockNumber?: Maybe<Scalars['Int']>;
  fee?: Maybe<Amount>;
  hash: Scalars['String'];
  inputs?: Maybe<Array<Input>>;
  outputs?: Maybe<Array<Output>>;
  status?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['DateTime']>;
};

export type UtxoVinV2 = {
  __typename?: 'UTXOVinV2';
  /** (string, optional) Coinbase, if the transactions is a coinbase tx */
  coinbase?: Maybe<Scalars['String']>;
  /** (json object, option) The script */
  scriptSig?: Maybe<UtxoScriptSig>;
  /** (numeric) The script sequence number */
  sequence?: Maybe<Scalars['Int']>;
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

export type UnspentTransactionOutputV4 = {
  __typename?: 'UnspentTransactionOutputV4';
  address?: Maybe<Scalars['String']>;
  iTxHash?: Maybe<Scalars['String']>;
  iTxIndex?: Maybe<Scalars['Int']>;
  isCoinbase?: Maybe<Scalars['Boolean']>;
  isSpent: Scalars['Boolean'];
  oIndex: Scalars['Int'];
  oTxHash: Scalars['String'];
  oTxHex?: Maybe<Scalars['String']>;
  oTxTime?: Maybe<Scalars['DateTime']>;
  scriptHex?: Maybe<Scalars['String']>;
  value: Amount;
};

export type UnspentTransactionOutputV5 = {
  __typename?: 'UnspentTransactionOutputV5';
  address?: Maybe<Scalars['String']>;
  isCoinbase?: Maybe<Scalars['Boolean']>;
  oIndex: Scalars['Int'];
  oTxHash: Scalars['String'];
  oTxHex?: Maybe<Scalars['String']>;
  scriptHex?: Maybe<Scalars['String']>;
  value: Amount;
};

export type User = {
  __typename?: 'User';
  addresses: Array<Address>;
  credits: Credits;
  id: Scalars['ID'];
  settings: Settings;
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

export type VolumeHistoryV3 = {
  __typename?: 'VolumeHistoryV3';
  date: Scalars['String'];
  volume: Scalars['String'];
};

export type Wallet = {
  __typename?: 'Wallet';
  name: Scalars['String'];
};

/** (experimental) Represent wallet activities */
export type WalletActivityV0 = {
  __typename?: 'WalletActivityV0';
  /** Wallet address */
  address: Scalars['String'];
  /** Block height */
  blockHeight: Scalars['Int'];
  /** Chain */
  chain: Scalars['String'];
  /** Time of the activity as ISO 8601 string */
  datetime: Scalars['DateTime'];
  /** Assets movements (primary activities) */
  primary: Array<MoveAssetActivityV0>;
  /** Tx hash */
  txHash: Scalars['String'];
};

export type WalletActivityV0Connection = {
  __typename?: 'WalletActivityV0Connection';
  /** A list of edges. */
  edges: Array<WalletActivityV0Edge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type WalletActivityV0Edge = {
  __typename?: 'WalletActivityV0Edge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: WalletActivityV0;
};

export type WalletInfo = {
  __typename?: 'WalletInfo';
  /** EVM address of the wallet. */
  address: Scalars['String'];
  /** If set to true, wallet is the boss */
  isAdmin: Scalars['Boolean'];
  /** If set to true, wallet is part of the referral program */
  isReferrer: Scalars['Boolean'];
};

export type WalletInfoV3 = {
  __typename?: 'WalletInfoV3';
  /** EVM address of the wallet. */
  address: Scalars['String'];
  /** If set to true, wallet is the boss */
  isAdmin: Scalars['Boolean'];
  /** If set to true, wallet is part of the referral program */
  isReferrer: Scalars['Boolean'];
};

export type WalletV3 = {
  __typename?: 'WalletV3';
  name: Scalars['String'];
};

export type GetBinanceBalancesQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type GetBinanceBalancesQuery = {
  __typename?: 'Query';
  binance: {
    __typename?: 'Binance';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetBinanceTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockSelector>;
}>;

export type GetBinanceTransactionsQuery = {
  __typename?: 'Query';
  binance: {
    __typename?: 'Binance';
    transactions: {
      __typename?: 'BinanceTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'BinanceTransactionEdge';
        node: {
          __typename?: 'BinanceTransaction';
          blockHeight: number;
          data?: any | null;
          fromAddress: string;
          hash: string;
          status: string;
          time: any;
          toAddress?: string | null;
          type: string;
          amount?: { __typename?: 'Amount'; value: string } | null;
          asset?: {
            __typename?: 'CryptoAsset';
            chain?: string | null;
            contract?: string | null;
            decimals?: number | null;
            id?: string | null;
            image?: string | null;
            name?: string | null;
            symbol?: string | null;
            type?: AssetInternalType | null;
            price?: {
              __typename?: 'AssetAmountType';
              amount: string;
              scalingFactor: number;
            } | null;
          } | null;
          fee: { __typename?: 'Amount'; value: string };
        };
      }>;
    };
  };
};

export type GetBinanceFeeQueryVariables = Exact<{ [key: string]: never }>;

export type GetBinanceFeeQuery = {
  __typename?: 'Query';
  binance: { __typename?: 'Binance'; fee?: any | null };
};

export type GetBinanceStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetBinanceStatusQuery = {
  __typename?: 'Query';
  binance: {
    __typename?: 'Binance';
    status: {
      __typename?: 'BinanceStatus';
      lastBlock?: {
        __typename?: 'LastBlock';
        hash: string;
        height: number;
        time: any;
        txCount: number;
      } | null;
    };
  };
};

export type BitcoinBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type BitcoinBalanceQuery = {
  __typename?: 'Query';
  bitcoin: {
    __typename?: 'BitcoinChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: { __typename?: 'AssetAmountType'; amount: string } | null;
      };
    }>;
  };
};

export type GetBitcoinFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetBitcoinFeesQuery = {
  __typename?: 'Query';
  bitcoin: {
    __typename?: 'BitcoinChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetBitcoinTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
}>;

export type GetBitcoinTransactionsQuery = {
  __typename?: 'Query';
  bitcoin: {
    __typename?: 'BitcoinChain';
    transactions: Array<{
      __typename?: 'UTXOTransaction';
      blockNumber?: number | null;
      hash: string;
      timestamp?: any | null;
      status?: string | null;
      balanceChange?: { __typename?: 'Amount'; value: string } | null;
      fee?: { __typename?: 'Amount'; value: string } | null;
      inputs?: Array<{
        __typename?: 'Input';
        address: string;
        amount: { __typename?: 'Amount'; value: string };
      }> | null;
      outputs?: Array<{
        __typename?: 'Output';
        address: string;
        amount: { __typename?: 'Amount'; value: string };
      }> | null;
    }>;
  };
};

export type BitcoinCashBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type BitcoinCashBalanceQuery = {
  __typename?: 'Query';
  bitcoincash: {
    __typename?: 'BitcoincashChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: { __typename?: 'AssetAmountType'; amount: string } | null;
      };
    }>;
  };
};

export type GetBitcoinCashFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetBitcoinCashFeesQuery = {
  __typename?: 'Query';
  bitcoincash: {
    __typename?: 'BitcoincashChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetBitcoinCashTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
}>;

export type GetBitcoinCashTransactionsQuery = {
  __typename?: 'Query';
  bitcoincash: {
    __typename?: 'BitcoincashChain';
    transactions: Array<{
      __typename?: 'UTXOTransaction';
      blockNumber?: number | null;
      hash: string;
      timestamp?: any | null;
      status?: string | null;
      balanceChange?: { __typename?: 'Amount'; value: string } | null;
      fee?: { __typename?: 'Amount'; value: string } | null;
      inputs?: Array<{
        __typename?: 'Input';
        address: string;
        amount: { __typename?: 'Amount'; value: string };
      }> | null;
      outputs?: Array<{
        __typename?: 'Output';
        address: string;
        amount: { __typename?: 'Amount'; value: string };
      }> | null;
    }>;
  };
};

export type GetAssetsWithFilterQueryVariables = Exact<{
  page: ConnectionArgs;
  filter?: InputMaybe<TokenFilter>;
}>;

export type GetAssetsWithFilterQuery = {
  __typename?: 'Query';
  assets: {
    __typename?: 'AssetType';
    tokens?: {
      __typename?: 'TokenResponse';
      page: {
        __typename?: 'AssetTokenTypeConnection';
        edges?: Array<{
          __typename?: 'AssetTokenTypeEdge';
          node?: {
            __typename?: 'AssetTokenType';
            id: string;
            symbol: string;
            name?: string | null;
            icon?: string | null;
            contracts?: Array<{
              __typename?: 'AssetTokenContractType';
              address: string;
              symbol: string;
              chain: string;
              scalingFactor: number;
            }> | null;
            price?: {
              __typename?: 'AssetAmountType';
              amount: string;
              scalingFactor: number;
            } | null;
          } | null;
        }> | null;
      };
    } | null;
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
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetCosmosTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
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
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetCosmosFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCosmosFeesQuery = {
  __typename?: 'Query';
  cosmos: {
    __typename?: 'CosmosBasedChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
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

export type OsmosisBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type OsmosisBalanceQuery = {
  __typename?: 'Query';
  osmosis: {
    __typename?: 'CosmosBasedChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetOsmosisTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetOsmosisTransactionsQuery = {
  __typename?: 'Query';
  osmosis: {
    __typename?: 'CosmosBasedChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetOsmosisFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetOsmosisFeesQuery = {
  __typename?: 'Query';
  osmosis: {
    __typename?: 'CosmosBasedChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetOsmosisStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetOsmosisStatusQuery = {
  __typename?: 'Query';
  osmosis: {
    __typename?: 'CosmosBasedChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type AxelarBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type AxelarBalanceQuery = {
  __typename?: 'Query';
  axelar: {
    __typename?: 'CosmosBasedChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetAxelarTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetAxelarTransactionsQuery = {
  __typename?: 'Query';
  axelar: {
    __typename?: 'CosmosBasedChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetAxelarFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAxelarFeesQuery = {
  __typename?: 'Query';
  axelar: {
    __typename?: 'CosmosBasedChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetAxelarStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetAxelarStatusQuery = {
  __typename?: 'Query';
  axelar: {
    __typename?: 'CosmosBasedChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type CrescentBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type CrescentBalanceQuery = {
  __typename?: 'Query';
  crescent: {
    __typename?: 'CosmosBasedChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetCrescentTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetCrescentTransactionsQuery = {
  __typename?: 'Query';
  crescent: {
    __typename?: 'CosmosBasedChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetCrescentFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCrescentFeesQuery = {
  __typename?: 'Query';
  crescent: {
    __typename?: 'CosmosBasedChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetCrescentStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetCrescentStatusQuery = {
  __typename?: 'Query';
  crescent: {
    __typename?: 'CosmosBasedChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type KavaBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type KavaBalanceQuery = {
  __typename?: 'Query';
  kava: {
    __typename?: 'CosmosBasedChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetKavaTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetKavaTransactionsQuery = {
  __typename?: 'Query';
  kava: {
    __typename?: 'CosmosBasedChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetKavaFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetKavaFeesQuery = {
  __typename?: 'Query';
  kava: {
    __typename?: 'CosmosBasedChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetKavaStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetKavaStatusQuery = {
  __typename?: 'Query';
  kava: {
    __typename?: 'CosmosBasedChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type AkashBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type AkashBalanceQuery = {
  __typename?: 'Query';
  akash: {
    __typename?: 'CosmosBasedChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetAkashTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetAkashTransactionsQuery = {
  __typename?: 'Query';
  akash: {
    __typename?: 'CosmosBasedChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetAkashFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAkashFeesQuery = {
  __typename?: 'Query';
  akash: {
    __typename?: 'CosmosBasedChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetAkashStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetAkashStatusQuery = {
  __typename?: 'Query';
  akash: {
    __typename?: 'CosmosBasedChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type CronosBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type CronosBalanceQuery = {
  __typename?: 'Query';
  cronos: {
    __typename?: 'CosmosBasedChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetCronosTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetCronosTransactionsQuery = {
  __typename?: 'Query';
  cronos: {
    __typename?: 'CosmosBasedChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetCronosFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCronosFeesQuery = {
  __typename?: 'Query';
  cronos: {
    __typename?: 'CosmosBasedChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetCronosStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetCronosStatusQuery = {
  __typename?: 'Query';
  cronos: {
    __typename?: 'CosmosBasedChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type KujiraBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type KujiraBalanceQuery = {
  __typename?: 'Query';
  kujira: {
    __typename?: 'CosmosBasedChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetKujiraTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetKujiraTransactionsQuery = {
  __typename?: 'Query';
  kujira: {
    __typename?: 'CosmosBasedChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetKujiraFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetKujiraFeesQuery = {
  __typename?: 'Query';
  kujira: {
    __typename?: 'CosmosBasedChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetKujiraStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetKujiraStatusQuery = {
  __typename?: 'Query';
  kujira: {
    __typename?: 'CosmosBasedChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type StrideBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type StrideBalanceQuery = {
  __typename?: 'Query';
  stride: {
    __typename?: 'CosmosBasedChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetStrideTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetStrideTransactionsQuery = {
  __typename?: 'Query';
  stride: {
    __typename?: 'CosmosBasedChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetStrideFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetStrideFeesQuery = {
  __typename?: 'Query';
  stride: {
    __typename?: 'CosmosBasedChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetStrideStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetStrideStatusQuery = {
  __typename?: 'Query';
  stride: {
    __typename?: 'CosmosBasedChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type MarsBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type MarsBalanceQuery = {
  __typename?: 'Query';
  mars: {
    __typename?: 'CosmosBasedChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetMarsTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetMarsTransactionsQuery = {
  __typename?: 'Query';
  mars: {
    __typename?: 'CosmosBasedChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetMarsFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetMarsFeesQuery = {
  __typename?: 'Query';
  mars: {
    __typename?: 'CosmosBasedChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetMarsStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetMarsStatusQuery = {
  __typename?: 'Query';
  mars: {
    __typename?: 'CosmosBasedChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type JunoBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type JunoBalanceQuery = {
  __typename?: 'Query';
  juno: {
    __typename?: 'JunoChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetJunoTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetJunoTransactionsQuery = {
  __typename?: 'Query';
  juno: {
    __typename?: 'JunoChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetJunoFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetJunoFeesQuery = {
  __typename?: 'Query';
  juno: {
    __typename?: 'JunoChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetJunoStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetJunoStatusQuery = {
  __typename?: 'Query';
  juno: {
    __typename?: 'JunoChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type StargazeBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type StargazeBalanceQuery = {
  __typename?: 'Query';
  stargaze: {
    __typename?: 'StargazeChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetStargazeTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  blockRange: OptBlockRange;
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetStargazeTransactionsQuery = {
  __typename?: 'Query';
  stargaze: {
    __typename?: 'StargazeChain';
    transactions: {
      __typename?: 'CosmosLikeTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'CosmosLikeTransactionEdge';
        node: {
          __typename?: 'CosmosLikeTransaction';
          blockHeight: number;
          blockIndex?: number | null;
          hash: string;
          status: string;
          timestamp: any;
          signers: Array<string>;
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              name?: string | null;
              symbol?: string | null;
              image?: string | null;
              decimals?: number | null;
            };
          }>;
          fee?: {
            __typename?: 'CosmosFee';
            payer?: string | null;
            amount: Array<{
              __typename?: 'AssetWithAmount';
              amount: { __typename?: 'Amount'; value: string };
              asset: {
                __typename?: 'CryptoAsset';
                chain?: string | null;
                contract?: string | null;
                decimals?: number | null;
                id?: string | null;
                image?: string | null;
                name?: string | null;
                symbol?: string | null;
                price?: {
                  __typename?: 'AssetAmountType';
                  amount: string;
                } | null;
              };
            }>;
          } | null;
        };
      }>;
    };
  };
};

export type GetStargazeFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetStargazeFeesQuery = {
  __typename?: 'Query';
  stargaze: {
    __typename?: 'StargazeChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetStargazeStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetStargazeStatusQuery = {
  __typename?: 'Query';
  stargaze: {
    __typename?: 'StargazeChain';
    status: { __typename?: 'Status'; lastBlock: number };
  };
};

export type DogecoinBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type DogecoinBalanceQuery = {
  __typename?: 'Query';
  dogecoin: {
    __typename?: 'DogeChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: { __typename?: 'AssetAmountType'; amount: string } | null;
      };
    }>;
  };
};

export type GetDogecoinFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetDogecoinFeesQuery = {
  __typename?: 'Query';
  dogecoin: {
    __typename?: 'DogeChain';
    fee: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    };
  };
};

export type GetDogecoinTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
}>;

export type GetDogecoinTransactionsQuery = {
  __typename?: 'Query';
  dogecoin: {
    __typename?: 'DogeChain';
    transactions: Array<{
      __typename?: 'UTXOTransaction';
      blockNumber?: number | null;
      hash: string;
      timestamp?: any | null;
      status?: string | null;
      balanceChange?: { __typename?: 'Amount'; value: string } | null;
      fee?: { __typename?: 'Amount'; value: string } | null;
      inputs?: Array<{
        __typename?: 'Input';
        address: string;
        amount: { __typename?: 'Amount'; value: string };
      }> | null;
      outputs?: Array<{
        __typename?: 'Output';
        address: string;
        amount: { __typename?: 'Amount'; value: string };
      }> | null;
    }>;
  };
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
        decimals?: number | null;
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          scalingFactor: number;
        } | null;
      };
    }>;
  };
};

export type GetCryptoAssetsQueryVariables = Exact<{
  input: Array<CryptoAssetArgs> | CryptoAssetArgs;
}>;

export type GetCryptoAssetsQuery = {
  __typename?: 'Query';
  assets: {
    __typename?: 'AssetType';
    cryptoAssets?: Array<{
      __typename?: 'CryptoAsset';
      chain?: string | null;
      contract?: string | null;
      id?: string | null;
      name?: string | null;
      symbol?: string | null;
      image?: string | null;
      decimals?: number | null;
      price?: {
        __typename?: 'AssetAmountType';
        amount: string;
        scalingFactor: number;
      } | null;
    }> | null;
  };
};

export type LitecoinBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type LitecoinBalanceQuery = {
  __typename?: 'Query';
  litecoin: {
    __typename?: 'LitecoinChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        image?: string | null;
        name?: string | null;
        symbol?: string | null;
        price?: { __typename?: 'AssetAmountType'; amount: string } | null;
      };
    }>;
  };
};

export type GetLitecoinFeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetLitecoinFeesQuery = {
  __typename?: 'Query';
  litecoin: {
    __typename?: 'LitecoinChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export type GetLitecoinTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
}>;

export type GetLitecoinTransactionsQuery = {
  __typename?: 'Query';
  litecoin: {
    __typename?: 'LitecoinChain';
    transactions: Array<{
      __typename?: 'UTXOTransaction';
      blockNumber?: number | null;
      hash: string;
      timestamp?: any | null;
      status?: string | null;
      balanceChange?: { __typename?: 'Amount'; value: string } | null;
      fee?: { __typename?: 'Amount'; value: string } | null;
      inputs?: Array<{
        __typename?: 'Input';
        address: string;
        amount: { __typename?: 'Amount'; value: string };
      }> | null;
      outputs?: Array<{
        __typename?: 'Output';
        address: string;
        amount: { __typename?: 'Amount'; value: string };
      }> | null;
    }>;
  };
};

export type GetSolanaBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type GetSolanaBalanceQuery = {
  __typename?: 'Query';
  solana: {
    __typename?: 'SolanaChain';
    balances: Array<{
      __typename?: 'Balance';
      address: string;
      amount: { __typename?: 'Amount'; value: string };
      asset: {
        __typename?: 'CryptoAsset';
        chain?: string | null;
        contract?: string | null;
        decimals?: number | null;
        id?: string | null;
        name?: string | null;
        image?: string | null;
        symbol?: string | null;
        price?: { __typename?: 'AssetAmountType'; amount: string } | null;
      };
    }>;
  };
};

export type GetSolanaTransactionsQueryVariables = Exact<{
  address: Scalars['String'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetSolanaTransactionsQuery = {
  __typename?: 'Query';
  solana: {
    __typename?: 'SolanaChain';
    transactions: {
      __typename?: 'SolanaTransactionConnection';
      pageInfo: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename?: 'SolanaTransactionEdge';
        node: {
          __typename?: 'SolanaTransaction';
          hash: string;
          slot: number;
          status: string;
          timestamp?: any | null;
          signers: Array<string>;
          fee: {
            __typename?: 'Fee';
            payer: string;
            amount: { __typename?: 'Amount'; value: string };
          };
          transfers: Array<{
            __typename?: 'AssetTransfer';
            fromAddress?: string | null;
            toAddress?: string | null;
            amount: { __typename?: 'Amount'; value: string };
            asset: {
              __typename?: 'CryptoAsset';
              chain?: string | null;
              contract?: string | null;
              decimals?: number | null;
              id?: string | null;
              image?: string | null;
              name?: string | null;
              symbol?: string | null;
              price?: { __typename?: 'AssetAmountType'; amount: string } | null;
            };
          }>;
        };
      }>;
    };
  };
};

export type GetSolanaStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetSolanaStatusQuery = {
  __typename?: 'Query';
  solana: {
    __typename?: 'SolanaChain';
    status: { __typename?: 'SolanaStatus'; lastBlock: number };
  };
};

export type GetSolanaFeeQueryVariables = Exact<{ [key: string]: never }>;

export type GetSolanaFeeQuery = {
  __typename?: 'Query';
  solana: {
    __typename?: 'SolanaChain';
    fee?: {
      __typename?: 'DefaultGasFee';
      high?: number | null;
      low?: number | null;
      medium?: number | null;
    } | null;
  };
};

export const GetBinanceBalancesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBinanceBalances' },
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
            name: { kind: 'Name', value: 'binance' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
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
  GetBinanceBalancesQuery,
  GetBinanceBalancesQueryVariables
>;
export const GetBinanceTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBinanceTransactions' },
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
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'blockRange' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'OptBlockSelector' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'binance' },
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
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                    name: { kind: 'Name', value: 'amount' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
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
                                    name: { kind: 'Name', value: 'asset' },
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
                                            value: 'decimals',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
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
                                          name: { kind: 'Name', value: 'name' },
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
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'symbol',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'type' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'blockHeight',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'data' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
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
                                    name: { kind: 'Name', value: 'hash' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'status' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'time' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'toAddress' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'type' },
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
  GetBinanceTransactionsQuery,
  GetBinanceTransactionsQueryVariables
>;
export const GetBinanceFeeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBinanceFee' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'binance' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBinanceFeeQuery, GetBinanceFeeQueryVariables>;
export const GetBinanceStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBinanceStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'binance' },
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
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'hash' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'height' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'time' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'txCount' },
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
  GetBinanceStatusQuery,
  GetBinanceStatusQueryVariables
>;
export const BitcoinBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BitcoinBalance' },
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
            name: { kind: 'Name', value: 'bitcoin' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
} as unknown as DocumentNode<BitcoinBalanceQuery, BitcoinBalanceQueryVariables>;
export const GetBitcoinFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBitcoinFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'bitcoin' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetBitcoinFeesQuery, GetBitcoinFeesQueryVariables>;
export const GetBitcoinTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBitcoinTransactions' },
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
            name: { kind: 'Name', value: 'pageSize' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageNumber' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'bitcoin' },
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
                      name: { kind: 'Name', value: 'pageSize' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pageSize' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'pageNumber' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pageNumber' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'balanceChange' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'blockNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fee' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'inputs' },
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
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'outputs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
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
  GetBitcoinTransactionsQuery,
  GetBitcoinTransactionsQueryVariables
>;
export const BitcoinCashBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BitcoinCashBalance' },
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
            name: { kind: 'Name', value: 'bitcoincash' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
  BitcoinCashBalanceQuery,
  BitcoinCashBalanceQueryVariables
>;
export const GetBitcoinCashFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBitcoinCashFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'bitcoincash' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
  GetBitcoinCashFeesQuery,
  GetBitcoinCashFeesQueryVariables
>;
export const GetBitcoinCashTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBitcoinCashTransactions' },
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
            name: { kind: 'Name', value: 'pageSize' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageNumber' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'bitcoincash' },
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
                      name: { kind: 'Name', value: 'pageSize' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pageSize' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'pageNumber' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pageNumber' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'balanceChange' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'blockNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fee' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'inputs' },
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
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'outputs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
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
  GetBitcoinCashTransactionsQuery,
  GetBitcoinCashTransactionsQueryVariables
>;
export const GetAssetsWithFilterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAssetsWithFilter' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ConnectionArgs' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'TokenFilter' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tokens' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'page' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'page' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'filter' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'filter' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'page' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
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
                                            value: 'contracts',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'address',
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
                                                  value: 'chain',
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
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
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
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'symbol',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'icon' },
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
  GetAssetsWithFilterQuery,
  GetAssetsWithFilterQueryVariables
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
export const GetCosmosFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCosmosFees' },
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
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetCosmosFeesQuery, GetCosmosFeesQueryVariables>;
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
export const OsmosisBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'OsmosisBalance' },
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
            name: { kind: 'Name', value: 'osmosis' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
} as unknown as DocumentNode<OsmosisBalanceQuery, OsmosisBalanceQueryVariables>;
export const GetOsmosisTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetOsmosisTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'osmosis' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetOsmosisTransactionsQuery,
  GetOsmosisTransactionsQueryVariables
>;
export const GetOsmosisFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetOsmosisFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'osmosis' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetOsmosisFeesQuery, GetOsmosisFeesQueryVariables>;
export const GetOsmosisStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetOsmosisStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'osmosis' },
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
  GetOsmosisStatusQuery,
  GetOsmosisStatusQueryVariables
>;
export const AxelarBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AxelarBalance' },
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
            name: { kind: 'Name', value: 'axelar' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
} as unknown as DocumentNode<AxelarBalanceQuery, AxelarBalanceQueryVariables>;
export const GetAxelarTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAxelarTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'axelar' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetAxelarTransactionsQuery,
  GetAxelarTransactionsQueryVariables
>;
export const GetAxelarFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAxelarFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'axelar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetAxelarFeesQuery, GetAxelarFeesQueryVariables>;
export const GetAxelarStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAxelarStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'axelar' },
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
  GetAxelarStatusQuery,
  GetAxelarStatusQueryVariables
>;
export const CrescentBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CrescentBalance' },
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
            name: { kind: 'Name', value: 'crescent' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
  CrescentBalanceQuery,
  CrescentBalanceQueryVariables
>;
export const GetCrescentTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCrescentTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'crescent' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetCrescentTransactionsQuery,
  GetCrescentTransactionsQueryVariables
>;
export const GetCrescentFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCrescentFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'crescent' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
  GetCrescentFeesQuery,
  GetCrescentFeesQueryVariables
>;
export const GetCrescentStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCrescentStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'crescent' },
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
  GetCrescentStatusQuery,
  GetCrescentStatusQueryVariables
>;
export const KavaBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'KavaBalance' },
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
            name: { kind: 'Name', value: 'kava' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
} as unknown as DocumentNode<KavaBalanceQuery, KavaBalanceQueryVariables>;
export const GetKavaTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetKavaTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'kava' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetKavaTransactionsQuery,
  GetKavaTransactionsQueryVariables
>;
export const GetKavaFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetKavaFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'kava' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetKavaFeesQuery, GetKavaFeesQueryVariables>;
export const GetKavaStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetKavaStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'kava' },
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
} as unknown as DocumentNode<GetKavaStatusQuery, GetKavaStatusQueryVariables>;
export const AkashBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AkashBalance' },
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
            name: { kind: 'Name', value: 'akash' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
} as unknown as DocumentNode<AkashBalanceQuery, AkashBalanceQueryVariables>;
export const GetAkashTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAkashTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'akash' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetAkashTransactionsQuery,
  GetAkashTransactionsQueryVariables
>;
export const GetAkashFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAkashFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'akash' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetAkashFeesQuery, GetAkashFeesQueryVariables>;
export const GetAkashStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAkashStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'akash' },
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
} as unknown as DocumentNode<GetAkashStatusQuery, GetAkashStatusQueryVariables>;
export const CronosBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CronosBalance' },
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
            name: { kind: 'Name', value: 'cronos' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
} as unknown as DocumentNode<CronosBalanceQuery, CronosBalanceQueryVariables>;
export const GetCronosTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCronosTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cronos' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetCronosTransactionsQuery,
  GetCronosTransactionsQueryVariables
>;
export const GetCronosFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCronosFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cronos' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetCronosFeesQuery, GetCronosFeesQueryVariables>;
export const GetCronosStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCronosStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cronos' },
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
  GetCronosStatusQuery,
  GetCronosStatusQueryVariables
>;
export const KujiraBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'KujiraBalance' },
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
            name: { kind: 'Name', value: 'kujira' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
} as unknown as DocumentNode<KujiraBalanceQuery, KujiraBalanceQueryVariables>;
export const GetKujiraTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetKujiraTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'kujira' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetKujiraTransactionsQuery,
  GetKujiraTransactionsQueryVariables
>;
export const GetKujiraFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetKujiraFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'kujira' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetKujiraFeesQuery, GetKujiraFeesQueryVariables>;
export const GetKujiraStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetKujiraStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'kujira' },
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
  GetKujiraStatusQuery,
  GetKujiraStatusQueryVariables
>;
export const StrideBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'StrideBalance' },
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
            name: { kind: 'Name', value: 'stride' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
} as unknown as DocumentNode<StrideBalanceQuery, StrideBalanceQueryVariables>;
export const GetStrideTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStrideTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stride' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetStrideTransactionsQuery,
  GetStrideTransactionsQueryVariables
>;
export const GetStrideFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStrideFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stride' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetStrideFeesQuery, GetStrideFeesQueryVariables>;
export const GetStrideStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStrideStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stride' },
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
  GetStrideStatusQuery,
  GetStrideStatusQueryVariables
>;
export const MarsBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MarsBalance' },
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
            name: { kind: 'Name', value: 'mars' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
} as unknown as DocumentNode<MarsBalanceQuery, MarsBalanceQueryVariables>;
export const GetMarsTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMarsTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mars' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetMarsTransactionsQuery,
  GetMarsTransactionsQueryVariables
>;
export const GetMarsFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMarsFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mars' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetMarsFeesQuery, GetMarsFeesQueryVariables>;
export const GetMarsStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMarsStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mars' },
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
} as unknown as DocumentNode<GetMarsStatusQuery, GetMarsStatusQueryVariables>;
export const JunoBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'JunoBalance' },
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
            name: { kind: 'Name', value: 'juno' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
} as unknown as DocumentNode<JunoBalanceQuery, JunoBalanceQueryVariables>;
export const GetJunoTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetJunoTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'juno' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetJunoTransactionsQuery,
  GetJunoTransactionsQueryVariables
>;
export const GetJunoFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetJunoFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'juno' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetJunoFeesQuery, GetJunoFeesQueryVariables>;
export const GetJunoStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetJunoStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'juno' },
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
} as unknown as DocumentNode<GetJunoStatusQuery, GetJunoStatusQueryVariables>;
export const StargazeBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'StargazeBalance' },
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
            name: { kind: 'Name', value: 'stargaze' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
  StargazeBalanceQuery,
  StargazeBalanceQueryVariables
>;
export const GetStargazeTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStargazeTransactions' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stargaze' },
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
                      name: { kind: 'Name', value: 'blockRange' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'blockRange' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                                  value: 'name',
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
                                                  value: 'image',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'decimals',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'fee' },
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
                                                  value: 'amount',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
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
                                                        value: 'decimals',
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
                                                        value: 'image',
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
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetStargazeTransactionsQuery,
  GetStargazeTransactionsQueryVariables
>;
export const GetStargazeFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStargazeFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stargaze' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
  GetStargazeFeesQuery,
  GetStargazeFeesQueryVariables
>;
export const GetStargazeStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStargazeStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stargaze' },
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
  GetStargazeStatusQuery,
  GetStargazeStatusQueryVariables
>;
export const DogecoinBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'DogecoinBalance' },
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
            name: { kind: 'Name', value: 'dogecoin' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
  DogecoinBalanceQuery,
  DogecoinBalanceQueryVariables
>;
export const GetDogecoinFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDogecoinFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dogecoin' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
  GetDogecoinFeesQuery,
  GetDogecoinFeesQueryVariables
>;
export const GetDogecoinTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDogecoinTransactions' },
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
            name: { kind: 'Name', value: 'pageSize' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageNumber' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dogecoin' },
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
                      name: { kind: 'Name', value: 'pageSize' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pageSize' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'pageNumber' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pageNumber' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'balanceChange' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'blockNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fee' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'inputs' },
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
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'outputs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
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
  GetDogecoinTransactionsQuery,
  GetDogecoinTransactionsQueryVariables
>;
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
                              name: { kind: 'Name', value: 'decimals' },
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
export const GetCryptoAssetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCryptoAssets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'CryptoAssetArgs' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cryptoAssets' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'input' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'input' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'chain' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contract' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'symbol' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'decimals' },
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
                              name: { kind: 'Name', value: 'scalingFactor' },
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
  GetCryptoAssetsQuery,
  GetCryptoAssetsQueryVariables
>;
export const LitecoinBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'LitecoinBalance' },
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
            name: { kind: 'Name', value: 'litecoin' },
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
                              name: { kind: 'Name', value: 'decimals' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
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
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
  LitecoinBalanceQuery,
  LitecoinBalanceQueryVariables
>;
export const GetLitecoinFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLitecoinFees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'litecoin' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
  GetLitecoinFeesQuery,
  GetLitecoinFeesQueryVariables
>;
export const GetLitecoinTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLitecoinTransactions' },
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
            name: { kind: 'Name', value: 'pageSize' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageNumber' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'litecoin' },
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
                      name: { kind: 'Name', value: 'pageSize' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pageSize' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'pageNumber' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pageNumber' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'balanceChange' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'blockNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fee' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'inputs' },
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
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'outputs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
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
  GetLitecoinTransactionsQuery,
  GetLitecoinTransactionsQueryVariables
>;
export const GetSolanaBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSolanaBalance' },
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
            name: { kind: 'Name', value: 'solana' },
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
                              name: { kind: 'Name', value: 'decimals' },
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
                              name: { kind: 'Name', value: 'price' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'amount' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' },
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
  GetSolanaBalanceQuery,
  GetSolanaBalanceQueryVariables
>;
export const GetSolanaTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSolanaTransactions' },
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
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'solana' },
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
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'after' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'after' },
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
                                    name: { kind: 'Name', value: 'fee' },
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
                                            value: 'payer',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'hash' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'slot' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'status' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'timestamp' },
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
                                                  value: 'decimals',
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
                                                  value: 'image',
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
                                                  ],
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'symbol',
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
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'signers' },
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
  GetSolanaTransactionsQuery,
  GetSolanaTransactionsQueryVariables
>;
export const GetSolanaStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSolanaStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'solana' },
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
  GetSolanaStatusQuery,
  GetSolanaStatusQueryVariables
>;
export const GetSolanaFeeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSolanaFee' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'solana' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'high' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'low' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
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
} as unknown as DocumentNode<GetSolanaFeeQuery, GetSolanaFeeQueryVariables>;

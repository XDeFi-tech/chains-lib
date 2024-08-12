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
  AssetV0Args: any;
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
  IntegerString: any;
  /** A scalar that can represent any JSON value. */
  JSON: any;
  /**
   * A local datetime without timezone offset.
   *
   * The input/output is a string in ISO 8601 format without timezone, including
   * subseconds. E.g. "2022-01-12T07:30:19.12345".
   */
  LocalDateTime: any;
};

export type AccountPortfolioFiat = {
  __typename?: 'AccountPortfolioFiat';
  addresses: Array<AddressPortfolioFiat>;
  /** Provide sum of all addresses with aligned dates */
  sum?: Maybe<SumPortfolioFiat>;
};

/** Represent user Account that holds multiple addresses */
export type AccountPortfolioRequest = {
  addresses: Array<AddressPortfolioRequest>;
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
  Base = 'Base',
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
  Blast = 'Blast',
  /** Legacy, use "Cosmos" instead */
  COSMOS = 'COSMOS',
  Canto = 'Canto',
  CantoEVM = 'CantoEVM',
  Celestia = 'Celestia',
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
  DogecoinTestnet = 'DogecoinTestnet',
  Dymension = 'Dymension',
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
  Linea = 'Linea',
  Litecoin = 'Litecoin',
  LitecoinTestnet = 'LitecoinTestnet',
  Lum = 'Lum',
  MAYAChain = 'MAYAChain',
  MantaPacific = 'MantaPacific',
  Mantle = 'Mantle',
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
  opBNB = 'opBNB',
  xDAI = 'xDAI',
  zkSync = 'zkSync',
}

/** Portfolio by wallet address */
export type AddressPortfolioFiat = {
  __typename?: 'AddressPortfolioFiat';
  /** wallet address */
  address: Scalars['String'];
  /** chain */
  chain: Scalars['String'];
  /** errors if there was some issue with fetching data */
  errors?: Maybe<Array<FetchingError>>;
  /** historical balances sum of asset in USD at specific datetime */
  historicalBalanceSum: Array<DatedAmountFiat>;
  /** last balance value from `historical_balance_sum` */
  lastBalance?: Maybe<DatedAmountFiat>;
  sourceMetadata?: Maybe<SourceMetadata>;
};

export type AddressPortfolioRequest = {
  address: Scalars['String'];
  chain: PortfolioChainVariant;
};

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

/** Address on given chain */
export type AddressV0 = {
  __typename?: 'AddressV0';
  /** Crypto currency address */
  address?: Maybe<Scalars['String']>;
  /** Chain name */
  chain?: Maybe<Scalars['String']>;
  /** Indicating the dapp corresponding to the provided chain and address */
  dAppDetails?: Maybe<DappsType>;
};

export type AddressV0Args = {
  /** Crypto currency address */
  address?: InputMaybe<Scalars['String']>;
  /** Chain name */
  chain?: InputMaybe<Scalars['String']>;
};

export type AllAssetsFilter = {
  assetTypes?: InputMaybe<Array<AssetInternalType>>;
  chains?: InputMaybe<Array<AddressChain>>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  priceHistoryInterval?: InputMaybe<PriceHistoryInterval>;
  sortBy?: InputMaybe<AssetSortBy>;
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

export type Arbitrum = {
  __typename?: 'Arbitrum';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type ArbitrumActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type ArbitrumBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type ArbitrumLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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

export type AssetAllAssetsType = AssetBaseType & {
  __typename?: 'AssetAllAssetsType';
  /** Identify asset as a shitcoin, stablecoin, lp token, lst token or trending token. */
  categories: Array<TokenCategory>;
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
  /** Get price history by day, week, month, year. Limit 20. */
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
  /** Current sparkline image url */
  sparklineImageUrl?: Maybe<Scalars['String']>;
  /** Updated on */
  updatedOn: Scalars['Float'];
  /** Currency weekPriceChange */
  weekPriceChange?: Maybe<Scalars['String']>;
  /** Currency yearPriceChange */
  yearPriceChange?: Maybe<Scalars['String']>;
};

export type AssetAmountV0 = {
  __typename?: 'AssetAmountV0';
  amount: Scalars['IntegerString'];
  asset: AssetV0;
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
  /** Identify asset as a shitcoin, stablecoin, lp token, lst token or trending token. */
  categories: Array<TokenCategory>;
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
  /** Get price history by day, week, month, year. Limit 20. */
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
  icon?: Maybe<Scalars['String']>;
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

export type AssetHistory = {
  __typename?: 'AssetHistory';
  asset: AssetV0;
  balancesHistory: Array<BalanceAtHeight>;
};

export enum AssetInternalType {
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
  LP_TOKEN = 'LP_TOKEN',
  TOKEN = 'TOKEN',
}

export enum AssetSortBy {
  MARKET_CAP = 'MARKET_CAP',
}

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
  /** Identify asset as a shitcoin, stablecoin, lp token, lst token or trending token. */
  categories: Array<TokenCategory>;
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
  /** Get price history by day, week, month, year. Limit 20. */
  priceHistory: PriceHistoryType;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
  /** This filed contains detailed information about underlying tokens if assets type is LP token */
  tokens?: Maybe<Array<Maybe<CryptoAsset>>>;
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
  dapps?: Maybe<DappsType>;
  /** Scaling factor for market cap */
  fiatCurrencies?: Maybe<FiatCurrencyResponse>;
  /** Trending gainers (by day price change) */
  gainers?: Maybe<Array<TrendingTokensType>>;
  /** Trending losers (by day price change) */
  losers?: Maybe<Array<TrendingTokensType>>;
  /** Scaling factor for market cap */
  lpTokens?: Maybe<TokenResponse>;
  /** NFTs by chain, contract and token_id. */
  nftsV0?: Maybe<Array<NfTv0>>;
  /**
   * Trending popular (by market cap)
   * @deprecated Use topMarketCap query instead
   */
  popular?: Maybe<Array<TrendingTokensType>>;
  search?: Maybe<SearchResponse>;
  supportedChains: Array<Scalars['String']>;
  /** Scaling factor for market cap */
  tokens?: Maybe<TokenResponse>;
  /** Experimental tokenV0 assets */
  tokensV0?: Maybe<Array<TokenV0>>;
  /** Trending popular (by market cap) */
  topMarketCap?: Maybe<Array<TrendingTokensType>>;
  /** Trending coingecko tokens */
  trending?: Maybe<Array<TrendingCoingeckoType>>;
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

export type AssetTypeDappsArgs = {
  address: Scalars['String'];
  chain: Scalars['String'];
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

export type AssetTypeNftsV0Args = {
  keys: Array<NfTv0Args>;
};

export type AssetTypeSearchArgs = {
  filter?: InputMaybe<SearchFilter>;
  page: ConnectionArgs;
};

export type AssetTypeTokensArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  afterPrice?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<TokenFilter>;
  page: ConnectionArgs;
};

export type AssetTypeTokensV0Args = {
  input: Array<TokenV0Args>;
};

/** Unified asset representation for different chains */
export type AssetV0 = {
  __typename?: 'AssetV0';
  /** json encoded input arguments for payload resolver */
  args?: Maybe<Scalars['AssetV0Args']>;
  chain: Scalars['String'];
  payload?: Maybe<AssetV0Payload>;
};

/** Union type that represent any asset (currently nft or token) */
export type AssetV0Payload = NfTv0 | TokenV0;

export type AssetV3 = {
  __typename?: 'AssetV3';
  address?: Maybe<Scalars['String']>;
  assetId: Scalars['String'];
  decimals?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isERC721?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AssetVariant = CryptoAsset | NftAsset;

export type AssetWithAmount = {
  __typename?: 'AssetWithAmount';
  amount: Amount;
  asset: CryptoAsset;
};

export type Aurora = {
  __typename?: 'Aurora';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type AuroraActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type AuroraBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type AuroraLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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

export type Avalanche = {
  __typename?: 'Avalanche';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type AvalancheActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type AvalancheBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type AvalancheLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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

/** Balance at specific chain block height for specific asset */
export type BalanceAtHeight = {
  __typename?: 'BalanceAtHeight';
  /** Value of asset at specific block height */
  amount: Scalars['String'];
  /** Block height */
  blockHeight: Scalars['Int'];
  /** Date and time (UTC) related to block height */
  dateTime?: Maybe<Scalars['DateTime']>;
};

export type Base = {
  __typename?: 'Base';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type BaseActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type BaseBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type BaseNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type BaseTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

/** Base onchain activity */
export type BasicActivityV0 = ReceiveAssetActivityV0 | SendAssetActivityV0;

export type Beam = {
  __typename?: 'Beam';
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
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type BinanceSmartChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type BinanceSmartChainBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type BinanceSmartChainLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  fee?: Maybe<DefaultGasFee>;
  getTransactionByHashV5: UtxotransactionByHashV5;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  transactionsV3: UtxoTransactionV2Connection;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type BitcoinChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type BitcoinChainBalancesArgs = {
  address: Scalars['String'];
};

export type BitcoinChainBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoinChainGetTransactionByHashV5Args = {
  txHash: Scalars['String'];
};

export type BitcoinChainLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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

export type BitcoinChainTransactionsV3Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
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
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  fee?: Maybe<DefaultGasFee>;
  getTransactionByHashV5: UtxotransactionByHashV5;
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  transactionsV3: UtxoTransactionV2Connection;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type BitcoinChainTestNetActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type BitcoinChainTestNetBalancesArgs = {
  address: Scalars['String'];
};

export type BitcoinChainTestNetBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoinChainTestNetGetTransactionByHashV5Args = {
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

export type BitcoinChainTestNetTransactionsV3Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
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
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  fee?: Maybe<DefaultGasFee>;
  getTransactionByHashV5: UtxotransactionByHashV5;
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  transactionsV3: UtxoTransactionV2Connection;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type BitcoincashChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type BitcoincashChainBalancesArgs = {
  address: Scalars['String'];
};

export type BitcoincashChainBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type BitcoincashChainGetTransactionByHashV5Args = {
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

export type BitcoincashChainTransactionsV3Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
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
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
};

export type Blast = {
  __typename?: 'Blast';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type BlastActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type BlastBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type BlastNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type BlastTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

/** Transaction object with necessary fields for risk analysis by Blowfish. */
export type BlowfishEvmTxPayload = {
  blockNumber?: InputMaybe<Scalars['Int']>;
  chain?: InputMaybe<TxClassifierChains>;
  dappDomain?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
  fromAddress: Scalars['String'];
  gas?: InputMaybe<Scalars['Int']>;
  to: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

/**  Solana Transaction Input object for risk analysis by Blowfish. */
export type BlowfishSolanaTxPayload = {
  dappDomain?: InputMaybe<Scalars['String']>;
  decodeInstructions?: InputMaybe<Scalars['Boolean']>;
  simulateExpired?: InputMaybe<Scalars['Boolean']>;
  simulationTimeoutMs?: InputMaybe<Scalars['Int']>;
  transactions: Array<Scalars['String']>;
  userAccount: Scalars['String'];
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
  __typename?: 'CantoEVM';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type CantoEvmActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type CantoEvmBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type CantoEvmLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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

export type Celo = {
  __typename?: 'Celo';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  feeHistory: DefaultGasFee;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type CeloActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type CeloBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type CeloNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type CeloTransactionsArgs = {
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

export type ChainType = {
  __typename?: 'ChainType';
  fee: FeeType;
  name: Scalars['String'];
};

export type ClaimStatus = {
  __typename?: 'ClaimStatus';
  amountUsd: Scalars['Float'];
  bonus: Scalars['Float'];
  claimId: Scalars['String'];
  dateModification?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
};

export type CompositeTokenFilter = {
  chains?: InputMaybe<Array<AddressChain>>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  priceHistoryInterval?: InputMaybe<PriceHistoryInterval>;
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
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
  status: Status;
  version: Array<Version>;
};

export type CosmosBalanceChainBalancesArgs = {
  address: Scalars['String'];
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type CosmosBasedChain = {
  __typename?: 'CosmosBasedChain';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee: DefaultGasFee;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31. */
  transactions: CosmosLikeTransactionConnection;
  version: Array<Version>;
};

export type CosmosBasedChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type CosmosBasedChainBalancesArgs = {
  address: Scalars['String'];
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
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

export type CreateReferrer = {
  /** On chain wallet address of the referrer. Must be unique */
  address: Scalars['String'];
  /** Unique name of the Referrer */
  name: Scalars['String'];
  /** Signed by the address to verify ownership. Must be {address}:{name} and signed by the address */
  signedMessage: Scalars['String'];
};

export type CronosEvm = {
  __typename?: 'CronosEVM';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type CronosEvmActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type CronosEvmBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type CronosEvmLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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
  /** Identify asset as a shitcoin, stablecoin, lp token, lst token or trending token. */
  categories: Array<TokenCategory>;
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

export type CryptoCurrencyFilter = {
  chains?: InputMaybe<Array<AddressChain>>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  priceHistoryInterval?: InputMaybe<PriceHistoryInterval>;
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
  riskScore?: Maybe<Scalars['Float']>;
  sources?: Maybe<Array<Scalars['String']>>;
  status: Scalars['String'];
  url: Scalars['String'];
  warnings?: Maybe<Array<DAppReputationWarning>>;
};

export type DAppReputationInput = {
  url: Scalars['String'];
};

export type DAppReputationWarning = {
  __typename?: 'DAppReputationWarning';
  kind: Scalars['String'];
  message: Scalars['String'];
  severity: Scalars['String'];
};

export type DappsType = {
  __typename?: 'DappsType';
  /** icon url contract */
  iconUrl?: Maybe<Scalars['String']>;
  /** Address dapp name */
  name?: Maybe<Scalars['String']>;
  /** status (Processing/Success) - To indicate the process of fetching data or successfully retrieving data from a dapp */
  status?: Maybe<Scalars['String']>;
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

/** Delegate asset to validator that will stake on behalf of the user */
export type DelegateStakeActivityV0 = {
  __typename?: 'DelegateStakeActivityV0';
  amount?: Maybe<Scalars['IntegerString']>;
  asset?: Maybe<AssetV0>;
  validator?: Maybe<ValidatorV0>;
};

/** Detailed activity represent more details about transaction */
export type DetailedActivityV0 =
  | DelegateStakeActivityV0
  | DirectStakeActivityV0
  | DirectUnstakeActivityV0
  | GasTankDepositActivityV0
  | GasTankWithdrawActivityV0
  | OffchainReceiveAssetActivityV0
  | OffchainSendAssetActivityV0
  | SwapAssetActivityV0
  | TokenApproveActivityV0
  | TokenRevokeActivityV0
  | UndelegateStakeActivityV0
  | WithdrawUnstakedActivityV0;

/** Stake by creating own node */
export type DirectStakeActivityV0 = {
  __typename?: 'DirectStakeActivityV0';
  amount?: Maybe<Scalars['IntegerString']>;
  asset?: Maybe<AssetV0>;
  validator?: Maybe<ValidatorV0>;
};

/** Reverse of [`DirectStakeActivityV0`] */
export type DirectUnstakeActivityV0 = {
  __typename?: 'DirectUnstakeActivityV0';
  amount?: Maybe<Scalars['IntegerString']>;
  asset?: Maybe<AssetV0>;
  validator?: Maybe<ValidatorV0>;
};

export type DogeChain = {
  __typename?: 'DogeChain';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  fee: DefaultGasFee;
  getTransactionByHashV5: UtxotransactionByHashV5;
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  transactionsV3: UtxoTransactionV2Connection;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type DogeChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type DogeChainBalancesArgs = {
  address: Scalars['String'];
};

export type DogeChainBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type DogeChainGetTransactionByHashV5Args = {
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

export type DogeChainTransactionsV3Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
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

/** Transaction object with necessary fields for simulation and classification. */
export type EvmTransactionPayload = {
  chain?: InputMaybe<TxClassifierChains>;
  data: Scalars['String'];
  fromAddress: Scalars['String'];
  to: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

/** Transaction object with necessary fields for simulation and classification. */
export type EvmTransactionPayloadV2 = {
  blockNumber?: InputMaybe<Scalars['Int']>;
  chain?: InputMaybe<TxClassifierChains>;
  data: Scalars['String'];
  fromAddress: Scalars['String'];
  to: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type EvmTransactionV2 = {
  __typename?: 'EVMTransactionV2';
  blockIndex: Scalars['Int'];
  blockNumber: Scalars['Int'];
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
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type EthereumActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type EthereumBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type EthereumLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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

export type EvmFeeDetailsV0 = {
  __typename?: 'EvmFeeDetailsV0';
  /** null means no information */
  gas?: Maybe<EvmGasV0>;
};

export type EvmGasV0 = {
  __typename?: 'EvmGasV0';
  /** value of base fee (only for EIP-1559; null means no data) */
  base?: Maybe<Scalars['IntegerString']>;
  /** max gas that could be used in the transaction before it is failed */
  limit: Scalars['IntegerString'];
  /** gas price for the transaction (represented with asset unit from [`FeeV0`] struct) */
  price: Scalars['IntegerString'];
  /** If there was some priority fee (only for EIP-1559; null means no data. 0 means no priority). */
  priority?: Maybe<Scalars['IntegerString']>;
  /** all gas used in the transaction (base + priority) */
  used: Scalars['IntegerString'];
};

export type ExplainedTransactionV3 = {
  __typename?: 'ExplainedTransactionV3';
  args: Array<TransactionCallArg>;
  confidence: Scalars['Float'];
  inputAssets: Array<AssetV3>;
  outputAssets: Array<AssetV3>;
  type: TransactionType;
};

export type ExplainedTransactionV4 = {
  __typename?: 'ExplainedTransactionV4';
  args: Array<TransactionCallArg>;
  confidence: Scalars['Float'];
  inputAssets: Array<AssetV3>;
  outputAssets: Array<AssetV3>;
  type: TxClassifierTxType;
};

export type ExplainedTransactionV5 = {
  __typename?: 'ExplainedTransactionV5';
  args: Array<TransactionCallArg>;
  confidence: Scalars['Float'];
  inputAssets: Array<AssetV3>;
  outputAssets: Array<AssetV3>;
  type: Scalars['String'];
};

export type ExplainedTxWithRiskAnalysisV1 = {
  __typename?: 'ExplainedTxWithRiskAnalysisV1';
  args: Array<TransactionCallArg>;
  confidence: Scalars['Float'];
  inputAssets: Array<AssetV3>;
  outputAssets: Array<AssetV3>;
  riskAnalysis?: Maybe<TxAnalysisV3>;
  type: Scalars['String'];
};

export type Fantom = {
  __typename?: 'Fantom';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type FantomActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type FantomBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type FantomLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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

/** Represent possible fee details specific to chain */
export type FeeDetailsV0 =
  | EvmFeeDetailsV0
  | ThorChainFeeDetailsV0
  | TronFeeDetailsV0;

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

/** Unified fee structure */
export type FeeV0 = {
  __typename?: 'FeeV0';
  /** The sum of amount paid by payers */
  amount?: Maybe<Scalars['IntegerString']>;
  /** The asset that was used to pay the fee */
  asset?: Maybe<AssetV0>;
  /** Additional details about fee specific per (group of) chain(s) */
  details?: Maybe<FeeDetailsV0>;
  /** Who paid the fee */
  payer?: Maybe<Array<AddressV0>>;
};

/** Group all fees for a given transaction */
export type FeesV0 = {
  __typename?: 'FeesV0';
  fees: Array<FeeV0>;
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

export type FilterArgs = {
  chain?: InputMaybe<Chain>;
  pool?: InputMaybe<Pool>;
};

export type FloorPrice = {
  __typename?: 'FloorPrice';
  marketplaceId: Scalars['String'];
  paymentToken: PaymentToken;
  value?: Maybe<Scalars['String']>;
  valueUsdCents?: Maybe<Scalars['String']>;
};

/** Represents funds deposit action from user to gas tank with specified amount and asset */
export type GasTankDepositActivityV0 = {
  __typename?: 'GasTankDepositActivityV0';
  /** amount of asset used in gas tank action */
  amount?: Maybe<Scalars['IntegerString']>;
  /** asset used in gas tank action */
  asset?: Maybe<AssetV0>;
};

/** Represents funds withdrawal action from gas tank to user with specified amount and asset */
export type GasTankWithdrawActivityV0 = {
  __typename?: 'GasTankWithdrawActivityV0';
  /** amount of asset used in gas tank action */
  amount?: Maybe<Scalars['IntegerString']>;
  /** asset used in gas tank action */
  asset?: Maybe<AssetV0>;
};

export type GetTokensArgs = {
  address?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  symbols?: InputMaybe<Array<Scalars['String']>>;
};

export type Gnosis = {
  __typename?: 'Gnosis';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type GnosisActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type GnosisBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type GnosisLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
};

export type GnosisNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type GnosisTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31. */
  transactions: CosmosLikeTransactionConnection;
  version: Array<Version>;
};

export type JunoChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type JunoChainBalancesArgs = {
  address: Scalars['String'];
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
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

export type Linea = {
  __typename?: 'Linea';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type LineaActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type LineaBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type LineaNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type LineaTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type LitecoinChain = {
  __typename?: 'LitecoinChain';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  balances: Array<Balance>;
  broadcastTransaction: Scalars['String'];
  fee?: Maybe<DefaultGasFee>;
  getTransactionByHashV5: UtxotransactionByHashV5;
  name: Scalars['String'];
  status: Statusv2;
  /** @deprecated Use `transactions_v2` instead. */
  transactions: Array<UtxoTransaction>;
  transactionsV2: Array<UtxoTransactionV2>;
  transactionsV3: UtxoTransactionV2Connection;
  /** @deprecated Use `unspent_tx_outputs_v5` instead. This endpoint will be removed after 31.12.2023 */
  unspentTxOutputs: Array<UnspentTransactionOutputV4>;
  unspentTxOutputsV5: Array<UnspentTransactionOutputV5>;
};

export type LitecoinChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type LitecoinChainBalancesArgs = {
  address: Scalars['String'];
};

export type LitecoinChainBroadcastTransactionArgs = {
  rawHex: Scalars['String'];
};

export type LitecoinChainGetTransactionByHashV5Args = {
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

export type LitecoinChainTransactionsV3Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
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
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
};

export type Manta = {
  __typename?: 'Manta';
  average24hFee?: Maybe<Eip1559GasFee>;
  fee?: Maybe<Eip1559GasFee>;
  name: Scalars['String'];
};

export type Mantle = {
  __typename?: 'Mantle';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type MantleActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type MantleBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type MantleNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type MantleTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Marketplace = {
  __typename?: 'Marketplace';
  collectionUrl: Scalars['String'];
  logoUrl?: Maybe<Scalars['String']>;
  marketplaceCollectionId: Scalars['String'];
  marketplaceId: Scalars['String'];
  marketplaceName: Scalars['String'];
  nftUrl: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
};

export type MayaChain = {
  __typename?: 'MayaChain';
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<MayaChainFee>;
  name: Scalars['String'];
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31. */
  transactions: ThorchainTransactionConnection;
  version: Array<Version>;
};

export type MayaChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type MayaChainBalancesArgs = {
  address: Scalars['String'];
  tokenAddress?: InputMaybe<Array<Scalars['String']>>;
};

export type MayaChainTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

/** Transactions fee management for MAYA chain. */
export type MayaChainFee = {
  __typename?: 'MayaChainFee';
  /** Cacao fee on all on chain txs */
  nativeTransactionFee?: Maybe<Scalars['Float']>;
  /** Amount of cacao to withhold on all outbound transactions (1e8 notation) */
  outboundTransactionFee?: Maybe<Scalars['Float']>;
  /** Fee for TNS sale in basis points */
  tnsFeeOnSale?: Maybe<Scalars['Float']>;
  /** Per block cost for TNS, in cacao */
  tnsFeePerBlock?: Maybe<Scalars['Float']>;
  /** Registration fee for new MAYAName, in cacao */
  tnsRegisterFee?: Maybe<Scalars['Float']>;
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

export type Mode = {
  __typename?: 'Mode';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type ModeActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type ModeBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type ModeNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type ModeTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Reputation;
  claimFees?: Maybe<ClaimStatus>;
  /** Publicly exposed Create a referrer */
  createReferrer?: Maybe<Referrer>;
  /** @deprecated added the transactionHashV3 which supports the new swap history logging, use transactionHashV3 instead */
  transactionHashV2: Scalars['String'];
  transactionHashV3: Scalars['String'];
  transactions: Array<RouteTransactionType>;
  transactionsV2: PostRouteTypeV2;
  transactonHash: Scalars['String'];
  /** Create or update a referrer. If id is provided, the referrer will be updated.Otherwise, a new referrer will be created. Sig controlled by an admin */
  upsertReferrer?: Maybe<Referrer>;
};

export type MutationAddCommentArgs = {
  address: Scalars['String'];
  comment: Scalars['String'];
  source: Scalars['String'];
};

export type MutationCreateReferrerArgs = {
  referrer: CreateReferrer;
};

export type MutationTransactionHashV2Args = {
  routeId: Scalars['String'];
  tradeId: Scalars['String'];
  transactionHash: Scalars['String'];
};

export type MutationTransactionHashV3Args = {
  accountId: Scalars['String'];
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

export type MutationUpsertReferrerArgs = {
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
  value: Scalars['JSON'];
};

export type NftCollectionV2 = {
  __typename?: 'NFTCollectionV2';
  address: Scalars['String'];
  media?: Maybe<MediaV2>;
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type NftCollectionV3 = {
  __typename?: 'NFTCollectionV3';
  address: Scalars['String'];
  collectionItemsAmount?: Maybe<Scalars['String']>;
  collectionItemsOwnersAmount?: Maybe<Scalars['String']>;
  floorPrices?: Maybe<Array<FloorPrice>>;
  marketplaces?: Maybe<Array<Marketplace>>;
  media?: Maybe<MediaV2>;
  name?: Maybe<Scalars['String']>;
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

/** NFT for a given chain, contract and token_id */
export type NfTv0 = {
  __typename?: 'NFTv0';
  attributes?: Maybe<Array<NftAttribute>>;
  chain?: Maybe<Scalars['String']>;
  collection?: Maybe<NftCollectionV3>;
  /** Crypto currency address on specific chain */
  contract?: Maybe<AddressV0>;
  contractType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isNftSpam?: Maybe<Scalars['Boolean']>;
  lastSale?: Maybe<NftLastSaleV2>;
  location?: Maybe<Scalars['String']>;
  media?: Maybe<Array<MediaV2>>;
  name?: Maybe<Scalars['String']>;
  spamScore?: Maybe<Scalars['Float']>;
  symbol?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
};

export type NfTv0Args = {
  chain?: InputMaybe<NftChainType>;
  contract?: InputMaybe<AddressV0Args>;
  tokenId?: InputMaybe<Scalars['String']>;
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
  /** @deprecated NFTCollectionV2 is deprecated. Please move to the NFTCollectionV3 */
  collection?: Maybe<NftCollectionV2>;
  collectionV3?: Maybe<NftCollectionV3>;
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

export enum NftChainType {
  Arbitrum = 'Arbitrum',
  Avalanche = 'Avalanche',
  Base = 'Base',
  BinanceSmartChain = 'BinanceSmartChain',
  Bitcoin = 'Bitcoin',
  Ethereum = 'Ethereum',
  Gnosis = 'Gnosis',
  Optimism = 'Optimism',
  Polygon = 'Polygon',
  Solana = 'Solana',
}

/** Receive off-chain asset activity with on-chain proof (for example compressed NFT on Solana with Merkle tree) */
export type OffchainReceiveAssetActivityV0 = {
  __typename?: 'OffchainReceiveAssetActivityV0';
  amount?: Maybe<Scalars['IntegerString']>;
  asset?: Maybe<AssetV0>;
  /**
   * Represent wallet address that send the asset
   * If empty then this is mint activity (NOTE: if `from` contains address this still can be mint activity)
   */
  from?: Maybe<Array<AddressV0>>;
  /** If true then this Receive was mint activity (if `from` is present then address is mint address) */
  mint?: Maybe<Scalars['Boolean']>;
};

/** Send off-chain asset activity with on-chain proof (for example compressed NFT on Solana with Merkle proof) */
export type OffchainSendAssetActivityV0 = {
  __typename?: 'OffchainSendAssetActivityV0';
  amount?: Maybe<Scalars['IntegerString']>;
  asset?: Maybe<AssetV0>;
  /** If true then this Send was burn activity (if `to` is present then address is burn address) */
  burn?: Maybe<Scalars['Boolean']>;
  /**
   * Represent wallet address that receive the asset
   * If empty then this is burn activity (NOTE: if `to` contains address this still can be burn activity for example eth burn by sending to 0x0 address)
   */
  to?: Maybe<Array<AddressV0>>;
};

export type OpBnb = {
  __typename?: 'OpBNB';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type OpBnbActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type OpBnbBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type OpBnbNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type OpBnbTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type OptimismActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type OptimismBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type OptimismLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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

export type PaymentToken = {
  __typename?: 'PaymentToken';
  address?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  paymentTokenId: Scalars['String'];
  symbol?: Maybe<Scalars['String']>;
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
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type PolygonActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type PolygonBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type PolygonLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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

/** (experimental) Represent Pool */
export type PoolV0 = {
  __typename?: 'PoolV0';
  /** Pool ID */
  id?: Maybe<Scalars['String']>;
  /** Pool type for example "GAMM" */
  type?: Maybe<Scalars['String']>;
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
  CronosPos = 'CronosPos',
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

/** Price history interval */
export enum PriceHistoryInterval {
  day = 'day',
  month = 'month',
  week = 'week',
  year = 'year',
}

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
  akash: CosmosBasedChain;
  arbitrum: Arbitrum;
  assets: AssetType;
  aurora: Aurora;
  avalanche: Avalanche;
  axelar: CosmosBasedChain;
  base: Base;
  beam: Beam;
  binance: Binance;
  binanceSmartChain: BinanceSmartChain;
  bitcoin: BitcoinChain;
  bitcoinTestnet: BitcoinChainTestNet;
  bitcoincash: BitcoincashChain;
  bitcoincashTestnet: BitcoincashChainTestNet;
  blast: Blast;
  cantoEVM: CantoEvm;
  celo: Celo;
  chains: Array<ChainType>;
  /** Fetch composite tokens */
  compositeTokens: Array<CompositeTokenType>;
  cosmos: CosmosBasedChain;
  cosmoshub: CosmosBasedChain;
  crescent: CosmosBasedChain;
  /** @deprecated Use cronos_pos instead */
  cronos: CosmosBasedChain;
  cronosEVM: CronosEvm;
  /** Cronos POS */
  cronosPos: CosmosBasedChain;
  /** Fetch list of all available tokens */
  cryptoCurrencies: Array<CryptoCurrencyType>;
  dapp: DAppReputation;
  dogecoin: DogeChain;
  ethereum: Ethereum;
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
  linea: Linea;
  litecoin: LitecoinChain;
  litecoinTestnet: LitecoinChainTestNet;
  manta: Manta;
  mantle: Mantle;
  mars: CosmosBasedChain;
  mayachain: MayaChain;
  mode: Mode;
  near: NearChain;
  opBNB: OpBnb;
  optimism: Optimism;
  osmosis: CosmosBasedChain;
  polygon: Polygon;
  quasar: CosmosBasedChain;
  reputation: Reputation;
  reputationV2: ReputationV2;
  routing: RoutingType;
  routingV2?: Maybe<RoutingTypeV2>;
  scroll: Scroll;
  sei: CosmosBalanceChain;
  solana: SolanaChain;
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
  tron: Tron;
  txClassifier: TxClassifier;
  /** Namespace for portfolio related queries */
  userPortfolio: UserPortfolio;
  /** Fetch wallet information */
  walletInfo: WalletInfo;
  zetachain: ZetaChain;
  zkSync: ZkSync;
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

export type QueryReputationV2Args = {
  address: Scalars['String'];
  approved?: InputMaybe<Scalars['Boolean']>;
  chain: ReputationChains;
  cursor?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type QueryTokensArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<GetTokensArgs>;
};

export type QueryTrackWalletConnectArgs = {
  walletAddress: Scalars['String'];
  walletProvider: Scalars['String'];
};

export type QueryWalletInfoArgs = {
  address: Scalars['String'];
};

/** Receive asset activity with mint detection, valid with wallet context */
export type ReceiveAssetActivityV0 = {
  __typename?: 'ReceiveAssetActivityV0';
  amount?: Maybe<Scalars['IntegerString']>;
  asset?: Maybe<AssetV0>;
  /**
   * Represent wallet address that send the asset
   * If empty then this is mint activity (NOTE: if `from` contains address this still can be mint activity)
   */
  from?: Maybe<Array<AddressV0>>;
  /** If true then this Receive was mint activity (if `from` is present then address is mint address) */
  mint?: Maybe<Scalars['Boolean']>;
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
  flagged: Scalars['Boolean'];
  location: Scalars['String'];
};

export enum ReputationChains {
  Akash = 'Akash',
  Algorand = 'Algorand',
  Arbitrum = 'Arbitrum',
  Archway = 'Archway',
  ArchwayTestnet = 'ArchwayTestnet',
  AssetMantle = 'AssetMantle',
  Astar = 'Astar',
  Aurora = 'Aurora',
  Avalanche = 'Avalanche',
  Axelar = 'Axelar',
  Band = 'Band',
  Base = 'Base',
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
  Canto = 'Canto',
  CantoEVM = 'CantoEVM',
  Cardano = 'Cardano',
  Celo = 'Celo',
  Cerberus = 'Cerberus',
  Chihuahua = 'Chihuahua',
  Comdex = 'Comdex',
  Cosmos = 'Cosmos',
  Crescent = 'Crescent',
  Cronos = 'Cronos',
  CronosEVM = 'CronosEVM',
  CronosPOS = 'CronosPOS',
  Cudos = 'Cudos',
  Defikingdoms = 'Defikingdoms',
  Dep = 'Dep',
  Desmos = 'Desmos',
  Dogecoin = 'Dogecoin',
  DogecoinTestnet = 'DogecoinTestnet',
  ETHW = 'ETHW',
  Emoney = 'Emoney',
  Eos = 'Eos',
  Ethereum = 'Ethereum',
  Everscale = 'Everscale',
  Evmos = 'Evmos',
  FONSmartChain = 'FONSmartChain',
  Fantom = 'Fantom',
  FetchAI = 'FetchAI',
  Flow = 'Flow',
  Fuse = 'Fuse',
  Gnosis = 'Gnosis',
  GravityBridge = 'GravityBridge',
  Harmony = 'Harmony',
  Heco = 'Heco',
  Hedera = 'Hedera',
  Hive = 'Hive',
  HuobiECOChain = 'HuobiECOChain',
  Immutablex = 'Immutablex',
  Injective = 'Injective',
  Iotex = 'Iotex',
  Iris = 'Iris',
  Ixo = 'Ixo',
  JUNO = 'JUNO',
  Kardiachain = 'Kardiachain',
  Kava = 'Kava',
  Kcc = 'Kcc',
  KiChain = 'KiChain',
  Klaytn = 'Klaytn',
  Konstellation = 'Konstellation',
  Kujira = 'Kujira',
  LikeCoin = 'LikeCoin',
  Linea = 'Linea',
  Litecoin = 'Litecoin',
  LitecoinTestnet = 'LitecoinTestnet',
  Lum = 'Lum',
  MAYAChain = 'MAYAChain',
  MarsProtocol = 'MarsProtocol',
  Medibloc = 'Medibloc',
  Mooi = 'Mooi',
  Moonbeam = 'Moonbeam',
  Moonriver = 'Moonriver',
  Mumbai = 'Mumbai',
  Near = 'Near',
  Neo = 'Neo',
  Neutron = 'Neutron',
  Noble = 'Noble',
  OKExChain = 'OKExChain',
  Oasis = 'Oasis',
  Oec = 'Oec',
  Ontology = 'Ontology',
  Optimism = 'Optimism',
  Osmosis = 'Osmosis',
  Other = 'Other',
  Persistence = 'Persistence',
  Platon = 'Platon',
  Polygon = 'Polygon',
  Provenance = 'Provenance',
  Quasar = 'Quasar',
  Rangers = 'Rangers',
  Regen = 'Regen',
  Rizon = 'Rizon',
  Ronin = 'Ronin',
  Ropsten = 'Ropsten',
  Rsk = 'Rsk',
  Scroll = 'Scroll',
  Secret = 'Secret',
  Sei = 'Sei',
  SeiTestnet = 'SeiTestnet',
  Sentinel = 'Sentinel',
  Shentu = 'Shentu',
  Shiden = 'Shiden',
  Sifchain = 'Sifchain',
  Skale = 'Skale',
  Solana = 'Solana',
  Sommelier = 'Sommelier',
  Stacks = 'Stacks',
  Stargaze = 'Stargaze',
  Starname = 'Starname',
  Steem = 'Steem',
  Stride = 'Stride',
  Sxnetwork = 'Sxnetwork',
  THORChain = 'THORChain',
  THORChainTestnet = 'THORChainTestnet',
  Telos = 'Telos',
  Telosevm = 'Telosevm',
  Terra = 'Terra',
  TerraClassic = 'TerraClassic',
  Tezos = 'Tezos',
  Theta = 'Theta',
  Thundercore = 'Thundercore',
  TomoChain = 'TomoChain',
  Tron = 'Tron',
  Umee = 'Umee',
  Vechain = 'Vechain',
  Vulcanforged = 'Vulcanforged',
  Wax = 'Wax',
  Zilliqa = 'Zilliqa',
  opBNB = 'opBNB',
  xDAI = 'xDAI',
  zkSync = 'zkSync',
}

export type ReputationComment = {
  __typename?: 'ReputationComment';
  approved: Scalars['Boolean'];
  commentId: Scalars['Int'];
  date: Scalars['DateTime'];
  source: Scalars['String'];
  text: Scalars['String'];
};

export type ReputationCommentNode = {
  __typename?: 'ReputationCommentNode';
  cursor: Scalars['String'];
  node: ReputationComment;
};

export type ReputationV2 = {
  __typename?: 'ReputationV2';
  address: Scalars['String'];
  chain: ReputationChains;
  comments: Array<ReputationCommentNode>;
  flagged: Scalars['Boolean'];
  pageInfo: PageInfo;
};

export type RewardInputType = {
  amount?: Scalars['Decimal'];
  amountUsd?: Scalars['Decimal'];
  asset: RoutingTokenInputTypeV2;
};

export type RewardType = {
  __typename?: 'RewardType';
  amount: Scalars['Decimal'];
  amountUsd: Scalars['Decimal'];
  asset: RoutingTokenTypeV2;
};

export type RouteInputTypeV2 = {
  addresses: Array<AddressRouteInputTypeV2>;
  amountIn: Scalars['Decimal'];
  approvalInfiniteFlag?: InputMaybe<Scalars['Boolean']>;
  destAddress: Scalars['String'];
  errorBuildingRoute?: InputMaybe<Scalars['String']>;
  feeTier?: InputMaybe<Scalars['Int']>;
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
  reward?: Maybe<RewardType>;
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
  tradeId: Scalars['String'];
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
  /** Fee tier that the wallet requesting the quote has. Fee tier are defined by the number XDEFI & vXDEFI tokens held by the wallet. The more tokens the wallet has, the lower the fee tier */
  feeTier: Scalars['Int'];
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

export type RoutingSwapHistory = {
  __typename?: 'RoutingSwapHistory';
  activityType: Scalars['String'];
  createdAt: Scalars['DateTime'];
  inputAsset?: Maybe<RoutingTokenTypeV2>;
  outputAsset?: Maybe<RoutingTokenTypeV2>;
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
  /** Cryptocurrencies that are newly added and volatile, pulled in from a fetcher that identifies new trending tokens from GeckoTerminal */
  isHotNewToken: Scalars['Boolean'];
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
  SwapHistory: Array<RoutingSwapHistory>;
  addressCheckV2: AddressRouteCheckTypeV2;
  allReferrers?: Maybe<Array<ReferrerWithFees>>;
  bridgeableTokens: Array<RoutingTokenTypeV2>;
  chainV2: RoutingChainTypeV2;
  chainsV2: Array<RoutingChainTypeV2>;
  dailyVolume?: Maybe<Array<VolumeHistory>>;
  getArbGauge: ReferralBonus;
  /** Checks if the Asset(chain=chain_name, address=address) is available for the routes. */
  isAssetSwappable: Scalars['Boolean'];
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

export type RoutingTypeV2SwapHistoryArgs = {
  accountId: Scalars['String'];
  limit?: Scalars['Int'];
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

export type RoutingTypeV2IsAssetSwappableArgs = {
  address: Scalars['String'];
  chainName: Scalars['String'];
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

export type Scroll = {
  __typename?: 'Scroll';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type ScrollActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type ScrollBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type ScrollNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type ScrollTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type SearchFilter = {
  name?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  page: SearchTypeConnection;
  pageData?: Maybe<PageDataType>;
};

export type SearchType = AssetBaseType & {
  __typename?: 'SearchType';
  /** Identify asset as a shitcoin, stablecoin, lp token, lst token or trending token. */
  categories: Array<TokenCategory>;
  /** Only for "CRYPTOCURRENCY" type */
  chain?: Maybe<Scalars['String']>;
  /** For "TOKEN" and "LP_TOKEN" types */
  contracts?: Maybe<Array<AssetTokenContractType>>;
  /** Additional info about asset: description, social and tech links, etc. */
  externalData?: Maybe<Scalars['JSON']>;
  /** Icon URL */
  icon?: Maybe<Scalars['String']>;
  /** Unique identifier in the database */
  id: Scalars['ID'];
  /** Market capitalization is total value of a publicly traded company's outstanding common shares owned by stockholders */
  marketCap?: Maybe<Scalars['Float']>;
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  /** Get price history by day, week, month, year. Limit 20. */
  priceHistory: PriceHistoryType;
  /** Only for "CRYPTOCURRENCY" type */
  scalingFactor?: Maybe<Scalars['Float']>;
  /** The symbol that identifies token */
  symbol: Scalars['String'];
  type: AssetInternalType;
};

export type SearchTypeConnection = {
  __typename?: 'SearchTypeConnection';
  edges?: Maybe<Array<SearchTypeEdge>>;
  pageInfo?: Maybe<SearchTypePageInfo>;
};

export type SearchTypeEdge = {
  __typename?: 'SearchTypeEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<SearchType>;
};

export type SearchTypePageInfo = {
  __typename?: 'SearchTypePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

/** Send asset activity with burn detection, valid with wallet context */
export type SendAssetActivityV0 = {
  __typename?: 'SendAssetActivityV0';
  amount?: Maybe<Scalars['IntegerString']>;
  asset?: Maybe<AssetV0>;
  /** If true then this Send was burn activity (if `to` is present then address is burn address) */
  burn?: Maybe<Scalars['Boolean']>;
  /**
   * Represent wallet address that receive the asset
   * If empty then this is burn activity (NOTE: if `to` contains address this still can be burn activity for example eth burn by sending to 0x0 address)
   */
  to?: Maybe<Array<AddressV0>>;
};

/** Keep information about smart contract/program */
export type SmartContractV0 = {
  __typename?: 'SmartContractV0';
  contract?: Maybe<AddressV0>;
  name?: Maybe<Scalars['String']>;
};

export type SolanaChain = {
  __typename?: 'SolanaChain';
  /** activity history for solana with forward pagination */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  /** return asset history balances for specific address. By default it returns at least 24h of history (if no activity for asset at least one balance is returned) */
  assetHistoryBalancesV0?: Maybe<Array<AssetHistory>>;
  average24hFee?: Maybe<DefaultGasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: SolanaStatus;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31. */
  transactions: SolanaTransactionConnection;
  version: Array<Version>;
};

export type SolanaChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type SolanaChainAssetHistoryBalancesV0Args = {
  address: Scalars['String'];
  minUntil?: InputMaybe<Scalars['DateTime']>;
  skipAssetServiceFiltering?: Scalars['Boolean'];
};

export type SolanaChainBalancesArgs = {
  address: Scalars['String'];
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type SolanaChainLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
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

export type SourceMetadata = {
  __typename?: 'SourceMetadata';
  /** indicates if historical balance sum was cached data */
  historicalBalanceSumCached: Scalars['Boolean'];
  /** indicates if historical balance sum was prefetched data or last available */
  historicalBalanceSumPrefetchedPulsar: Scalars['Boolean'];
};

export type StargazeChain = {
  __typename?: 'StargazeChain';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31. */
  transactions: CosmosLikeTransactionConnection;
  version: Array<Version>;
};

export type StargazeChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type StargazeChainBalancesArgs = {
  address: Scalars['String'];
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
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

/** Represents sum of few addresses. Valid only in context */
export type SumPortfolioFiat = {
  __typename?: 'SumPortfolioFiat';
  /** first available balance from `spark_line` */
  firstBalance?: Maybe<DatedAmountFiat>;
  /** last available balance from `spark_line` */
  lastBalance?: Maybe<DatedAmountFiat>;
  sparkLine: Array<DatedAmountFiat>;
};

export type SwapAssetActivityV0 = {
  __typename?: 'SwapAssetActivityV0';
  /** Place where swap was executed */
  executor?: Maybe<SwapExecutorV0>;
  fromAssets?: Maybe<Array<AssetAmountV0>>;
  /** amount paid during swap execution to the protocol. Null doesn't mean "no fees" */
  swapFee?: Maybe<Array<FeeV0>>;
  toAssets?: Maybe<Array<AssetAmountV0>>;
};

/** (experimental) Place where input/output assets are swapped */
export type SwapExecutorV0 = PoolV0 | SmartContractV0;

/** Transaction object with necessary fields for simulation and classification using tenderly */
export type TenderlyMinimalSimulateInput = {
  blockNumber?: InputMaybe<Scalars['Int']>;
  chain?: InputMaybe<TxClassifierChains>;
  data: Scalars['String'];
  fromAddress: Scalars['String'];
  to: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TerraChain = {
  __typename?: 'TerraChain';
  average24hFee?: Maybe<DefaultGasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  legacyNFTs: Array<NfTv3>;
  name: Scalars['String'];
  status: Status;
  version: Array<Version>;
};

export type TerraChainBalancesArgs = {
  address: Scalars['String'];
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type TerraChainLegacyNfTsArgs = {
  address: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
};

export type ThorChain = {
  __typename?: 'ThorChain';
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<ThorChainFee>;
  name: Scalars['String'];
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31. */
  transactions: ThorchainTransactionConnection;
  version: Array<Version>;
};

export type ThorChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type ThorChainBalancesArgs = {
  address: Scalars['String'];
  tokenAddress?: InputMaybe<Array<Scalars['String']>>;
};

export type ThorChainTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type ThorChainAffiliate = {
  __typename?: 'ThorChainAffiliate';
  /** address of affiliate which received the fee ($RUNE address) */
  address: AddressV0;
  /** The affiliate fee is in basis points (0-10,000) and will be deducted from the inbound swap amount from the user */
  fee: Scalars['IntegerString'];
};

/** Transactions fee management for THORChain. */
export type ThorChainFee = {
  __typename?: 'ThorChainFee';
  /** Cacao fee on all on chain txs */
  nativeTransactionFee?: Maybe<Scalars['Float']>;
  /** Amount of rune to withhold on all outbound transactions (1e8 notation) */
  outboundTransactionFee?: Maybe<Scalars['Float']>;
  /** Fee for TNS sale in basis points */
  tnsFeeOnSale?: Maybe<Scalars['Float']>;
  /** Per block cost for TNS, in rune */
  tnsFeePerBlock?: Maybe<Scalars['Float']>;
  /** Registration fee for new THORName, in rune */
  tnsRegisterFee?: Maybe<Scalars['Float']>;
};

/** Detailed fees of THORChain and similar chains (Maya) as described in <https://dev.thorchain.org/concepts/fees.html> */
export type ThorChainFeeDetailsV0 = {
  __typename?: 'ThorChainFeeDetailsV0';
  /** affiliate related fee */
  affiliate?: Maybe<ThorChainAffiliate>;
  /** liquidity fee depends on swap slippage and swap amount - less liquidity - higher fee */
  liquidityFee?: Maybe<Scalars['IntegerString']>;
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
  transfers: Array<AssetTransferV2>;
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
  DAY = 'DAY',
  MONTH = 'MONTH',
  WEEK = 'WEEK',
  YEAR = 'YEAR',
}

/** Unlimited or specific amount of asset approved to spend for spender address */
export type TokenApproveActivityV0 = {
  __typename?: 'TokenApproveActivityV0';
  amount?: Maybe<Scalars['IntegerString']>;
  asset?: Maybe<AssetV0>;
  spender?: Maybe<AddressV0>;
  unlimited?: Maybe<Scalars['Boolean']>;
};

export enum TokenCategory {
  LP_TOKEN = 'LP_TOKEN',
  LST_TOKEN = 'LST_TOKEN',
  SHITCOIN = 'SHITCOIN',
  STABLECOIN = 'STABLECOIN',
  TRENDING_TOKEN = 'TRENDING_TOKEN',
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
  priceHistoryInterval?: InputMaybe<PriceHistoryInterval>;
  symbols?: InputMaybe<Array<Scalars['String']>>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  page: AssetTokenTypeConnection;
  pageData?: Maybe<PageDataType>;
};

/** Approval revocation of asset to use for spender address */
export type TokenRevokeActivityV0 = {
  __typename?: 'TokenRevokeActivityV0';
  asset?: Maybe<AssetV0>;
  spender?: Maybe<AddressV0>;
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
  /** Identify asset as a shitcoin, stablecoin, lp token, lst token or trending token. */
  categories?: Maybe<Array<TokenCategory>>;
  /** Chain name */
  chain?: Maybe<Scalars['String']>;
  /** Contract for EVM/Cosmos and program_id for Solana */
  contract?: Maybe<AddressV0>;
  /** Number of decimals for current asset */
  decimals?: Maybe<Scalars['Int']>;
  /** Asset image */
  image?: Maybe<Scalars['String']>;
  /** Known name that identifies token */
  name?: Maybe<Scalars['String']>;
  price?: Maybe<AssetAmountType>;
  /** The symbol that identifies token */
  symbol?: Maybe<Scalars['String']>;
  /** Null for EVM/Cosmos and mint for Solana */
  tokenId?: Maybe<Scalars['String']>;
};

export type TokenV0Args = {
  chain: AddressChain;
  contract?: InputMaybe<AddressV0Args>;
  tokenId?: InputMaybe<Scalars['String']>;
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

export type TransactionCallArg = {
  __typename?: 'TransactionCallArg';
  name: Scalars['String'];
  standardisedName: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};

/** Represents the status of a transaction */
export enum TransactionStatus {
  /** Transaction was included in a block but failed to execute */
  FAILED = 'FAILED',
  /** Transaction was sent and is in the mempool (or equivalent for the chain) */
  PENDING = 'PENDING',
  /** Transaction was included in a block and successfully executed */
  SUCCESS = 'SUCCESS',
}

/** Represents the status of a transaction with optional details */
export type TransactionStatusDetails = {
  __typename?: 'TransactionStatusDetails';
  status: TransactionStatus;
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

export type TrendingCoingeckoType = {
  __typename?: 'TrendingCoingeckoType';
  assetId: Scalars['String'];
  /** Identify asset as a shitcoin, stablecoin, lp token, lst token or trending token. */
  categories: Array<TokenCategory>;
  chains: Array<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price?: Maybe<AssetAmountType>;
  symbol: Scalars['String'];
  type: AssetInternalType;
};

export type TrendingTokensType = {
  __typename?: 'TrendingTokensType';
  assetId: Scalars['String'];
  /** Identify asset as a shitcoin, stablecoin, lp token, lst token or trending token. */
  categories: Array<TokenCategory>;
  chains: Array<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price?: Maybe<AssetAmountType>;
  symbol: Scalars['String'];
  type: AssetInternalType;
};

export type Tron = {
  __typename?: 'Tron';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<DefaultGasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type TronActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type TronBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
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

/**
 * Tron chain specific fee details
 * It usually consists of energy fee + bandwidth fee in TRX
 */
export type TronFeeDetailsV0 = {
  __typename?: 'TronFeeDetailsV0';
  /** energy fee for interacting with smart contract (energy usage * energy price in TRX) */
  energyFee?: Maybe<Scalars['IntegerString']>;
  /** actual energy used for interacting with smart contract */
  energyUsage?: Maybe<Scalars['IntegerString']>;
  /** fee limit which is provided only for contract interactions */
  feeLimit?: Maybe<Scalars['IntegerString']>;
  /** bandwidth fee for each transaction */
  netFee?: Maybe<Scalars['IntegerString']>;
};

export type TxAnalysisV1 = {
  __typename?: 'TxAnalysisV1';
  securityIssues: Array<TxSecurityIssue>;
  txRiskLevel: Scalars['String'];
};

export type TxAnalysisV2 = {
  __typename?: 'TxAnalysisV2';
  issues: Array<Scalars['String']>;
  riskScore: Scalars['String'];
};

export type TxAnalysisV3 = {
  __typename?: 'TxAnalysisV3';
  securityIssues: Array<TxSecurityIssueV2>;
  txRiskLevel: Scalars['String'];
};

export type TxClassifier = {
  __typename?: 'TxClassifier';
  analyzeEVMTxBlowfish: TxAnalysisV3;
  analyzeSolanaTxBlowfish: TxAnalysisV3;
  /** @deprecated use analyzeEVMTxBlowfish for EVMs and analyzeSolanaTxBlowfish for Solana */
  analyzeTxBlowfish: TxAnalysisV3;
  /** @deprecated no api key is provided at the moment for this service use analyzeTxBlowfish instead */
  analyzeTxV1Hexagate: TxAnalysisV1;
  /** @deprecated no api key is provided at the moment for this service use analyzeTxBlowfish instead */
  analyzeTxV2Hexagate: TxAnalysisV2;
  decodeTransactionV2?: Maybe<DecodedTransaction>;
  explainEVMTxWithRiskAnalysisV1?: Maybe<ExplainedTxWithRiskAnalysisV1>;
  /** @deprecated it is not reasonable to use static enum values for tx type use explainTransactionV5 instead */
  explainTransactionV3?: Maybe<ExplainedTransactionV3>;
  /** @deprecated only for test, be sure not to use this endpoint */
  explainTransactionV3DebugTraceCall?: Maybe<ExplainedTransactionV3>;
  /** @deprecated only for test, be sure not to use this endpoint */
  explainTransactionV3Tenderly?: Maybe<ExplainedTransactionV3>;
  /** @deprecated only for test, be sure not to use this endpoint */
  explainTransactionV3TenderlyBundled?: Maybe<ExplainedTransactionV3>;
  /** @deprecated only for test, be sure not to use this endpoint */
  explainTransactionV4Tenderly?: Maybe<ExplainedTransactionV4>;
  /** @deprecated use explainEVMTxWithRiskAnalysisV1 since it also returns the risk analysis for EVM txs */
  explainTransactionV5?: Maybe<ExplainedTransactionV5>;
  /** @deprecated only for tests please do not use this endpoint at all */
  getBlockchairTxsByQuery: Scalars['String'];
};

export type TxClassifierAnalyzeEvmTxBlowfishArgs = {
  payload: BlowfishEvmTxPayload;
};

export type TxClassifierAnalyzeSolanaTxBlowfishArgs = {
  payload: BlowfishSolanaTxPayload;
};

export type TxClassifierAnalyzeTxBlowfishArgs = {
  payload: BlowfishEvmTxPayload;
};

export type TxClassifierAnalyzeTxV1HexagateArgs = {
  payload: EvmTransactionPayloadV2;
};

export type TxClassifierAnalyzeTxV2HexagateArgs = {
  payload: EvmTransactionPayloadV2;
};

export type TxClassifierDecodeTransactionV2Args = {
  payload: EvmTransactionPayload;
};

export type TxClassifierExplainEvmTxWithRiskAnalysisV1Args = {
  payload: EvmTransactionPayloadV2;
};

export type TxClassifierExplainTransactionV3Args = {
  payload: EvmTransactionPayloadV2;
};

export type TxClassifierExplainTransactionV3DebugTraceCallArgs = {
  payload: EvmTransactionPayloadV2;
};

export type TxClassifierExplainTransactionV3TenderlyArgs = {
  payload: EvmTransactionPayloadV2;
};

export type TxClassifierExplainTransactionV3TenderlyBundledArgs = {
  payload: Array<TenderlyMinimalSimulateInput>;
};

export type TxClassifierExplainTransactionV4TenderlyArgs = {
  payload: EvmTransactionPayloadV2;
};

export type TxClassifierExplainTransactionV5Args = {
  payload: EvmTransactionPayloadV2;
};

export type TxClassifierGetBlockchairTxsByQueryArgs = {
  chain: TxClassifierChains;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  recipient: Scalars['String'];
  useApiKey: Scalars['Boolean'];
};

export enum TxClassifierChains {
  Dummychain = 'Dummychain',
  arbitrum = 'arbitrum',
  avalanche = 'avalanche',
  base = 'base',
  blast = 'blast',
  bsc = 'bsc',
  ethereum = 'ethereum',
  fantom = 'fantom',
  gnosis = 'gnosis',
  linea = 'linea',
  optimism = 'optimism',
  polygon = 'polygon',
  solana = 'solana',
}

export enum TxClassifierTxType {
  APPROVE = 'APPROVE',
  CLAIM = 'CLAIM',
  DEPOSIT = 'DEPOSIT',
  MINT = 'MINT',
  STAKE = 'STAKE',
  SWAP = 'SWAP',
  TRANSFER = 'TRANSFER',
  UNCLASSIFIED = 'UNCLASSIFIED',
  WITHDRAW = 'WITHDRAW',
}

export type TxSecurityIssue = {
  __typename?: 'TxSecurityIssue';
  categoryType: Scalars['String'];
  riskScore: Scalars['String'];
  type: Scalars['String'];
};

export type TxSecurityIssueV2 = {
  __typename?: 'TxSecurityIssueV2';
  kind: Scalars['String'];
  message: Scalars['String'];
  riskScore: Scalars['String'];
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

export type UtxoTransactionV2Connection = {
  __typename?: 'UTXOTransactionV2Connection';
  /** A list of edges. */
  edges: Array<UtxoTransactionV2Edge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UtxoTransactionV2Edge = {
  __typename?: 'UTXOTransactionV2Edge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: UtxoTransactionV2;
};

/** Start undelegating asset from validator. Reverse of [`DelegateStakeActivityV0`] */
export type UndelegateStakeActivityV0 = {
  __typename?: 'UndelegateStakeActivityV0';
  amount?: Maybe<Scalars['IntegerString']>;
  asset?: Maybe<AssetV0>;
  validator?: Maybe<ValidatorV0>;
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

export type UserPortfolio = {
  __typename?: 'UserPortfolio';
  /** Historical sum of assets for specific address and chain in fiat */
  addressHistory?: Maybe<AddressPortfolioFiat>;
  /** Represents user's wallet portfolio, that is build from multiple accounts */
  walletHistory?: Maybe<WalletPortfolioFiat>;
};

export type UserPortfolioAddressHistoryArgs = {
  address: Scalars['String'];
  chain: PortfolioChainVariant;
  timePeriod: TimePeriod;
};

export type UserPortfolioWalletHistoryArgs = {
  accounts: Array<AccountPortfolioRequest>;
  maxAggregationTimeout?: InputMaybe<Scalars['Int']>;
  timePeriod: TimePeriod;
};

export type UtxotransactionByHashV5 = {
  __typename?: 'UtxotransactionByHashV5';
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
  hex?: Maybe<Scalars['String']>;
  /** Inputs from the privous outputs, as addresses and values */
  inputs: Array<Input>;
  /** (numeric) The lock time */
  locktime?: Maybe<Scalars['Int']>;
  /** outputs containing */
  outputs: Array<Output>;
  /** (numeric) The serialized transaction size */
  size: Scalars['Int'];
  /** ( either blockbook or blockchair ) */
  sourceOfData: Scalars['String'];
  /** (numeric, optional) Same as "blocktime" */
  time?: Maybe<Scalars['Int']>;
  /** (string) The transaction id (same as provided) */
  txid?: Maybe<Scalars['String']>;
  /** (numeric) The version */
  version: Scalars['Int'];
  /**
   * vin, input records directly from the node's response.
   * contains the privious outputs data.
   */
  vin?: Maybe<Array<UtxovinV3>>;
  /** vout */
  vout?: Maybe<Array<UtxovoutV2>>;
};

export type UtxovinV3 = {
  __typename?: 'UtxovinV3';
  addresses?: Maybe<Array<Scalars['String']>>;
  coinbase?: Maybe<Scalars['String']>;
  isAddress?: Maybe<Scalars['Boolean']>;
  n?: Maybe<Scalars['Int']>;
  sequence?: Maybe<Scalars['Int']>;
  txid?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  vout?: Maybe<Scalars['Int']>;
};

export type UtxovoutV2 = {
  __typename?: 'UtxovoutV2';
  addresses?: Maybe<Array<Scalars['String']>>;
  hex: Scalars['String'];
  isAddress?: Maybe<Scalars['Boolean']>;
  isOwn?: Maybe<Scalars['Boolean']>;
  n?: Maybe<Scalars['Int']>;
  spent?: Maybe<Scalars['Boolean']>;
  spentHeight?: Maybe<Scalars['Int']>;
  spentTxId?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type ValidatorV0 = {
  __typename?: 'ValidatorV0';
  address?: Maybe<Scalars['String']>;
  chain?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
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

/** Represent wallet activities for a single transaction related to specific address */
export type WalletActivityV0 = {
  __typename?: 'WalletActivityV0';
  /** Wallet address that activity is related to */
  address: AddressV0;
  /** Assets movements (Sent and Received activities) */
  basic: Array<BasicActivityV0>;
  /** Block height (null for pending txs) */
  blockHeight?: Maybe<Scalars['Int']>;
  /** Time of the transaction as ISO 8601 string */
  datetime?: Maybe<Scalars['DateTime']>;
  /** Complex activities (Swap, Withdraw, Stake, etc.); build on top of `basic` */
  detailed?: Maybe<Array<DetailedActivityV0>>;
  /** Transaction fees */
  fees?: Maybe<FeesV0>;
  /** Transaction hash that was parsed to provide this activity */
  txHash: Scalars['String'];
  /** Details of transaction status (pending, success, failed). null if status was not available */
  txStatus?: Maybe<TransactionStatusDetails>;
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

export type WalletPortfolioFiat = {
  __typename?: 'WalletPortfolioFiat';
  accounts: Array<AccountPortfolioFiat>;
  /** Provide sum of all accounts with aligned dates */
  sum?: Maybe<SumPortfolioFiat>;
};

/** Transfer of asset that was previously staked */
export type WithdrawUnstakedActivityV0 = {
  __typename?: 'WithdrawUnstakedActivityV0';
  amount?: Maybe<Scalars['IntegerString']>;
  asset?: Maybe<AssetV0>;
  /** on Solana (stake account) */
  from?: Maybe<AddressV0>;
};

export type ZetaChain = {
  __typename?: 'ZetaChain';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  average24hFee?: Maybe<Eip1559GasFee>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<Eip1559GasFee>;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type ZetaChainActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type ZetaChainBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type ZetaChainNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type ZetaChainTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
};

export type ZkSync = {
  __typename?: 'ZkSync';
  /** activity history for address in descending order */
  activityHistoryV0?: Maybe<WalletActivityV0Connection>;
  /** Native (always present) and token balances for address */
  balances: Array<Balance>;
  fee?: Maybe<DefaultGasFee>;
  feeHistory: DefaultGasFee;
  name: Scalars['String'];
  nfts: Array<NfTv2>;
  status: Status;
  /** @deprecated Please use activity history. This endpoint will be removed after 2024-07-31 */
  transactions: EvmTransactionV2Connection;
  version: Array<Version>;
};

export type ZkSyncActivityHistoryV0Args = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type ZkSyncBalancesArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  tokenAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type ZkSyncNftsArgs = {
  address: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
};

export type ZkSyncTransactionsArgs = {
  address: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  blockRange?: InputMaybe<OptBlockRange>;
  dateRange?: InputMaybe<OptDateRange>;
  first?: InputMaybe<Scalars['Int']>;
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
        price?: {
          __typename?: 'AssetAmountType';
          amount: string;
          dayPriceChange?: string | null;
        } | null;
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
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dayPriceChange',
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

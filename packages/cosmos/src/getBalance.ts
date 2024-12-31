import {
  Asset,
  BalanceFilter,
  Coin,
  getCryptoAssets,
} from '@xdefi-tech/chains-core';
import axios, { AxiosInstance } from 'axios';
import BigNumber from 'bignumber.js';

import {
  COSMOS_ADDRESS_CHAIN,
  COSMOS_MANIFESTS,
  CosmosHubChains,
  CosmosManifest,
} from './manifests';
import { getFallbackAsset } from './datasource/fallback-asset/cosmos.fallback-asset';
import { CryptoAssetArgs } from './gql';
import { getBalance as getBalanceInternal } from './datasource/indexer/queries';

export interface CosmosCoin {
  readonly denom: string;
  readonly amount: string;
}

const clients: Partial<{ [key in CosmosHubChains]: AxiosInstance }> = {};
export const getLcdClientPerChain = (chainId: CosmosHubChains) => {
  if (!clients[chainId]) {
    clients[chainId] = axios.create({
      baseURL: COSMOS_ADDRESS_CHAIN[chainId],
      headers: {
        'Cache-Control': 'no-cache', // Additional header to suggest no caching
      },
    });
  }
  if (!clients[chainId]) {
    throw new Error('Invalid chainId');
  }
  return clients[chainId];
};

export async function getBalanceChain(
  filter: BalanceFilter,
  chainId: CosmosHubChains
): Promise<Coin[]> {
  const { address } = filter;

  const manifest = COSMOS_MANIFESTS[chainId];

  const response = await getLcdClientPerChain(chainId)?.get(
    `cosmos/bank/v1beta1/balances/${address}?timestamp=${new Date().getTime()}`
  );

  if (!response) {
    throw new Error('Invalid response in getBalance');
  }

  const balances = response.data.balances as CosmosCoin[];
  if (!balances.some((b) => b.denom === manifest.denom)) {
    balances.unshift({
      denom: manifest.denom,
      amount: '0',
    });
  }
  const chain =
    COSMOS_ADDRESS_CHAIN[manifest.chain as keyof typeof COSMOS_ADDRESS_CHAIN];
  const cryptoAssetsInput = balances.map<CryptoAssetArgs>(({ denom }) => ({
    chain: chain,
    contract: manifest.denom === denom ? null : denom,
  }));
  let assets: any;
  try {
    const {
      data: {
        assets: { cryptoAssets },
      },
    } = await getCryptoAssets(cryptoAssetsInput);
    assets = cryptoAssets;
  } catch (error) {
    assets = await getFallbackAsset(
      manifest.chainId,
      cryptoAssetsInput,
      manifest.denom
    );
  }

  return balances.reduce((result: Coin[], { amount }, index) => {
    const asset = assets && assets[index];
    if (!asset) {
      return result;
    }

    const coin = new Coin(
      new Asset({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: asset.id!,
        chainId: manifest.chainId,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: asset!.name!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        symbol: asset.symbol!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        icon: asset.image,
        native: !Boolean(asset.contract),
        address: asset.contract,
        price: asset.price?.amount,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        decimals: asset.decimals!,
      }),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      new BigNumber(amount).dividedBy(10 ** (asset.decimals || 0))
    );

    result.push(coin);
    return result;
  }, []);
}

export interface GetBalanceParams {
  filter: BalanceFilter;
  chainId: CosmosHubChains;
  manifest?: CosmosManifest;
}

export async function getBalance({
  filter,
  chainId,
  manifest,
}: GetBalanceParams): Promise<Coin[]> {
  const { address } = filter;
  const _manifest = manifest ? manifest : COSMOS_MANIFESTS[chainId];

  const balances = await getBalanceInternal(
    _manifest.chain as CosmosHubChains,
    address
  );
  // cut off balances without asset
  const formattedBalances = balances.filter(
    (b) => b.asset.symbol && b.asset.id
  );

  return formattedBalances.map((balance): Coin => {
    const { asset, amount } = balance;

    return new Coin(
      new Asset({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: asset.id!,
        chainId: _manifest.chainId,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: asset.name!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        symbol: asset.symbol!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        icon: asset.image!,
        native: !Boolean(asset.contract),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        address: asset.contract!,
        price: asset.price?.amount,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        decimals: asset.decimals!,
        priceChange: {
          dayPriceChange: asset.price?.dayPriceChange,
        },
        type: asset.type,
        categories: asset.categories,
      }),
      new BigNumber(amount.value).dividedBy(10 ** (asset.decimals as number))
    );
  });
}

import { Asset, BalanceFilter, Coin } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';

import { getBalance as getBalanceInternal } from './datasource/indexer/queries';
import { THORCHAIN_MANIFESTS, ThorChains, ThorManifest } from './manifests';

export interface GetBalanceParams {
  filter: BalanceFilter;
  chainId: ThorChains;
  tokenAddresses?: string[];
  manifest?: ThorManifest;
}

export async function getBalance({
  chainId,
  filter,
  manifest,
}: GetBalanceParams): Promise<Coin[]> {
  const { address } = filter;
  const _manifest = manifest ? manifest : THORCHAIN_MANIFESTS[chainId];
  const balances = await getBalanceInternal(_manifest.chain, address);
  // cut off balances without asset
  const filteredBalances = balances.filter(
    (b: any) => b.asset.symbol && b.asset.id
  );

  return filteredBalances.map((balance: any): Coin => {
    const { asset, amount } = balance;

    return new Coin(
      new Asset({
        id: asset.id,
        chainId: _manifest.chainId,
        name: asset.name,
        symbol: asset.symbol,
        icon: asset.image,
        native: !Boolean(asset.contract),
        address: asset.contract,
        price: asset.price?.amount,
        decimals: asset.decimals,
        priceChange: {
          dayPriceChange: asset.price?.dayPriceChange,
        },
        type: asset.type,
        categories: asset.categories,
      }),
      new BigNumber(amount.value)
        .integerValue()
        .dividedBy(Math.pow(10, asset.decimals))
    );
  });
}

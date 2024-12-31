import { Asset, BalanceFilter, Coin } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';

import { getBalance as getBalanceInternal } from './datasource/indexer/queries';
import { SOLANA_MANIFEST } from './manifests';

export async function getBalance(filter: BalanceFilter): Promise<Coin[]> {
  const { address } = filter;
  const { data } = await getBalanceInternal(address);
  // cut off balances without asset
  const balances = data.solana.balances.filter(
    (b: any) => b.asset.symbol && b.asset.id
  );

  return balances.map((balance: any): Coin => {
    const { asset, amount } = balance;

    return new Coin(
      new Asset({
        id: asset.id,
        chainId: SOLANA_MANIFEST.chainId,
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

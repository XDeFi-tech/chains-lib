import { Asset, BalanceFilter, Coin } from '@xdefi-tech/chains-core';
import { formatUnits } from '@ethersproject/units';

import { getBalance as getBalanceInternal } from './datasource/indexer/queries';
import { DOGECOIN_MANIFEST } from './manifests';

export async function getBalance(filter: BalanceFilter): Promise<Coin[]> {
  const { address } = filter;
  const balances = await getBalanceInternal(address);

  return balances.reduce((result, balance) => {
    const { asset, amount } = balance;
    if (asset.id && asset.symbol && asset.name) {
      result.push(
        new Coin(
          new Asset({
            id: asset.id,
            chainId: DOGECOIN_MANIFEST.chainId,
            name: asset.name,
            symbol: asset.symbol,
            icon: asset.image,
            native: asset.contract === null || asset.contract === undefined,
            address: asset.contract,
            price: asset.price?.amount,
            decimals: asset.decimals || 0,
            priceChange: {
              dayPriceChange: asset.price?.dayPriceChange,
            },
            type: asset.type,
            categories: asset.categories,
          }),
          formatUnits(amount.value, asset.decimals || 0)
        )
      );
    }
    return result;
  }, [] as Coin[]);
}

import { Asset, BalanceFilter, Coin } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import { AddressZero } from '@ethersproject/constants';

import { getBalance as getBalanceInternal } from './datasource/indexer/queries';
import { EVM_MANIFESTS, EVMChainManifest, EVMChains } from './manifests';
import { getBalanceByBatch } from './datasource/batch-rpc/evm.batch-call';
import { getEvmBalance } from './datasource/multicall/evm.multicall';

export interface GetBalanceParams {
  filter: BalanceFilter;
  chainId: EVMChains;
  tokenAddresses?: string[];
  manifest?: EVMChainManifest;
}

export async function getBalance({
  filter,
  chainId,
  tokenAddresses,
  manifest,
}: GetBalanceParams): Promise<Coin[]> {
  const { address } = filter;

  const _manifest = manifest ? manifest : EVM_MANIFESTS[chainId];

  let balances;
  if (!tokenAddresses) {
    balances = await getBalanceInternal(_manifest.chain as EVMChains, address);
  } else {
    // Remove duplicate addresses
    const uniqueAddresses = Array.from(new Set(tokenAddresses));

    // Multicall contracts only call deployed contracts, so they can't query native token balances.
    const isFetchNativeTokenBalance = uniqueAddresses.some(
      (address) => address === AddressZero
    );
    const nativeTokenInfo = {
      name: _manifest.name,
      contract: null,
      decimals: _manifest.decimals,
      symbol: _manifest.chainSymbol,
    };
    if (_manifest.multicallContractAddress && !isFetchNativeTokenBalance) {
      balances = await getEvmBalance(
        _manifest.rpcURL,
        _manifest.name,
        address,
        uniqueAddresses
      );
    } else {
      balances = await getBalanceByBatch(
        _manifest.rpcURL,
        address,
        uniqueAddresses,
        nativeTokenInfo
      );
    }
  }

  if (!balances) {
    return [];
  }
  return balances.map((balance: any): Coin => {
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

import { JsonRpcBatchProvider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';

if (
  JsonRpcBatchProvider == null ||
  BigNumber == null ||
  AddressZero == null ||
  Contract == null
) {
  throw new Error('Error loading ethers dependencies 2');
}

import erc20Abi from '../../consts/erc20.json';
export const getBalanceByBatch = async (
  rpc: string,
  walletAddress: string,
  tokenAddresses: string[],
  nativeTokenInfo: {
    name: string;
    symbol: string;
    contract: string | null;
    decimals: number;
  }
) => {
  try {
    const provider = new JsonRpcBatchProvider(rpc);
    const callPromise = tokenAddresses.map(async (tokenAddress) => {
      if (tokenAddress === AddressZero) {
        const balance = await provider.getBalance(walletAddress);
        return {
          address: walletAddress,
          amount: {
            value: BigNumber.from(balance).toString(),
            scalingFactor: BigNumber.from(nativeTokenInfo.decimals).toString(),
          },
          asset: nativeTokenInfo,
        };
      }
      const contract = new Contract(tokenAddress, erc20Abi, provider);
      const [balanceOf, symbol, name, decimal] = await Promise.all([
        contract.balanceOf(walletAddress),
        contract.callStatic.symbol(),
        contract.callStatic.name(),
        contract.callStatic.decimals(),
      ]);
      return {
        address: walletAddress,
        amount: {
          value: BigNumber.from(balanceOf._hex).toString(),
          scalingFactor: BigNumber.from(decimal._hex).toString(),
        },
        asset: {
          decimals: BigNumber.from(decimal._hex).toString(),
          contract: tokenAddress,
          name,
          symbol,
        },
      };
    });
    return Promise.all(callPromise);
  } catch (error) {
    throw error;
  }
};

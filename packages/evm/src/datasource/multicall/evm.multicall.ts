import { Contract, ethers } from 'ethers';
import { decodeHexString } from '../../utils';

import multicallAbi from '../../consts/multicall.json';
import erc20Abi from '../../consts/erc20.json';
export const getEvmBalance = async (
  rpc: string,
  multiCallAddress: string,
  walletAddress: string,
  chainSymbol: string,
  tokenAddresses: string[]
) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const multicall = new Contract(multiCallAddress, multicallAbi, provider);
    const ethersDecimal = 18;
    const interfaces = new ethers.utils.Interface(erc20Abi);
    const balanceOfCallData = interfaces.encodeFunctionData('balanceOf', [
      walletAddress,
    ]);
    const balanceOfCalls = tokenAddresses.map((tokenAddress) => ({
      target: tokenAddress,
      allowFailure: true,
      callData: balanceOfCallData,
    }));

    const decimalCallData = interfaces.encodeFunctionData('decimals');
    const decimalCalls = tokenAddresses.map((tokenAddress) => ({
      target: tokenAddress,
      allowFailure: true,
      callData: decimalCallData,
    }));

    const nameCallData = interfaces.encodeFunctionData('name');
    const nameCalls = tokenAddresses.map((tokenAddress) => ({
      target: tokenAddress,
      allowFailure: true,
      callData: nameCallData,
    }));

    const symbolCallData = interfaces.encodeFunctionData('symbol');
    const symbolCalls = tokenAddresses.map((tokenAddress) => ({
      target: tokenAddress,
      allowFailure: true,
      callData: symbolCallData,
    }));

    const [walletBalance, balanceOfResults, decimals, names, symbols] =
      await Promise.all([
        provider.getBalance(walletAddress),
        multicall.callStatic.aggregate3(balanceOfCalls),
        multicall.callStatic.aggregate3(decimalCalls),
        multicall.callStatic.aggregate3(nameCalls),
        multicall.callStatic.aggregate3(symbolCalls),
      ]);
    const formattedWalletBalance = {
      address: walletAddress,
      amount: {
        value: walletBalance.toString(),
        scalingFactor: ethersDecimal,
      },
      asset: {
        symbol: chainSymbol,
        decimals: ethersDecimal,
        contract: null,
        name: chainSymbol,
      },
    };
    const formattedTokenBalances = tokenAddresses.map(
      (tokenAddress, index) => ({
        address: walletAddress,
        amount: {
          value: ethers.BigNumber.from(
            balanceOfResults[index].returnData
          ).toString(),
          scalingFactor: decimals[index],
        },
        asset: {
          decimals: ethers.BigNumber.from(
            decimals[index].returnData
          ).toString(),
          contract: tokenAddress,
          name: decodeHexString(names[index].returnData),
          symbol: decodeHexString(symbols[index].returnData),
        },
      })
    );

    return [formattedWalletBalance, ...formattedTokenBalances];
  } catch (error) {
    throw error;
  }
};

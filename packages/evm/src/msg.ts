import {
  GasFeeSpeed,
  HexString,
  Msg as BasMsg,
  NumberIsh,
  utils,
} from '@xdefi/chains-core';
import { ethers } from 'ethers';
import {
  ERC1155_SAFE_TRANSFER_METHOD,
  ERC721_SAFE_TRANSFER_METHOD,
} from 'consts';

import erc20ABI from './consts/erc20.json';
import erc721ABI from './consts/erc721.json';
import erc1155ABI from './consts/erc1155.json';

export enum TokenType {
  None = 'None', // common tx
  ERC20 = 'ERC20', // token
  ERC721 = 'ERC721', // nft
  ERC1155 = 'ERC1155', // nft
}

export interface MsgBody {
  nonce: NumberIsh;
  to: string;
  from: string;
  amount: NumberIsh;
  chainId: NumberIsh;
  data?: HexString;
  gasLimit?: NumberIsh;
  gasPrice?: NumberIsh;
  maxFeePerGas?: NumberIsh;
  maxPriorityFeePerGas?: NumberIsh;
  tokenType?: TokenType;
  nftId?: string;
  contractAddress?: string;
}

export interface TxData {
  nonce: HexString;
  to: string;
  from: string;
  chainId: HexString;
  value: HexString;
  data: HexString;
  gasLimit: HexString;
  gasPrice: HexString;
  maxFeePerGas: HexString;
  maxPriorityFeePerGas: HexString;
  type?: number; // ethers type
}

export interface FeeEstimation {
  fee: HexString | null;
  maxFee: HexString | null;
}

export class ChainMsg extends BasMsg<MsgBody, TxData, FeeEstimation> {
  getFee(): FeeEstimation {
    const estimation: FeeEstimation = {
      fee: null,
      maxFee: null,
    };

    if (this.data.maxFeePerGas) {
      if (
        !this.data.maxFeePerGas ||
        !this.data.gasLimit ||
        !this.data.maxPriorityFeePerGas
      ) {
        return estimation;
      }

      const maxFee = ethers.utils.parseUnits(
        String(this.data.maxFeePerGas),
        'gwei'
      );
      const priorityFee = ethers.utils.parseUnits(
        String(this.data.maxPriorityFeePerGas),
        'gwei'
      );
      const maxFeeWithPriority = maxFee.add(priorityFee);
      estimation.fee = ethers.utils
        .formatUnits(maxFee.mul(this.data.gasLimit), 'ether')
        .toString();
      estimation.maxFee = ethers.utils
        .formatUnits(maxFeeWithPriority.mul(this.data.gasLimit), 'ether')
        .toString();
    } else {
      if (!this.data.gasPrice || !this.data.gasLimit) {
        return estimation;
      }
      const gasPrice = ethers.utils.parseUnits(
        String(this.data.gasPrice),
        'gwei'
      );
      const gasFee = gasPrice.mul(this.data.gasLimit);

      estimation.fee = ethers.utils.formatUnits(gasFee, 'ether').toString();
    }

    return estimation;
  }

  toData(): MsgBody {
    return {
      nonce: this.data?.nonce,
      to: this.data?.to,
      from: this.data?.from,
      amount: this.data?.amount,
      chainId: this.data?.chainId,
      data: this.data?.data,
      gasLimit: this.data?.gasLimit,
      gasPrice: this.data?.gasPrice,
      maxFeePerGas: this.data?.maxFeePerGas,
      maxPriorityFeePerGas: this.data?.maxPriorityFeePerGas,
      tokenType: this.data?.tokenType,
      contractAddress: this.data?.contractAddress,
      nftId: this.data?.nftId,
    };
  }

  async buildTx(): Promise<TxData> {
    let msgData = this.toData();

    if (this.provider) {
      if (!msgData.gasLimit) {
        const [feeData] = await this.provider.estimateFee(
          [this],
          GasFeeSpeed.medium
        );
        msgData = { ...msgData, ...feeData };
      }
      if (!msgData.nonce) {
        msgData.nonce = await this.provider.getNonce(msgData.to);
      }
      if (!msgData.chainId) {
        msgData.chainId = this.provider.manifest.chainId;
      }
    }

    if (!msgData.gasLimit) {
      throw new Error('Gas fields are required');
    }

    if (!msgData.amount) {
      msgData.amount = 0;
    }

    const baseTx: Partial<TxData> = {
      from: msgData.from,
      to: msgData.to,
      gasLimit: utils.toHex(msgData.gasLimit),
      nonce: utils.toHex(msgData.nonce),
      chainId: utils.toHex(msgData.chainId),
    };

    if (msgData.maxFeePerGas && msgData.maxPriorityFeePerGas) {
      baseTx.maxFeePerGas = utils.toHex(
        ethers.utils
          .parseUnits(msgData.maxFeePerGas.toString(), 'gwei')
          .toString()
      );
      baseTx.maxPriorityFeePerGas = utils.toHex(
        ethers.utils
          .parseUnits(msgData.maxPriorityFeePerGas.toString(), 'gwei')
          .toString()
      );
      baseTx.type = 2;
    } else {
      baseTx.gasPrice = utils.toHex(msgData.gasPrice as NumberIsh);
    }

    let contract, populatedTx;
    switch (this.data.tokenType) {
      case TokenType.ERC20:
        contract = new ethers.Contract(
          msgData.contractAddress as string,
          erc20ABI,
          this.provider?.rpcProvider
        );
        populatedTx = await contract.populateTransaction.transfer(
          msgData.to,
          ethers.utils.parseEther(msgData.amount.toString())
        );
        baseTx.value = '0x00';
        baseTx.data = populatedTx.data;
        baseTx.to = populatedTx.to;
        break;
      case TokenType.ERC721:
        contract = new ethers.Contract(
          msgData.contractAddress as string,
          erc721ABI,
          this.provider?.rpcProvider
        );
        populatedTx = await contract.populateTransaction[
          ERC721_SAFE_TRANSFER_METHOD
        ](msgData.from, msgData.to, msgData.nftId, {
          gasLimit: baseTx.gasLimit,
          gasPrice: baseTx.gasPrice,
          nonce: baseTx.nonce,
          maxFeePerGas: baseTx.maxFeePerGas,
          maxPriorityFeePerGas: baseTx.maxPriorityFeePerGas,
        });
        baseTx.value = populatedTx.value?.toHexString();
        baseTx.data = populatedTx.data;
        baseTx.to = populatedTx.to;
        break;
      case TokenType.ERC1155:
        contract = new ethers.Contract(
          msgData.contractAddress as string,
          erc1155ABI,
          this.provider?.rpcProvider
        );
        populatedTx = await contract.populateTransaction[
          ERC1155_SAFE_TRANSFER_METHOD
        ](msgData.from, msgData.to, msgData.nftId, 1, [], {
          gasLimit: baseTx.gasLimit,
          gasPrice: baseTx.gasPrice,
          nonce: baseTx.nonce,
          maxFeePerGas: baseTx.maxFeePerGas,
          maxPriorityFeePerGas: baseTx.maxPriorityFeePerGas,
        });
        baseTx.value = populatedTx.value?.toHexString();
        baseTx.data = populatedTx.data;
        baseTx.to = populatedTx.to;
        break;
      default:
        baseTx.value = ethers.utils
          .parseEther(msgData.amount.toString())
          .toHexString();
    }

    return baseTx as TxData;
  }
}

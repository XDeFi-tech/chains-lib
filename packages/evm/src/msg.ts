import {
  FeeEstimation,
  GasFeeSpeed,
  HexString,
  Msg as BasMsg,
  NumberIsh,
  utils,
} from '@xdefi-tech/chains-core';
import { ethers } from 'ethers';

import erc20ABI from './consts/erc20.json';
import erc721ABI from './consts/erc721.json';
import erc1155ABI from './consts/erc1155.json';
import {
  ERC1155_SAFE_TRANSFER_METHOD,
  ERC721_SAFE_TRANSFER_METHOD,
} from './consts';
import { parseGwei } from './utils';

export enum TokenType {
  None = 'None', // common tx
  ERC20 = 'ERC20', // token
  ERC721 = 'ERC721', // nft
  ERC1155 = 'ERC1155', // nft
}

export enum TransactionType {
  Legacy = 0,
  EIP1559 = 2,
}

export interface MsgBody {
  nonce: NumberIsh;
  to: string;
  from: string;
  amount: NumberIsh;
  decimals: string | number;
  chainId: NumberIsh;
  data?: HexString;
  gasLimit?: NumberIsh;
  gasPrice?: NumberIsh;
  maxFeePerGas?: NumberIsh;
  maxPriorityFeePerGas?: NumberIsh;
  tokenType?: TokenType;
  nftId?: string;
  contractAddress?: string;
  txType?: TransactionType;
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

export class ChainMsg extends BasMsg<MsgBody, TxData> {
  signedTransaction: string | undefined;

  async getDataFromContract() {
    const msgData = this.toData();
    const contractData: { value?: string; data?: string; to?: string } = {};
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
          ethers.utils.parseUnits(
            msgData.amount.toString(),
            msgData.decimals.toString()
          )
        );
        contractData.value = '0x00';
        contractData.data = populatedTx.data;
        contractData.to = populatedTx.to;
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
          gasLimit: utils.toHex(msgData.gasLimit || 21000),
        });
        contractData.value = populatedTx.value?.toHexString();
        contractData.data = populatedTx.data;
        contractData.to = populatedTx.to;
        break;
      case TokenType.ERC1155:
        contract = new ethers.Contract(
          msgData.contractAddress as string,
          erc1155ABI,
          this.provider?.rpcProvider
        );
        populatedTx = await contract.populateTransaction[
          ERC1155_SAFE_TRANSFER_METHOD
        ](msgData.from, msgData.to, msgData.nftId, 1, [], {});
        contractData.value = populatedTx.value?.toHexString();
        contractData.data = populatedTx.data;
        contractData.to = populatedTx.to;
        break;
      default:
        contractData.value = ethers.utils
          .parseUnits(msgData.amount.toString(), msgData.decimals.toString())
          .toHexString();
    }

    return { populatedTx, contractData };
  }

  async getFee(speed?: GasFeeSpeed) {
    const estimation: FeeEstimation = {
      fee: null,
      maxFee: null,
    };

    const feeOptions = {
      gasLimit: this.data.gasLimit,
      gasPrice: this.data.gasPrice,
      maxFeePerGas: this.data.maxFeePerGas,
      maxPriorityFeePerGas: this.data.maxPriorityFeePerGas,
    };

    if (
      this.data.contractAddress ||
      !feeOptions.maxFeePerGas ||
      !feeOptions.gasLimit ||
      !feeOptions.maxPriorityFeePerGas
    ) {
      const contractFeeEstimation = await this.provider?.estimateFee(
        [this],
        speed || GasFeeSpeed.medium
      );

      if (contractFeeEstimation) {
        feeOptions.gasLimit = contractFeeEstimation[0].gasLimit;
        feeOptions.gasPrice = contractFeeEstimation[0].gasPrice;
        feeOptions.maxFeePerGas = contractFeeEstimation[0].maxFeePerGas;
        feeOptions.maxPriorityFeePerGas =
          contractFeeEstimation[0].maxPriorityFeePerGas;
      }
    }

    if (
      this.data.txType !== TransactionType.Legacy &&
      feeOptions.maxFeePerGas
    ) {
      const maxFee = parseGwei(feeOptions.maxFeePerGas);
      const priorityFee = parseGwei(feeOptions.maxPriorityFeePerGas);
      const maxFeeWithPriority = maxFee.plus(priorityFee);
      estimation.fee = ethers.utils
        .formatUnits(
          maxFee.multipliedBy(feeOptions.gasLimit).toString(),
          'ether'
        )
        .toString();
      estimation.maxFee = ethers.utils
        .formatUnits(
          maxFeeWithPriority.multipliedBy(feeOptions.gasLimit).toString(),
          'ether'
        )
        .toString();
    } else {
      if (!feeOptions.gasPrice) {
        return estimation;
      }
      const gasPrice = parseGwei(feeOptions.gasPrice);
      const gasFee = gasPrice.plus(feeOptions.gasLimit);

      estimation.fee = ethers.utils
        .formatUnits(gasFee.toString(), 'ether')
        .toString();
    }

    return estimation;
  }

  toData(): MsgBody {
    return {
      nonce: this.data?.nonce,
      to: this.data?.to,
      from: this.data?.from,
      amount: this.data?.amount,
      decimals: this.data?.decimals || 18,
      chainId: this.data?.chainId,
      data: this.data?.data,
      gasLimit: this.data?.gasLimit,
      gasPrice: this.data?.gasPrice,
      maxFeePerGas: this.data?.maxFeePerGas,
      maxPriorityFeePerGas: this.data?.maxPriorityFeePerGas,
      tokenType: this.data?.tokenType,
      contractAddress: this.data?.contractAddress,
      nftId: this.data?.nftId,
      txType: this.data?.txType,
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
        msgData.nonce = await this.provider.getNonce(msgData.from);
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
      ...(msgData.data && { data: msgData.data }),
    };

    if (
      msgData.txType !== TransactionType.Legacy &&
      msgData.maxFeePerGas &&
      msgData.maxPriorityFeePerGas
    ) {
      baseTx.maxFeePerGas = utils.toHex(
        parseGwei(msgData.maxFeePerGas).toString()
      );
      baseTx.maxPriorityFeePerGas = utils.toHex(
        parseGwei(msgData.maxPriorityFeePerGas).toString()
      );
      baseTx.type = 2;
    } else {
      if (msgData.txType === TransactionType.Legacy && !msgData.gasPrice) {
        throw new Error(
          'Legacy transactions required gasPrice and gasLimit fields'
        );
      }
      baseTx.gasPrice = utils.toHex(msgData.gasPrice as NumberIsh);
    }

    const { contractData } = await this.getDataFromContract();
    baseTx.value = contractData.value;
    if (contractData.data) {
      baseTx.data = contractData.data;
      baseTx.to = contractData.to;
    }

    return baseTx as TxData;
  }
}

import {
  FeeEstimation,
  GasFeeSpeed,
  HexString,
  Msg as BasMsg,
  MsgEncoding,
  NumberIsh,
  utils,
  Coin,
} from '@xdefi-tech/chains-core';
import { BigNumberish, BytesLike, ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import erc20ABI from './consts/erc20.json';
import erc721ABI from './consts/erc721.json';
import erc1155ABI from './consts/erc1155.json';
import {
  ERC1155_SAFE_TRANSFER_METHOD,
  ERC721_SAFE_TRANSFER_METHOD,
} from './consts';
import type { EvmProvider } from './chain.provider';

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

export enum SignatureType {
  Transaction = 0,
  PersonalSign = 1,
  SignTypedData = 2,
}

export interface EvmTypedData {
  domain: TypedDataDomain;
  fields: Record<string, Array<TypedDataField>>;
  values: Record<string, any>;
}

export interface TypedDataField {
  name: string;
  type: string;
}

export interface TypedDataDomain {
  name?: string;
  version?: string;
  chainId?: BigNumberish;
  verifyingContract?: string;
  salt?: BytesLike;
}

export interface MsgBody {
  nonce: NumberIsh;
  to: string;
  from: string;
  amount: NumberIsh;
  decimals: string | number;
  chainId: NumberIsh;
  data?: HexString;
  typedData?: EvmTypedData;
  gasLimit?: NumberIsh;
  gasPrice?: NumberIsh; // wei
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

export interface EncryptedObject {
  iv: string;
  ephemPublicKey: string;
  ciphertext: string;
  mac: string;
}

export class ChainMsg extends BasMsg<MsgBody, TxData> {
  signedTransaction: string | undefined;
  declare provider: EvmProvider;

  constructor(data: MsgBody, provider: EvmProvider, encoding: MsgEncoding) {
    super(data, provider, encoding);
  }

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
            msgData.decimals && msgData.decimals.toString()
          )
        );
        contractData.value = '0x0';
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
        const decimals =
          (msgData.decimals && msgData.decimals.toString()) ||
          this.provider.manifest.decimals;
        contractData.value = ethers.utils
          .parseUnits(msgData.amount.toString(), decimals)
          .toHexString();
    }

    return { contract, populatedTx, contractData };
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
      const maxFee = new BigNumber(feeOptions.maxFeePerGas);
      const priorityFee = new BigNumber(feeOptions.maxPriorityFeePerGas);
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
      const gasPrice = new BigNumber(feeOptions.gasPrice);
      const gasFee = gasPrice.multipliedBy(feeOptions.gasLimit);

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
      decimals: this.data?.decimals,
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
      typedData: this.data?.typedData,
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
      baseTx.maxFeePerGas = utils.toHex(msgData.maxFeePerGas.toString());
      baseTx.maxPriorityFeePerGas = utils.toHex(
        msgData.maxPriorityFeePerGas.toString()
      );
      baseTx.type = 2;
    } else {
      if (msgData.txType === TransactionType.Legacy && !msgData.gasPrice) {
        throw new Error(
          'Legacy transactions required gasPrice and gasLimit fields'
        );
      }
      if (!msgData.gasPrice) {
        throw new Error(`Invalid gasPrice value: ${msgData.gasPrice}`);
      }
      baseTx.gasPrice = utils.toHex(msgData.gasPrice.toString());
    }

    const { contractData } = await this.getDataFromContract();
    baseTx.value = contractData.value;
    if (contractData.data) {
      baseTx.data = contractData.data;
      baseTx.to = contractData.to;
    }

    return baseTx as TxData;
  }

  async getMaxAmountToSend(contract?: string) {
    const msgData = this.toData();
    const balances = await this.provider.getBalance(msgData.from);
    const gap = new BigNumber(this.provider.manifest?.maxGapAmount || 0);

    let balance: Coin | undefined;

    if (!contract) {
      balance = (await balances.getData()).find(
        (b) =>
          b.asset.chainId === this.provider.manifest.chainId && b.asset.native
      );
    } else {
      balance = (await balances.getData()).find(
        (b) =>
          b.asset.chainId === this.provider.manifest.chainId &&
          b.asset.address === contract
      );
    }

    if (!balance) throw new Error('No balance found');

    let maxAmount: BigNumber = new BigNumber(balance.amount).minus(gap);

    if (balance.asset.native) {
      const feeEstimation = await this.getFee();
      maxAmount = maxAmount.minus(feeEstimation.fee || 0);
    }

    if (maxAmount.isLessThan(0)) {
      return '0';
    }

    return maxAmount.toString();
  }
}

import {
  Msg as BaseMsg,
  Coin,
  MsgEncoding,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import TronWeb, { TronTransaction } from 'tronweb';
import { parseUnits } from 'ethers';
import BigNumber from 'bignumber.js';

import { TronProvider } from './chain.provider';
import { TRON_MANIFEST } from './manifests';
import { buildTransactionFromJsonRpc } from './utils/build-transaction';

export enum TokenType {
  None = 'None',
  TRC10 = 'TRC10',
  TRC20 = 'TRC20',
}

export interface TronFee {
  bandwidth: number;
  energy: number;
  fee: number;
  willRevert: boolean;
}

export interface TronEnergyEstimate {
  energy: number;
  willRevert: boolean;
}

export interface MsgBody {
  to: string;
  from: string;
  amount: NumberIsh;
  tokenType?: TokenType;
  contractAddress?: string;
  tokenId?: string;
  decimals?: number;
  data?: string;
}

export class ChainMsg extends BaseMsg<MsgBody, TronTransaction> {
  signedTransaction: unknown;
  declare provider: TronProvider;

  constructor(data: MsgBody, provider: TronProvider, encoding: MsgEncoding) {
    super(data, provider, encoding);
  }

  public toData(): MsgBody {
    return {
      to: this.data?.to,
      from: this.data?.from,
      amount: this.data?.amount,
      tokenType: this.data?.tokenType,
      contractAddress: this.data?.contractAddress,
      tokenId: this.data?.tokenId,
      decimals: this.data?.decimals,
      data: this.data?.data,
    };
  }
  async buildTx(): Promise<TronTransaction> {
    const tronWeb = new TronWeb({
      fullHost: TRON_MANIFEST.rpcURL,
    });

    const data = this.toData();

    if (this.encoding === MsgEncoding.string && data.data) {
      const rawTx = JSON.parse(data.data);
      const contract = rawTx.raw_data.contract[0].parameter.value;
      const energy = await this.provider.estimateFee([this]);
      const gas = TronWeb.toSun(energy[0].fee);
      const tx = buildTransactionFromJsonRpc(
        this.provider.httpProvider,
        contract.owner_address,
        contract.contract_address,
        contract.call_value,
        contract.data,
        Number(gas)
      );
      return tx;
      // return {
      //   ...transaction,
      //   raw_data: [transaction.raw_data],
      // };
      // return JSON.parse(data.data);
    }

    if (data.tokenType === TokenType.TRC10) {
      if (!data.tokenId) {
        throw new Error('TRX10 Token ID not provided');
      }
      const tx = tronWeb.transactionBuilder.sendAsset(
        data.to,
        parseInt(tronWeb.toSun(data.amount.toString())),
        data.tokenId,
        data.from
      );
      return tx;
    } else if (data.tokenType === TokenType.TRC20) {
      if (!data.contractAddress) {
        throw new Error('TRC20 Contract Address not provided');
      }

      if (data.decimals === undefined) {
        throw new Error('Token decimals not provided');
      }

      const functionSelector = 'transfer(address,uint256)';
      const parameter = [
        { type: 'address', value: data.to },
        {
          type: 'uint256',
          value: parseUnits(data.amount.toString(), data.decimals),
        },
      ];

      // WTF
      // https://github.com/tronprotocol/tronweb/issues/90
      tronWeb.setAddress(data.from);

      const tx = await tronWeb.transactionBuilder.triggerSmartContract(
        data.contractAddress,
        functionSelector,
        {},
        parameter
      );

      return tx.transaction;
    } else {
      const tx = tronWeb.transactionBuilder.sendTrx(
        data.to,
        parseInt(tronWeb.toSun(data.amount.toString())),
        data.from
      );
      return tx;
    }
  }

  async getFee() {
    const [msgFee] = await this.provider.estimateFee([this]);

    return {
      fee: new BigNumber(msgFee.fee).toString(),
      maxFee: null,
    };
  }

  async getMaxAmountToSend() {
    const msgData = this.toData();
    const balances = await this.provider.getBalance(msgData.from);
    const gap = new BigNumber(this.provider.manifest?.maxGapAmount || 0);

    const balance = (await balances.getData()).find(
      (b) =>
        b.asset.chainId === this.provider.manifest.chainId && b.asset.native
    );

    const { fee } = await this.getFee();

    if (!balance) throw new Error('No balance found');

    const maxAmount: BigNumber = new BigNumber(balance.amount)
      .minus(fee)
      .minus(gap);

    if (maxAmount.isLessThan(0)) {
      return '0';
    }

    return maxAmount.toString();
  }
}

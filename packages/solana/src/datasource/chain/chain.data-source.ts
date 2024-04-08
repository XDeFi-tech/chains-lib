import {
  Asset,
  Balance,
  BalanceFilter,
  Chain,
  Coin,
  DataSource,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
  Injectable,
  Transaction,
  TransactionData,
  TransactionStatus,
  TransactionsFilter,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import axios, { Axios } from 'axios';
import {
  Connection,
  ParsedAccountData,
  PublicKey,
  VersionedMessage,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';

import { ChainMsg } from '../../msg';

@Injectable()
export class ChainDataSource extends DataSource {
  declare rpcProvider: Connection;
  public rest: Axios;

  constructor(manifest: Chain.Manifest) {
    super(manifest);
    this.rpcProvider = new Connection(this.manifest.rpcURL);
    this.rest = axios.create({ baseURL: this.manifest.rpcURL });
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const balance = await this.rpcProvider.getBalance(
      new PublicKey(filter.address)
    );

    const result: Coin[] = [];
    const nativeToken = new Coin(
      new Asset({
        id: this.manifest.name,
        chainId: this.manifest.chainId,
        name: this.manifest.name,
        symbol: this.manifest.chainSymbol,
        icon: null,
        native: true,
        address: null,
        price: undefined,
        decimals: this.manifest.decimals,
      }),
      new BigNumber(balance.toString()).dividedBy(10 ** this.manifest.decimals)
    );

    result.push(nativeToken);

    const tokens = await this.rpcProvider.getTokenAccountsByOwner(
      new PublicKey(filter.address), // owner here
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    for (const token of tokens.value) {
      const accountInfo = AccountLayout.decode(token.account.data);

      const tokenName = accountInfo.mint.toBase58();
      const tokenSymbol = '';
      const mint = await this.rpcProvider.getParsedAccountInfo(
        accountInfo.mint
      );
      const tokenDecimals =
        (mint.value?.data as ParsedAccountData).parsed ?? 18;
      const tokenBalance = accountInfo.amount;

      const coin = new Coin(
        new Asset({
          chainId: this.manifest.chainId,
          name: tokenName,
          symbol: tokenSymbol,
          address: accountInfo.mint.toBase58(),
          decimals: tokenDecimals,
          native: accountInfo.isNativeOption === 1 ? true : false,
          icon: null,
          id: '',
          price: undefined,
        }),
        new BigNumber(tokenBalance.toString()).dividedBy(10 ** tokenDecimals)
      );
      result.push(coin);
    }

    return result;
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const signaturesList = await this.rpcProvider.getSignaturesForAddress(
      new PublicKey(filter.address)
    );

    const signatureList = signaturesList.map(
      (transaction) => transaction.signature
    );
    const transactionDetails = await this.rpcProvider.getParsedTransactions(
      signatureList,
      { maxSupportedTransactionVersion: 0 }
    );

    const txList: Transaction[] = [];

    for (let i = 0; i < transactionDetails.length; i++) {
      const tx: TransactionData = {
        hash: signatureList[i],
        to:
          transactionDetails[
            i
          ]?.transaction.message.instructions[0].programId.toBase58() ?? '',
        from: filter.address,
        status: transactionDetails[i]?.blockTime
          ? TransactionStatus.success
          : TransactionStatus.pending,
      };

      txList.push(Transaction.fromData(tx));
    }

    return txList;
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  private async _estimateGasLimit(_txParams: any): Promise<number | null> {
    return null;
  }

  async estimateFee(
    msgs: ChainMsg[],
    _speed: GasFeeSpeed = GasFeeSpeed.medium
  ): Promise<FeeData[]> {
    const feeData: FeeData[] = [];

    for (const msg of msgs) {
      const fee = await this.rpcProvider.getFeeForMessage(
        VersionedMessage.deserialize((await msg.buildTx()).tx.serialize())
      );
      if (!fee) {
        throw new Error(`Cannot estimate fee for chain ${this.manifest.chain}`);
      }

      feeData.push({ gasLimit: fee.value ?? 0 });
    }

    return feeData;
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    return null;
  }

  async getNonce(address: string): Promise<number> {
    return (
      await this.rpcProvider.getSignaturesForAddress(new PublicKey(address))
    ).length;
  }
}

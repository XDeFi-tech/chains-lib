---
to: packages/<%= name.toLowerCase() %>/src/datasource/indexer/indexer.data-source.ts
---

import {
    Asset,
    DataSource,
    Coin,
    GasFee,
    GasFeeSpeed,
    Msg,
    Transaction,
    Injectable,
    Chain,
    TransactionsFilter,
    BalanceFilter,
    Balance,
} from '@xdefi/chains-core';
import { ChainMsg } from '../../msg';
import { Observable } from 'rxjs';

@Injectable()
export class IndexerDataSource extends DataSource {
    constructor(manifest: Chain.Manifest) {
        super(manifest);
    }

    async getBalance(filter: BalanceFilter): Promise<Coin[]> {
        throw new Error('Method not implemented.');
    }

    async subscribeBalance(filter: BalanceFilter): Promise<Observable<Balance[]>> {
        throw new Error('Method not implemented.');
    }

    async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
        throw new Error('Method not implemented.');
    }

    async subscribeTransactions(filter: TransactionsFilter): Promise<Observable<Transaction>> {
        throw new Error('Method not implemented.');
    }

    async estimateFee(msgs: ChainMsg[], speed: GasFeeSpeed): Promise<Msg[]> {
        throw new Error('Method not implemented.');
    }

    async gasFeeOptions(): Promise<GasFee> {
        throw new Error('Method not implemented.');
    }

    async getNonce(address: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
}
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
    FeeData,
} from '@xdefi/chains-core';
import { ChainMsg } from '../../msg';
import { Observable } from 'rxjs';
import { getBalance } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
    constructor(manifest: Chain.Manifest) {
        super(manifest);
    }

    async getBalance(filter: BalanceFilter): Promise<Coin[]> {
        const { address } = filter;
        const { data } = await getBalance(address);
        // cut off balances without asset
        const balances = data[this.manifest.chain].balances.filter(
            (b: any) => b.asset.symbol && b.asset.id
        );

        console.log('LOG SOLANA BALANCES', balances);

        return balances.map((balance: any): Coin => {
            const { asset, amount } = balance;

            return new Coin(
                new Asset({
                    id: asset.id,
                    chainId: this.manifest.chainId,
                    name: asset.name,
                    symbol: asset.symbol,
                    icon: asset.image,
                    native: !Boolean(asset.contract),
                    address: asset.contract,
                    price: asset.price?.amount,
                    decimals: asset.price?.scalingFactor,
                }),
                amount.value
            );
        });
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

    async estimateFee(msgs: ChainMsg[], speed: GasFeeSpeed): Promise<FeeData[]> {
        throw new Error('Method not implemented.');
    }

    async gasFeeOptions(): Promise<GasFee> {
        throw new Error('Method not implemented.');
    }

    async getNonce(address: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
}
import {
    Asset,
    BaseRepository,
    Coin,
    GasFee,
    GasFeeSpeed,
    Msg,
    Transaction,
    Injectable,
    Chain,
} from '@xdefi/chains-core';
import { getBalance, getFees, getStatus, getTransaction } from '../queries';
import { ChainMsg } from '../msg';
import { EVMChains, EVM_MANIFESTS } from '../manifests';
import { utils } from 'ethers';

@Injectable()
export class XdefiRepository extends BaseRepository {
    constructor(manifest: Chain.Manifest) {
        super(manifest);
        if (!EVM_MANIFESTS[manifest.chain]) {
            throw new Error('Please use EVM_MANIFESTS for XdefiRepository to avoid gql incompatibility');
        }
    }

    async getBalance(address: string): Promise<Coin[]> {
        const { data } = await getBalance(
            this.manifest.chain as EVMChains,
            address
        );

        // cut off balances without asset
        const balances = data[this.manifest.chain].balances.filter(
            (b: any) => b.asset.symbol && b.asset.id
        );

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
                utils.formatUnits(amount.value, amount.scalingFactor)
            );
        });
    }

    async getTransactions(
        address: string,
        afterBlock?: number | string
    ): Promise<Transaction[]> {
        let blockRange = null;

        if (typeof afterBlock === 'number' || typeof afterBlock === 'string') {
            const { data } = await getStatus(this.manifest.chain);
            blockRange = {
                from: parseInt(String(afterBlock)),
                to: data[this.manifest.chain].status.lastBlock,
            };
        }

        const { data } = await getTransaction(
            this.manifest.chain as EVMChains,
            address,
            blockRange
        );

        return data[this.manifest.chain].transactions.map((transaction: any) => {
            return Transaction.fromData(transaction);
        });
    }

    async estimateFee(msgs: ChainMsg[], speed: GasFeeSpeed): Promise<Msg[]> {
        const { data } = await getFees(this.manifest.chain);
        const fee = data[this.manifest.chain].fee;
        const isEIP1559 = typeof fee[speed]?.priorityFeePerGas === 'number';
        const transactionFee = 21000; // Paid for every transaction

        // gasLimit = 21000 + 68 * dataByteLength
        // https://ethereum.stackexchange.com/questions/39401/how-do-you-calculate-gas-limit-for-transaction-with-data-in-ethereum

        return msgs.map((msg) => {
            const msgData = msg.toData().data;
            let feeForData =
                msgData && msgData !== '0x'
                    ? 68 * new TextEncoder().encode(msgData.toString()).length
                    : 0;
            const gasLimit = transactionFee + feeForData;
            const feeData = isEIP1559
                ? {
                    gasLimit,
                    gasPrice: fee[speed]?.baseFeePerGas,
                    maxFeePerGas: fee[speed]?.maxFeePerGas,
                    maxPriorityFeePerGas: fee[speed]?.priorityFeePerGas,
                }
                : {
                    gasLimit,
                    gasPrice: fee[speed],
                    maxFeePerGas: null,
                    maxPriorityFeePerGas: null,
                };

            return new ChainMsg({
                ...msg.toData(),
                ...feeData,
            });
        });
    }

    async gasFeeOptions(): Promise<GasFee> {
        const { data } = await getFees(this.manifest.chain);
        return data[this.manifest.chain].fee;
    }

    async getNonce(address: string): Promise<number> {
        return this.rpcProvider.getTransactionCount(address);
    }
}
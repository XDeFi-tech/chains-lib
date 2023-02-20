import { Manifest } from 'core/chain';
import { Coin, GasFeeSpeed, Msg, Transaction, GasFee, Asset } from 'core';
import { providers } from 'ethers';

export abstract class BaseRepository { // Share base chain & call methods without any code
    public rpcProvider: providers.StaticJsonRpcProvider;
    public manifest: Manifest;

    constructor(manifest: Manifest) { // pass config here, get it in the provider
        this.manifest = manifest;
        this.rpcProvider = new providers.StaticJsonRpcProvider(manifest.rpcURL);
    }
    abstract getBalance(address: string): Promise<Coin[]>;
    abstract getTransactions(address: string, afterBlock?: number | string): Promise<Transaction[]>;
    abstract estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<Msg[]>;
    abstract gasFeeOptions(): Promise<GasFee>;
    abstract getNative(): Promise<Asset>;

    getManifest(): Manifest {
        return this.manifest;
    }

    async calculateNonce(address: string): Promise<number> {
        return 0;
    }
}

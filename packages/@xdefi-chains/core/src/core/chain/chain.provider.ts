import { Injectable } from 'common';
import { Coin } from 'core/coin';
import { Msg } from 'core/msg';
import { Provider as SignerProvider, SignerType } from 'core/signer';
import { Transaction } from 'core/transaction';
import 'reflect-metadata';
import { Manifest } from 'core/chain/interfaces';
import { METADATA_KEY, SIGNER_SCOPE_NAME } from 'core/constants';
import { GasFee } from 'core/fee';
import { Asset } from 'core/asset';
import { BaseRepository } from 'core';

/**
 * Represents abstract class for chain Provider, which provides
 * primitives for interacting with particular chain.
 *
 * Example:
 *
 * ```ts
 * @ChainDecorator("EVMProvider", {
 *   deps: [LedgerSigner],
 *   type: 'EVM'
 * })
 * class EthereumProvider extens Chain.Provider {
 *    ...implement abstract methods
 * }
 * ```
 */
@Injectable()
export abstract class Provider {
    constructor(public readonly chainRepository: BaseRepository) {
        this.chainRepository = chainRepository;
    }

    get providerType(): string {
        const options = Reflect.getMetadata(METADATA_KEY.CHAIN_OPTIONS, this.constructor);
        return options?.providerType;
    }

    get providerName(): string {
        return this.constructor.name;
    }

    abstract getBalance(address: string): Promise<Coin[]>;

    abstract getTransactions(address: string, afterBlock?: number): Promise<Transaction[]>;

    abstract estimateFee(msgs: Msg[], speed: GasFee): Promise<Msg[]>;

    abstract broadcast(msgs: Msg[]): Promise<Transaction[]>;

    abstract createMsg(data: Msg.Data): Msg;

    abstract gasFeeOptions(): Promise<GasFee>;

    abstract getNative(): Promise<Asset>;

    abstract calculateNonce(address: string): Promise<number>;

    public async signAndBroadcast(derivation: string, signer: SignerProvider, msgs: Msg[]) {
        for await (let msg of msgs) {
            const signature = await signer.sign(derivation, msg.toData());
            msg.sign(signature);
        }

        return this.broadcast(msgs);
    }

    public getSigners() {
        const options = Reflect.getMetadata(METADATA_KEY.CHAIN_OPTIONS, this.constructor);
        const deps = options?.deps;

        return deps.filter((dep: any) => {
            const scope = Reflect.getMetadata(METADATA_KEY.SCOPE, dep);
            return scope === SIGNER_SCOPE_NAME;
        });
    }

    public getSigner(type: SignerType) {
        const signers = this.getSigners();

        const signer = signers.find((signer: any) => {
            const _type = Reflect.getMetadata(METADATA_KEY.SIGNER_TYPE, signer);
            return _type === type;
        });

        return new signer();
    }

    public hasSigner(type: SignerType) {
        const signer = this.getSigner(type);
        return signer !== undefined;
    }

    public get manifest(): Manifest {
        return this.chainRepository.getManifest();
    }
}

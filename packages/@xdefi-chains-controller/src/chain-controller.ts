import { Chain } from '@xdefi/chains-core';

export interface IProviders {
    [providerKey: string]: Chain.Provider;
}

// todo make async for all devices support
export abstract class ChainStorage {
    abstract getFromStorage(): string | null;
    abstract setToStorage(data: string): void;
    abstract restoreStorage(): void;
}

class LocalRepositoryStorage extends ChainStorage {
    private readonly localStorageKey = 'chain-repository-data';

    static isLSAvailable(): boolean {
        return typeof window !== 'undefined';
    }

    getFromStorage() {
        if (!LocalRepositoryStorage.isLSAvailable()) {
            return null;
        }
        return window.localStorage.getItem(this.localStorageKey);
    }

    setToStorage(data: string) {
        if (!LocalRepositoryStorage.isLSAvailable()) {
            return;
        }
        window.localStorage.setItem(this.localStorageKey, data);
    }

    restoreStorage() {
        if (!LocalRepositoryStorage.isLSAvailable()) {
            return;
        }
        window.localStorage.removeItem(this.localStorageKey);
    }
}

interface ChainControllerOptions {
    storage?: ChainStorage;
}

interface ChainParamItem {
    providerClassName: string;
    repositoryClassName: string;
    manifest: Chain.Manifest;
}

interface ChainParams {
    [chainKey: string]: ChainParamItem;
}

export class ChainController {
    private readonly chainStorage: ChainStorage;
    private readonly providers: IProviders;

    constructor(options?: ChainControllerOptions) {
        this.chainStorage = options?.storage || new LocalRepositoryStorage();
        this.providers = {};
    }

    public getProviderByChain(chain: string): Chain.Provider {
        if (!this.providers[chain]) {
            throw new Error('Invalid provider key');
        }

        return this.providers[chain];
    }

    public getProviderByType(type: string): Chain.Provider[] {
        return Object.values(this.providers).reduce((acc: Chain.Provider[], provider) => {
            if (provider.providerType === type) {
                acc.push(provider);
            }

            return acc;
        }, []);
    }

    public getProviderList(): Chain.Provider[] {
        return Object.values(this.providers);
    }

    public setProvider(provider: Chain.Provider) {
        this.setProviderList([provider]);
    }

    public setProviderList(providers: Chain.Provider[]) {
        providers.forEach((provider) => this.providers[provider.manifest.chain] = provider);
        this.chainStorage.setToStorage(this.serializeParams());
    }

    public clearProvidersStorage() {
        Object.keys(this.providers).forEach((chain) => {
            delete this.providers[chain];
        })
        this.chainStorage.restoreStorage();
    }

    public getProvidersStorage() {
        return this.chainStorage.getFromStorage();
    }

    public serializeParams(): string {
        const providers: ChainParams = Object.values(this.providers).reduce((acc: ChainParams, provider) => {
            const manifest = provider.manifest;
            acc[manifest.chain]  = {
                providerClassName: provider.providerName,
                repositoryClassName: provider.repositoryName,
                manifest
            };
            return acc;
        }, {});
        return JSON.stringify(providers);
    }

    static deserializeParams(params: string): ChainParamItem[] {
        if (!ChainController.isJsonString(params)) {
            throw new Error(`Invalid params ${params}`);
        }

        return JSON.parse(params);
    }

    static isJsonString(str: string) {
        try {
            const json = JSON.parse(str);
            if (json && json instanceof Object) {
                return true
            }
        } catch (err) {}

        return false;
    }
}

export default ChainController;

import { Chain } from '@xdefi/chains-core';

export interface IProviders {
    [providerKey: string]: Chain.Provider;
}

class ChainController {
    private readonly providers: IProviders;

    constructor(initialParams?: Chain.Provider[]) {
        this.providers = {};
        this._initProviders(initialParams);
    }

    protected _initProviders(providers: Chain.Provider[]) {
        providers.forEach((provider) => this.setProvider(provider));
    }

    public getProviderByChain(chain: string): Chain.Provider {
        if (!this.providers[chain]) {
            throw new Error('Invalid provider key');
        }

        return this.providers[chain];
    }

    public getProviderByType(type: string): Chain.Provider[] {
        return Object.values(this.providers).reduce((acc, provider) => {
            if (provider.providerType === type) {
                acc.push(provider);
            }

            return acc;
        }, []);
    }

    public getProviderList(): Chain.Provider[] {
        return Object.values(this.providers);
    }

    public setProvider(provider: any) {
        if (!(provider instanceof Chain.Provider)) {
            throw new Error('The provider must be based on BaseProvider');
        }
        this.providers[provider.manifest.chain] = provider;
    }

    public serializeParams() {
        const providers: IProviders = Object.values(this.providers).reduce((acc, provider) => {
            const manifest = provider.manifest;
            acc[manifest.chain] = {
                providerClassName: provider.providerName,
                repositoryClassName: provider.repositoryName,
                manifest
            };
            return acc;
        }, {});
        return JSON.stringify(providers);
    }

    static deserializeParams(params: string) {
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

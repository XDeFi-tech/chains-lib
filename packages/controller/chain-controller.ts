import { Chain } from '@xdefi/chains-core';
import { EvmProvider } from '../@xdefi-chains/ethereum/src';

export interface IProvider {
    [providerKey: string]: any
}

// todo add type to providers, serialise data with manifest and type?

class ChainController {
    private readonly providers: IProvider;

    constructor(initialParams: string) {
        this.providers = {};
        this._initProviders(initialParams);
    }

    protected _initProviders(initialParams) {
        const params = this.deserializeParams(initialParams);
        Object.keys(params).forEach((key) => {

            this.setProvider(params[key]); // todo figure out how to get specific provider class
        });
    }

    public getProviderByChain(chain: string) {
        if (!this.providers[chain]) {
            throw new Error('Invalid provider key');
        }

        return this.providers[chain].provider;
    }

    public getProviderByType(type: string) {
        return Object.values(this.providers).reduce((acc, p) => {
            if (p.type === type) {
                acc.push(p.provider);
            }

            return acc;
        }, []);
    }

    public getProviderList() {
        return Object.values(this.providers).map((p) => p.provider);
    }

    public setProvider(provider: any) {
        if (!(provider instanceof Chain.Provider)) {
            throw new Error('The provider must be based on BaseProvider');
        }
        const manifest = provider.getManifest();
        this.providers[manifest.chain] = {
            type: provider.getType(),
            provider
        };
    }

    public deserializeParams(params: string) {
        if (!ChainController.isJsonString(params)) {
            throw new Error(`Invalid params ${params}`);
        }

        return JSON.parse(params);
    }

    public serializeParams() {
        const params = Object.values(this.providers).reduce((acc, p) => {
            const manifest = p.provider.getManifest();
            const type = p.type;
            acc[manifest.chain] = {
                type,
                manifest
            };
        }, {});
        return JSON.stringify(params);
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

// Open for extension, closed for modification - ?
// const chainController = new ChainController();
// chainController.addChainProvider({ 'evm': EvmProvider });


export default ChainController;

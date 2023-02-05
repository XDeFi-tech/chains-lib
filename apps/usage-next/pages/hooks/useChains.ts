import React from 'react';
import { ChainController } from '@xdefi/chains-controller';
import { evmManifests, EvmProvider, XdefiRepository } from '@xdefi/chains-evm';


const availableProviders = {
    EvmProvider,
}

const availableRepositories = {
    XdefiRepository,
}

export const useChains = () => {
    const chains = React.useMemo(() => {
        const controller = new ChainController();
        const initData = controller.getProvidersStorage();
        if (initData && ChainController.isJsonString(initData)) {
            const params = ChainController.deserializeParams(initData);
            const initProviders = Object.values(params).map((param) => {
                const Provider = availableProviders[param.providerClassName]; // || Custom provider
                const Repository = availableRepositories[param.repositoryClassName]; // || Custom repository
                return new Provider(new Repository(param.manifest));
            });
            controller.setProviderList(initProviders);
        } else {
            // Init from scratch
            const providers = Object.values(evmManifests).map((manifest) => new EvmProvider(new XdefiRepository(manifest)));
            controller.setProviderList(providers);
        }

        return controller;
    }, []);

    return {
        chains: chains
    }
}

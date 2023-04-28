import { Chain } from '@xdefi/chains-core';

import { ProviderFactory } from './provider-factory';

export interface IProviders {
  [providerKey: string]: Chain.Provider;
}

export interface ChainParamItem {
  providerClassName: string;
  dataSourceClassName: string;
  providerId: string;
  manifest: Chain.Manifest;
}

interface ChainParams {
  [chainKey: string]: ChainParamItem;
}

/**
 * ChainController manages a collection of `Chain.Provider` instances.
 */
export class ChainController {
  private readonly providers: IProviders;

  constructor() {
    this.providers = {};
  }

  /**
   * Adds a new `Chain.Provider` instance to the collection.
   *
   * @param provider - The `Chain.Provider` instance to add.
   */
  public addProvider(provider: Chain.Provider): void {
    this.providers[provider.id] = provider;
  }

  /**
   * Deletes a `Chain.Provider` instance from the collection by its id.
   *
   * @param id - Unique identifier of the chain associated with the `Chain.Provider` instance.
   */
  public deleteProvider(id: string): void {
    delete this.providers[id];
  }

  /**
   * Clear all providers from the list.
   */
  public clear(): void {
    Object.keys(this.providers).forEach(
      (providerId) => delete this.providers[providerId]
    );
  }

  public getProviderById(id: string): Chain.Provider {
    if (!this.providers[id]) {
      throw new Error('Invalid identifier');
    }

    return this.providers[id];
  }

  /**
   * Returns an array of `Chain.Provider` instances from the collection with the specified identifier.
   *
   * @param chain - Unique identifier of the chain associated with the `Chain.Provider` instance.
   * @returns An array of `Chain.Provider` instances with the specified identifier.
   */
  public getProviderByChain(chain: string): Chain.Provider[] {
    return Object.values(this.providers).reduce(
      (acc: Chain.Provider[], provider) => {
        if (provider.manifest.chain === chain) {
          acc.push(provider);
        }

        return acc;
      },
      []
    );
  }

  /**
   * Returns an array of `Chain.Provider` instances from the collection with the specified provider type.
   *
   * @param type - The type of the `Chain.Provider` instances to retrieve.
   * @returns An array of `Chain.Provider` instances with the specified provider type.
   */
  public getProviderByType(type: string): Chain.Provider[] {
    return Object.values(this.providers).reduce(
      (acc: Chain.Provider[], provider) => {
        if (provider.providerType === type) {
          acc.push(provider);
        }

        return acc;
      },
      []
    );
  }

  /**
   * Returns an array of all `Chain.Provider` instances in the collection.
   *
   * @returns An array of all `Chain.Provider` instances in the collection.
   */
  public getProviderList(): Chain.Provider[] {
    return Object.values(this.providers);
  }

  /**
   * Serializes the collection of `Chain.Provider` instances to a JSON string.
   * @returns A JSON string representation of the collection of `Chain.Provider` instances.
   */
  public serialize(): string {
    const providers: ChainParams = Object.values(this.providers).reduce(
      (acc: ChainParams, provider) => {
        const manifest = provider.manifest;
        acc[provider.id] = {
          providerClassName: provider.name,
          dataSourceClassName: provider.dataSource.name,
          providerId: provider.id,
          manifest,
        };
        return acc;
      },
      {}
    );
    return JSON.stringify(providers);
  }

  /**
   * Deserializes a JSON string to an array of `ChainParamItem` objects.
   *
   * @param params - A JSON string representing an array of `ChainParamItem` objects.
   * @returns An array of `ChainParamItem` objects.
   * @throws An error if the input string is not a valid JSON string.
   */
  static deserialize(params: string): ChainParamItem[] {
    if (!ChainController.isJsonString(params)) {
      throw new Error(`Invalid params ${params}`);
    }

    return JSON.parse(params);
  }

  /**
   * Checks if the given string is a valid JSON string.
   *
   * @param {string} str - The string to check.
   * @returns {boolean} - True if the string is valid JSON, false otherwise.
   */
  static isJsonString(str: string) {
    try {
      const json = JSON.parse(str);
      if (json && json instanceof Object) {
        return true;
      }
    } catch (err) {}

    return false;
  }

  static get providerList() {
    return new ProviderFactory();
  }
}

export default ChainController;

import { v4 as uuidv4 } from 'uuid';
import { Injectable } from 'common';
import { Coin } from 'core/coin';
import { Msg, MsgData } from 'core/msg';
import { Provider as SignerProvider, SignerType } from 'core/signer';
import { Transaction, TransactionData } from 'core/transaction';
import { ChainFeatures, Manifest } from 'core/chain/interfaces';
import { METADATA_KEY, SIGNER_SCOPE_NAME } from 'core/constants';
import { FeeOptions, GasFeeSpeed } from 'core/fee';
import { Balance, DataSource, MsgEncoding, Response, FeeData, TronFee } from 'core';
import { forEach } from 'lodash';

export interface IOptions {
  signers?: typeof SignerProvider[];
  providerId?: string;
}

export interface ISignerProvider {
  new (key?: string): SignerProvider;
}

export interface DataSourceList<T extends DataSource> {
  [key: string]: T;
}

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
export abstract class Provider<ChainMsg extends Msg = Msg> {
  public readonly rpcProvider: any;
  public readonly id: string;

  constructor(public readonly dataSource: DataSource, public readonly options?: IOptions) {
    this.id = options?.providerId || uuidv4();
    this.dataSource = dataSource;
    this.setSigner = this.setSigner.bind(this);
    forEach(options?.signers, (signer: typeof SignerProvider) => this.setSigner(signer));
  }

  /**
   * Returns the provider type for this chain. The provider type indicates what type of provider
   * should be used to interact with the chain.
   */
  get providerType(): string {
    const options = Reflect.getMetadata(METADATA_KEY.CHAIN_OPTIONS, this.constructor);
    return options?.providerType;
  }

  /**
   * Returns the name of the class for the current instance
   *
   * @returns The name of the class as a string
   */
  get name(): string {
    return this.constructor.name;
  }

  /**
   * Retrieves the balance of the specified address across all assets on the chain.
   *
   * @async
   * @param {string} address - The address for which to retrieve the balance.
   * @returns {Promise<Coin[]>} - A promise that resolves with an array of Coin objects representing the balances of the specified address.
   */
  abstract getBalance(address: string): Promise<Response<Coin[], Balance[]>>;

  /**
   * Retrieves the balance of the specified address across all assets on the chain.
   *
   * @async
   * @param {string} address - The address for which to retrieve the balance.
   * @param {string[]} tokenAddresses - The array of token address
   * @returns {Promise<Coin[]>} - A promise that resolves with an array of Coin objects representing the balances of the specified address.
   */
  abstract getBalance(address: string, tokenAddresses?: string[]): Promise<Response<Coin[], Balance[]>>;

  /**
   * Retrieves a list of transactions for a given address and optional block range.
   *
   * @async
   * @param {string} address - The address for which to retrieve transactions.
   * @param {number|string} [afterBlock] - An optional parameter specifying the starting block number or block hash to retrieve transactions from. If not provided, all transactions for the address will be returned.
   * @returns {Promise<Transaction[]>} - A promise that resolves with an array of Transaction objects that correspond to the retrieved transactions.
   */
  abstract getTransactions(
    address: string,
    afterBlock?: number | string
  ): Promise<Response<Transaction[], Transaction>>;

  /**
   * Estimates the transaction fees required for the specified messages to be successfully included in a block at the specified speed.
   *
   * @async
   * @param {Msg[]} msgs - An array of Msg objects representing the messages for which to estimate the transaction fees.
   * @param {GasFeeSpeed} speed - An enumerated value indicating the speed at which the transaction should be processed. Possible values are "high", "medium", and "low".
   * @returns {Promise<Msg[]>} - A promise that resolves with an array of Msg objects representing the messages with the calculated transaction fees included.
   */
  abstract estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<FeeData[] | TronFee[]>;

  /**
   * Sends a list of signed messages to the RPC provider and returns a list of corresponding transactions.
   *
   * @async
   * @param {Msg[]} msgs - An array of signed messages to broadcast.
   * @returns {Promise<Transaction[]>} - A promise that resolves with an array of Transaction objects that correspond to the broadcasted messages.
   * @throws {Error} - Throws an error if any of the messages in the input array do not have a signature.
   */
  abstract broadcast(msgs: ChainMsg[]): Promise<Transaction[]>;

  /**
   * Creates a new instance of a message.
   *
   * @param data The data object that represents the message.
   * @param encoding Type for parsing and building transacrion
   * @returns A new instance of a message.
   */
  abstract createMsg(data: MsgData, encoding: MsgEncoding): ChainMsg;

  /**
   * Retrieves the current gas fee options for the chain, including base and priority fees per gas for EIP-1559 chains.
   * @async
   * @returns {Promise<FeeOptions>} A promise that resolves to a `FeeOptions` object with high, medium, and low gas fee options.
   */
  abstract gasFeeOptions(): Promise<FeeOptions | null>;

  /**
   * Retrieves the nonce of the specified address across blockchain.
   *
   * @async
   * @param {string} address - The address for which to retrieve nonce.
   */
  abstract getNonce(address: string): Promise<number>;

  /**
   * Retrieves transaction details by transaction hash.
   *
   * @param {string} txHash - The hash of the transaction.
   * @returns {Promise<TransactionData | null>} - A promise that resolves to the transaction details or null if the transaction is not found.
   */
  abstract getTransaction(txHash: string): Promise<TransactionData | null>;

  /**
   * Sign and broadcast the given messages using the specified signer.
   *
   * @param derivation The derivation path to use for signing the messages.
   * @param signer The signer to use for signing the messages.
   * @param msgs The messages to sign and broadcast.
   *
   * @returns A promise that resolves to the transaction hash of the broadcasted transaction.
   */
  public async signAndBroadcast(derivation: string, signer: SignerProvider, msgs: ChainMsg[]) {
    for await (const msg of msgs) {
      const signature = await signer.sign(msg, derivation);
      msg.sign(signature);
    }

    return this.broadcast(msgs);
  }

  /**
   * Returns an array of SignerProvider required to sign messages in this chain.
   *
   * @returns {SignerProvider[]} array of `SignerProvider` instances
   */
  public getSigners(): ISignerProvider[] {
    const options = Reflect.getMetadata(METADATA_KEY.CHAIN_OPTIONS, this.constructor);
    const deps = options?.deps;

    return deps.filter((dep: any) => {
      const scope = Reflect.getMetadata(METADATA_KEY.SCOPE, dep);
      return scope === SIGNER_SCOPE_NAME;
    });
  }

  /**
   * Returns an array of SignerProvider required to sign messages in this chain.
   *
   * @returns {SignerProvider} `SignerProvider` instance
   */
  public getSigner(type: any): ISignerProvider {
    const signers = this.getSigners();

    return signers.find((Signer) => {
      const _type = Reflect.getMetadata(METADATA_KEY.SIGNER_TYPE, new Signer());
      return _type === type;
    }) as ISignerProvider;
  }

  /**
   * Check if there is a signer instance of a given type in the dependencies list
   *
   * @param type - Type of the signer to check for
   * @returns `true` if a signer instance of the given type exists, `false` otherwise
   */
  public hasSigner(type: SignerType): boolean {
    const signer = this.getSigner(type);
    return signer !== undefined;
  }

  protected setSigner(signer: typeof SignerProvider): void {
    const signerType = Reflect.getMetadata(METADATA_KEY.SIGNER_TYPE, signer);
    if (!signerType) {
      console.warn(`Your custom signer ${signer.name} should be used with @SignerDecorator(Signer.SignerType.CUSTOM)`);
      return;
    }

    if (this.hasSigner(signerType)) {
      return;
    }

    const options = Reflect.getMetadata(METADATA_KEY.CHAIN_OPTIONS, this.constructor) || {};
    if (!options?.deps) {
      options.deps = [];
    }
    options.deps.push(signer);
    Reflect.defineMetadata(METADATA_KEY.CHAIN_OPTIONS, options, this);
  }

  public hasFeature(feature: ChainFeatures | ChainFeatures[]): boolean {
    const features = typeof feature === 'string' ? [feature] : feature;
    const options = Reflect.getMetadata(METADATA_KEY.CHAIN_OPTIONS, this.constructor);
    const providerFeatures = options?.features;
    return providerFeatures && features.every((feature) => providerFeatures.includes(feature));
  }

  abstract getNFTBalance(address: string): Promise<any>;

  /**
   * Returns the manifest object for the chain
   *
   * @returns The manifest object for the chain
   */
  public get manifest(): Manifest {
    return this.dataSource.manifest;
  }

  static get dataSourceList(): Record<string, typeof DataSource> {
    return {};
  }

  /**
   * Verifies if the given address is valid.
   *
   * @param {string} _address - The address to verify.
   * @param {any} _rest - rest props for custom signer
   * @returns {boolean} True if the address is valid, false otherwise.
   */
  static verifyAddress(_address: string, ..._rest: any): boolean {
    throw new Error('Method not implemented.');
  }
}

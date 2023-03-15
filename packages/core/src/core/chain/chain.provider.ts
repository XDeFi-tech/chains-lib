import { Injectable } from 'common';
import { Coin } from 'core/coin';
import { Msg, MsgData } from 'core/msg';
import { Provider as SignerProvider, SignerType } from 'core/signer';
import { Transaction } from 'core/transaction';
import 'reflect-metadata';
import { Manifest } from 'core/chain/interfaces';
import { METADATA_KEY, SIGNER_SCOPE_NAME } from 'core/constants';
import { GasFee, GasFeeSpeed } from 'core/fee';
import { Balance, DataSource, Response } from 'core';
import { forEach } from 'lodash';
import { FeeData } from 'core/interfaces';

export interface IOptions {
  signers?: typeof SignerProvider[];
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
export abstract class Provider {
  public readonly rpcProvider: any;
  constructor(
    public readonly dataSource: DataSource,
    public readonly options?: IOptions,
  ) {
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
  abstract estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<FeeData[]>;

  /**
   * Sends a list of signed messages to the RPC provider and returns a list of corresponding transactions.
   *
   * @async
   * @param {Msg[]} msgs - An array of signed messages to broadcast.
   * @returns {Promise<Transaction[]>} - A promise that resolves with an array of Transaction objects that correspond to the broadcasted messages.
   * @throws {Error} - Throws an error if any of the messages in the input array do not have a signature.
   */
  abstract broadcast(msgs: Msg[]): Promise<Transaction[]>;

  /**
   * Creates a new instance of a message.
   *
   * @param data The data object that represents the message.
   * @returns A new instance of a message.
   */
  abstract createMsg(data: MsgData): Msg;

  /**
   * Retrieves the current gas fee options for the chain, including base and priority fees per gas for EIP-1559 chains.
   * @async
   * @returns {Promise<GasFee>} A promise that resolves to a `GasFee` object with high, medium, and low gas fee options.
   */
  abstract gasFeeOptions(): Promise<GasFee>;

  /**
   * Retrieves the nonce of the specified address across blockchain.
   *
   * @async
   * @param {string} address - The address for which to retrieve nonce.
   */
  abstract getNonce(address: string): Promise<number>;

  /**
   * Sign and broadcast the given messages using the specified signer.
   *
   * @param derivation The derivation path to use for signing the messages.
   * @param signer The signer to use for signing the messages.
   * @param msgs The messages to sign and broadcast.
   *
   * @returns A promise that resolves to the transaction hash of the broadcasted transaction.
   */
  public async signAndBroadcast(derivation: string, signer: SignerProvider, msgs: Msg[]) {
    for await (const msg of msgs) {
      const signature = await signer.sign(derivation, msg.toData());
      msg.sign(signature);
    }

    return this.broadcast(msgs);
  }

  /**
   * Returns an array of SignerProvider required to sign messages in this chain.
   *
   * @returns {SignerProvider[]} array of `SignerProvider` instances
   */
  public getSigners(): SignerProvider[] {
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
  public getSigner(type: any): SignerProvider {
    const signers = this.getSigners();

    return signers.find((signer) => {
      const _type = Reflect.getMetadata(METADATA_KEY.SIGNER_TYPE, signer);
      return _type === type;
    }) as SignerProvider;
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

  /**
   * Returns the manifest object for the chain
   *
   * @returns The manifest object for the chain
   */
  public get manifest(): Manifest {
    return this.dataSource.manifest;
  }
}

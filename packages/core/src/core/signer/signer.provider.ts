import { Injectable } from '../../common';
import { Msg } from '../msg';

@Injectable()
export abstract class Provider {
  constructor(protected readonly _key?: string) {}

  /**
   * Retrieves the public address corresponding to a given derivation path.
   *
   * @async
   * @param {string} derivation - The derivation path to retrieve the address for.
   * @param {any} rest - rest props for custom signer
   * @returns {Promise<string>} The public address corresponding to the derivation path.
   */
  abstract getAddress(derivation: string, ...rest: any): Promise<string>;

  /**
   * Signs a message using the specified derivation.
   *
   * @async
   * @param {Msg} msg The message to sign.
   * @param {string} derivation The derivation path to sign the message.
   * @param {any} rest - rest props for custom signer
   * @returns {Promise<any>} A promise that resolves to the signature.
   */
  abstract sign(msg: Msg, derivation: string, ...rest: any): Promise<void>;
  abstract sign(msg: Msg, ...rest: any): Promise<void>;

  async getPrivateKey(_derivation: string, ..._rest: any): Promise<string | unknown> {
    throw new Error('Method not implemented.');
  }

  get key(): string {
    if (!this._key) {
      throw new Error('key is required');
    }

    return this._key.normalize('NFKD');
  }
}

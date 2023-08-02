import { Injectable } from '../../common';
import { MsgData } from '../msg';

@Injectable()
export abstract class Provider {
  protected key?: string;

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
   * @param {string} derivation The derivation path to sign the message.
   * @param {Msg} msg The message to sign.
   * @param {any} rest - rest props for custom signer
   * @returns {Promise<any>} A promise that resolves to the signature.
   */
  abstract sign(derivation: string, msg: MsgData, ...rest: any): Promise<void>;

  /**
   * Verifies if the given address is valid.
   *
   * @param {string} address - The address to verify.
   * @param {any} rest - rest props for custom signer
   * @returns {boolean} True if the address is valid, false otherwise.
   */
  abstract verifyAddress(address: string, ...rest: any): boolean;

  withPhrase(value: string) {
    this.key = value;
    return this;
  }
}

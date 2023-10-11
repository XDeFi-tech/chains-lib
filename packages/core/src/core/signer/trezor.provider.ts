import TrezorConnect, { ConnectSettings } from '@trezor/connect-web';

import { MsgData } from '../msg';

import { Provider } from './signer.provider';

export class TrezorProvider extends Provider {
  private static instance: TrezorProvider;
  public initialized = false;

  constructor() {
    super();
  }

  /**
   * Returns the singleton instance of TrezorProvider
   */
  static getInstance(): TrezorProvider {
    if (!TrezorProvider.instance) {
      TrezorProvider.instance = new TrezorProvider();
    }
    return TrezorProvider.instance;
  }

  /**
   * Retrieves the public address corresponding to a given derivation path.
   *
   * @async
   * @param {string} _derivation - The derivation path to retrieve the address for.
   * @param {any} _rest - rest props for custom signer
   * @returns {Promise<string>} The public address corresponding to the derivation path.
   */
  async getAddress(_derivation: string, ..._rest: any): Promise<string> {
    throw new Error('Method must be implented in an inhereted class');
  }

  /**
   * Signs a message using the specified derivation.
   *
   * @async
   * @param {Msg} _msg The message to sign.
   * @param {string} derivation The derivation path to sign the message.
   * @param {any} _rest - rest props for custom signer
   * @returns {Promise<any>} A promise that resolves to the signature.
   */
  async sign(_msg: MsgData, ..._rest: any): Promise<void> {
    throw new Error('Method must be implented in an inhereted class');
  }

  async getPrivateKey(_derivation: string, ..._rest: any): Promise<string | unknown> {
    throw new Error('Private keys cannot be retrieved from a Trezor device');
  }

  /**
   * Verifies if the given address is valid.
   *
   * @param {string} _address - The address to verify.
   * @param {any} _rest - rest props for custom signer
   * @returns {boolean} True if the address is valid, false otherwise.
   */
  verifyAddress(_address: string, ..._rest: any): boolean {
    throw new Error('Method must be implented in an inhereted class');
  }

  /**
   * Initializes Trezor Connection
   *
   * @param {string} email - The email of the client app.
   * @param {string} url - The URL of the client app
   * @param {ConnectSettings} url - Other optional configuration parameters for the Trezor Connection
   * @returns {void}
   */
  async initTrezor(email: string, appUrl: string, options?: ConnectSettings): Promise<void> {
    if (!TrezorProvider.getInstance().initialized) {
      await TrezorConnect.init({
        manifest: {
          email,
          appUrl,
        },
        ...options,
      });
    }
    TrezorProvider.getInstance().initialized = true;
  }

  async setManifest(email: string, appUrl: string): Promise<void> {
    if (!TrezorProvider.getInstance().initialized) {
      await TrezorConnect.manifest({ email, appUrl });
      TrezorProvider.getInstance().initialized = true;
    }
  }
}

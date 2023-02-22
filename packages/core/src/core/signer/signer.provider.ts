import { Injectable } from '../../common';
import { Msg } from '../msg';

@Injectable()
export abstract class Provider<S = any> {
    protected key?: string;

    /**
     * Retrieves the public address corresponding to a given derivation path.
     *
     * @async
     * @param {string} derivation - The derivation path to retrieve the address for.
     * @returns {Promise<string>} The public address corresponding to the derivation path.
     */
    abstract getAddress(derivation: string): Promise<string>;

    /**
     * Signs a message using the specified derivation and returns the signature.
     *
     * @async
     * @param {string} derivation The derivation path to sign the message.
     * @param {Msg} msg The message to sign.
     * @returns {Promise<any>} A promise that resolves to the signature.
     */
    abstract sign(derivation: string, msg: Msg.Data): Promise<S>;

    /**
     * Verifies if the given address is valid.
     *
     * @param {string} address - The address to verify.
     * @returns {boolean} True if the address is valid, false otherwise.
     */
    abstract verifyAddress(address: string): boolean;

    withPhrase(value: string) {
        this.key = value;
        return this;
    }
}

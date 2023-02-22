import { Injectable } from '../../common';
import { Msg } from '../msg';

@Injectable()
export abstract class Provider<S = any> {
    protected key?: string;

    abstract getAddress(derivation: string): Promise<string>;

    abstract sign(derivation: string, msgs: Msg.Data): Promise<S>;

    abstract verifyAddress(address: string): boolean;

    withPhrase(value: string) {
        this.key = value;
        return this;
    }
}

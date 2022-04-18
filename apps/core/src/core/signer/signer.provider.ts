import { Injectable } from '../../common';
import { Msg } from '../msg';

@Injectable()
export abstract class Provider {
  protected key?: string;

  abstract getAddress(derivation: string): Promise<string>;
  abstract sign(msgs: Msg.Data): Promise<string>;
  abstract verifyAddress(address: string): boolean;

  withPhrase(value: string) {
    this.key = value;
    return this;
  }
}

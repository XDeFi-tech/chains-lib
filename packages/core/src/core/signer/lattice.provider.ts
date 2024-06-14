import { setup } from 'gridplus-sdk';

import { Injectable } from '../../common';
import type { MsgData } from '../msg';

import { Provider } from './signer.provider';

const HARDENED_OFFSET = 0x80000000; // Hardened offset

@Injectable()
export class LatticeProvider extends Provider {
  private static instance: LatticeProvider;
  public initialized = false;
  private client!: string;
  public isPaired: boolean;

  constructor(client: string, isPaired: boolean) {
    super();
    this.client = client;
    this.isPaired = isPaired;
    this.initialized = true;
  }

  static async create({
    deviceId,
    password,
    name,
  }: {
    deviceId: string;
    password: string;
    name: string;
  }): Promise<LatticeProvider> {
    let clientData = '';

    const getStoredClient = () => clientData;
    const setStoredClient = (newClientData: string | null) => {
      clientData = newClientData ?? '';
    };

    const isPaired = await setup({
      deviceId,
      password,
      name,
      getStoredClient,
      setStoredClient,
    });

    return new LatticeProvider(clientData, isPaired);
  }

  static convertDerivationPathToArray(path: string): number[] {
    // Validate input path
    if (!path.startsWith('m')) {
      throw new Error('Invalid derivation path. Must start with "m".');
    }

    // Split the path into components, skipping the first element ('m')
    const components = path.split('/').slice(1);

    // Convert each component to the corresponding number
    const result = components.map((component) => {
      // Check if the component is hardened (ends with a single quote)
      const isHardened = component.endsWith("'");

      // Parse the number, removing the single quote if it is hardened
      const number = Number.parseInt(isHardened ? component.slice(0, -1) : component);

      // Add the hardened offset if necessary
      return isHardened ? HARDENED_OFFSET + number : number;
    });

    return result;
  }

  async getAddress(derivation: string): Promise<string> {
    throw new Error('Should be implemented on specific signer level.');
  }

  async sign(msg: MsgData, derivation: string) {
    throw new Error('Should be implemented on specific signer level.');
  }

  verifyAddress(address: string): boolean {
    throw new Error('Should be implemented on specific signer level.');
  }
}

export const LatticeConst = {
  HARDENED_OFFSET,
};

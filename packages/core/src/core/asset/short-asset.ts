import { ChainID } from 'core/chain';

export class ShortAsset {
  constructor(protected data: ShortAsset.Data) {}

  get chainId() {
    return this.data.chainId;
  }

  get address() {
    return this.data.address;
  }

  /**
   * Create a new Asset using provided data object
   *
   * @param data object represents Asset
   */
  public static fromData(data: ShortAsset.Data): ShortAsset {
    return new ShortAsset(data);
  }

  /**
   * Convert JSON string to Asset object
   *
   * @param json stirng that represents asset object
   */
  public static fromJson(json: string): ShortAsset {
    const data = JSON.parse(json);
    return ShortAsset.fromData(data);
  }

  /**
   * Verify if current and provided assets are equal
   *
   * @param other asset to compare with
   */
  public isEqual(other: ShortAsset) {
    if (this.chainId === other.chainId) {
      if (this.address !== undefined && other.address !== undefined && this.address === other.address) {
        return true;
      }
    }

    return false;
  }

  /**
   * Return `chainId:address` when converting asset to string
   *
   * @returns string
   */
  public toString() {
    return `${this.chainId}:${this.address}`;
  }
}

export namespace ShortAsset {
  export interface Data {
    chainId: ChainID;
    address?: string;
    native: boolean;
  }
}

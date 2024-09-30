import { ChainID } from 'core/chain';

export interface ShortAssetData {
  chainId: ChainID;
  address?: string;
  native: boolean;
}

export class ShortAsset {
  constructor(protected data: ShortAssetData) {}

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
  public static fromData(data: ShortAssetData): ShortAsset {
    return new ShortAsset(data);
  }

  /**
   * Convert JSON string to Asset object
   *
   * @param json string that represents asset object
   */
  public static fromJson(json: string): ShortAsset {
    const data = JSON.parse(json);
    return this.fromData(data);
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

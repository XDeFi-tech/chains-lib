import { ChainID } from 'core/chain/interfaces/chain.interface';

export interface AssetData {
  id?: string;
  chainId: ChainID;
  name: string;
  symbol: string;
  icon?: string | null;
  native: boolean;
  decimals?: number;
  address?: string | null;
  price?: string;
  priceHistory?: number[][];
}

export class Asset {
  public data: AssetData;

  constructor(data: AssetData) {
    this.data = {
      chainId: data.chainId,
      name: data.name,
      symbol: data.symbol,
      icon: data.icon,
      native: data.native,

      // Optional fields should be undefined if they are empty
      ...(data.id && { id: data.id }),
      ...(data.address && { address: data.address }),
      ...(data.price && { price: data.price }),
      ...(data.decimals && { decimals: data.decimals }),
      ...(data.priceHistory && { priceHistory: data.priceHistory }),
    };
  }

  get id() {
    if (!this.data.id) {
      return `${this.data.chainId}:${this.data.symbol}`;
    }

    return this.data.id;
  }

  get chainId() {
    return this.data.chainId;
  }

  get name() {
    return this.data.name;
  }

  get symbol() {
    return this.data.symbol;
  }

  get decimals() {
    return this.data.decimals;
  }

  get icon() {
    return this.data.icon;
  }

  get native() {
    return this.data.native;
  }

  get address() {
    return this.data.address;
  }

  get price() {
    return this.data.price;
  }

  get priceHistory() {
    return this.data.priceHistory;
  }

  /**
   * Create a new Asset using provided data object
   *
   * @param data object represents Asset
   */
  public static fromData(data: AssetData): Asset {
    return new Asset(data);
  }

  /**
   * Convert JSON string to Asset object
   *
   * @param json stirng that represents asset object
   */
  public static fromJson(json: string): Asset {
    const data = JSON.parse(json);
    return Asset.fromData(data);
  }

  /**
   * Verify if current and provided assets are equal
   *
   * @param other asset to compare with
   */
  public isEqual(other: Asset) {
    if (this.chainId === other.chainId) {
      if (this.symbol === other.symbol) {
        return true;
      }

      if (this.address !== undefined && other.address !== undefined && this.address === other.address) {
        return true;
      }
    }

    return false;
  }

  /**
   * Return symbol when converting asset to string
   *
   * @returns string
   */
  public toString() {
    return this.symbol;
  }
}

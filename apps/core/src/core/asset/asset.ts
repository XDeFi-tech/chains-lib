import BigNumber from 'bignumber.js';
import { Chain } from 'core';

export class Asset {
  protected data: Asset.Data;

  constructor(data: Asset.Data) {
    this.data = data;
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

  /**
   * Verify if current and provided assets are equal
   *
   * @param other asset to compare with
   */
  public isEqual(other: Asset) {
    return this.chainId === other.chainId && (this.symbol === other.symbol || this.address === other.address);
  }

  /**
   * Create a new Asset using provided data object
   *
   * @param data object represents Asset
   */
  public static fromData(data: Asset.Data): Asset {
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
   * Return symbol when converting asset to string
   *
   * @returns string
   */
  public toString() {
    return this.symbol;
  }
}

export namespace Asset {
  export interface Data {
    id?: string;
    chainId: Chain.ChainID;
    name: string;
    symbol: string;
    decimals: number;
    icon: string;
    native: boolean;
    address?: string;
    price?: BigNumber;
  }
}

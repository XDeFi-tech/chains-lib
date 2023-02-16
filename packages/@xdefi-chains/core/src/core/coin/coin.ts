import BigNumber from 'bignumber.js';
import { Asset } from 'core/asset';
import { round } from 'lodash';

export const FIAT_BALANCE_PRECISION = 2

export class Coin {
  public readonly amount: BigNumber;

  constructor(public readonly asset: Asset, amount: BigNumber.Value) {
    this.amount = new BigNumber(amount);
  }

  /**
   * Convert coin to string.
   *
   * Example:
   * `Coin('ETH', 10) -> 10ETH`
   */
  public toString(): string {
    const amount = this.amount.toFixed();
    return `${amount}${this.asset.symbol.toString()}`;
  }

  /**
   * Calculate coin fiat price
   * Note: if asset doesn't have `price` will return 0
   */
  public toFiat() {
    const amount = this.amount.toFixed()
    const { price } = this.asset;
    if (!price) {
      return 0;
    }

    return Number(amount) > 0
        ? round(Number(amount) * Number(price), FIAT_BALANCE_PRECISION)
        : 0
  }

  /**
   * Convert coin to object.
   */
  public toData(): Coin.Data {
    return {
      asset: this.asset,
      amount: this.amount.toFixed(),
    };
  }

  /**
   * Return a new Coin adding to current amount.
   *
   * @param other amount
   */
  public plus(other: BigNumber.Value | Coin): Coin {
    let otherAmount;
    if (other instanceof Coin) {
      if (!this.asset.isEqual(other.asset)) {
        throw new Error(`Cannot add two Coins of different assets: ${this.asset} and ${other.asset}`);
      }

      otherAmount = other.amount;
    } else {
      otherAmount = other;
    }

    return new Coin(this.asset, this.amount.plus(otherAmount));
  }

  /**
   * Return a new Coin subtracting from current amount.
   *
   * @param other amount
   */
  public minus(other: BigNumber.Value | Coin): Coin {
    let otherAmount;
    if (other instanceof Coin) {
      if (!this.asset.isEqual(other.asset)) {
        throw new Error(`Cannot subtract two Coins of different assets: ${this.asset} and ${other.asset}`);
      }

      otherAmount = other.amount;
    } else {
      otherAmount = other;
    }

    return new Coin(this.asset, this.amount.minus(otherAmount));
  }

  /**
   * Multiplies current amount with provided.
   *
   * @param other amount
   */
  public multipliedBy(other: BigNumber.Value): Coin {
    return new Coin(this.asset, this.amount.multipliedBy(other));
  }

  /**
   * Devices current amount with provided.
   *
   * @param other amount
   */
  public dividedBy(other: BigNumber.Value): Coin {
    return new Coin(this.asset, this.amount.dividedBy(other));
  }
}

export namespace Coin {
  export interface Data {
    asset: Asset;
    amount: string;
  }
}

import BigNumber from 'bignumber.js';

export class Coin {
  public readonly amount: BigNumber;

  constructor(public readonly denom: string, amount: BigNumber.Value) {
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
    return `${amount}${this.denom}`;
  }

  /**
   * Convert coin to object.
   *
   * Example:
   *
   * `Coin('ETH', 10) -> { denom: 'ETH', amount: 10 }`
   */
  public toData(): Coin.Data {
    return {
      denom: this.denom,
      amount: this.amount.toString(),
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
      if (other.denom !== this.denom) {
        throw new Error(`Cannot add two Coins of different denoms: ${this.denom} and ${other.denom}`);
      }

      otherAmount = other.amount;
    } else {
      otherAmount = other;
    }

    return new Coin(this.denom, this.amount.plus(otherAmount));
  }

  /**
   * Return a new Coin subtracting from current amount.
   *
   * @param other amount
   */
  public minus(other: BigNumber.Value | Coin): Coin {
    let otherAmount;
    if (other instanceof Coin) {
      if (other.denom !== this.denom) {
        throw new Error(`Cannot subtract two Coins of different denoms: ${this.denom} and ${other.denom}`);
      }

      otherAmount = other.amount;
    } else {
      otherAmount = other;
    }

    return new Coin(this.denom, this.amount.minus(otherAmount));
  }

  /**
   * Multiplies current amount with provided.
   *
   * @param other amount
   */
  public multipliedBy(other: BigNumber.Value): Coin {
    return new Coin(this.denom, this.amount.multipliedBy(other));
  }

  /**
   * Devices current amount with provided.
   *
   * @param other amount
   */
  public dividedBy(other: BigNumber.Value): Coin {
    return new Coin(this.denom, this.amount.dividedBy(other));
  }
}

export namespace Coin {
  export interface Data {
    denom: string;
    amount: string;
  }
}

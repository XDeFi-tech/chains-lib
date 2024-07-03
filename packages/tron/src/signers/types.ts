// re-export from ethers.
interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}

export type Bytes = ArrayLike<number>;

import { Provider } from 'core/chain';
import { GasFeeSpeed, MsgEncoding } from 'core';

/**
 * Abstract message class which allows to create chain specific message
 */

export type MsgData = any;

export interface FeeEstimation {
  fee: string | null;
  maxFee?: string | null;
}

export abstract class Msg<OutData extends object = object, TxData extends object = object> {
  public abstract signedTransaction: any;

  constructor(
    public readonly data: MsgData,
    public readonly provider?: Provider,
    public readonly encoding: MsgEncoding = MsgEncoding.object
  ) {}

  public abstract getFee(speed?: GasFeeSpeed): Promise<FeeEstimation>;

  /**
   * Check is current Msg has signature
   */
  get hasSignature(): boolean {
    return Boolean(this.signedTransaction);
  }

  /**
   * Create a new Msg using provided data object
   *
   * @param `data` object represents msg
   */
  public static fromData(data: MsgData): Msg {
    return new (this as any)(data);
  }

  /**
   * Convert JSON string to Msg object
   *
   * @param `json` string that represents msg object
   */
  public static fromJson(json: string): Msg {
    const data = JSON.parse(json);
    return this.fromData(data);
  }

  /**
   * Convert msg to data object, can be used for creating new msg
   */
  public abstract toData(): OutData;

  /**
   * Build transaction prepared for sign and broadcast
   */
  public abstract buildTx(): Promise<TxData>;

  /**
   * Assign signed transaction to this message
   */
  public sign(signedTx: unknown): void {
    this.signedTransaction = signedTx;
  }

  /**
   * Get maximum amount of token that can be sent
   * @param contract contract address (optional), if not provided native token will be used
   */
  public abstract getMaxAmountToSend(): Promise<string>;
}

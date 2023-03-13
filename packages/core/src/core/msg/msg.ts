/**
 * Abstract message class which allows to create chain specific message
 */

export type MsgData = any;

export abstract class Msg<
  OutData extends object = object,
  TxData extends object = object,
  FeeData extends object = object
> {
  public signature: string | undefined;

  constructor(public readonly data: MsgData) {}

  public abstract getFee(): FeeData;

  /**
   * Check is current Msg has signature
   */
  get hasSignature(): boolean {
    return Boolean(this.signature);
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

  public abstract toData(): OutData;

  public abstract buildTx(): TxData;

  /**
   * Assign signature to the message
   */
  public async sign(signature: string): Promise<Msg<OutData>> {
    this.signature = signature;
    return this as Msg<OutData>;
  }
}

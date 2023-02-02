/**
 * Abstract message class which allows to create chain specific message
 */
export abstract class Msg<OutData = {}> {
  protected signature?: string;

  constructor(public readonly data: Msg.Data) {}

  public abstract toData(): OutData;

  /**
   * Assign signature to the message
   *
   * @param signer - obj
   */
  public sign(signer: any): Msg {
    this.signature = signer;
    return this as Msg;
  }

  /**
   * Check is current Msg has signature
   */
  public hasSignature(): boolean {
    return Boolean(this.signature);
  }

  /**
   * Create a new Msg using provided data object
   *
   * @param `data` object represents msg
   */
  public static fromData(data: Msg.Data): Msg {
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
}

export namespace Msg {
  export type Data = string | object;
}

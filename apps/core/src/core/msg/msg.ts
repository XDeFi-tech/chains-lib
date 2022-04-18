/**
 * Abstract message class which allows to create chain specific message
 */
export abstract class Msg {
  protected signature?: string;
  protected data?: any;

  constructor(data: any) {
    this.data = data;
  }

  public abstract toData(): any;

  /**
   * Assign signature to the message
   *
   * @param signature of the message
   */
  sign(signature: string): Msg {
    this.signature = signature;
    return this;
  }

  /**
   * Create a new Msg using provided data object
   *
   * @param `data` object represents msg
   */
  public static fromData(data: object): Msg {
    return new (Msg as any)(data);
  }

  /**
   * Convert JSON string to Msg object
   *
   * @param `json` string that represents msg object
   */
  public static fromJson(json: string): Msg {
    const data = JSON.parse(json);
    return Msg.fromData(data);
  }
}

export namespace Msg {
  export type Data = string | object;
}

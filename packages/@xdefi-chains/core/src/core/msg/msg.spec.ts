import { Msg } from './msg';

const MSG_DATA: Msg.Data = 'My Message';

type OutData = {
  data: Msg.Data;
  signature?: string;
};

class MyMsg extends Msg<OutData> {
  public toData() {
    return {
      data: this.data
    };
  }
}

describe('Msg', () => {
  it('should create a new Msg', () => {
    const msg = new MyMsg(MSG_DATA);
    expect(msg).toBeInstanceOf(MyMsg);
  });

  it('sign(): should assign provided signature', () => {
    const msg = new MyMsg(MSG_DATA);
    // msg.sign('ABCD');

    expect(msg.toData()).toEqual({
      data: MSG_DATA,
      signature: 'ABCD',
    });
  });

  it('fromData(): should create new Msg from data', () => {
    const msg = MyMsg.fromData(MSG_DATA);

    expect(msg).toBeInstanceOf(MyMsg);
    expect(msg.toData()).toEqual({
      data: MSG_DATA,
    });
  });

  it('fromJson(): should create new Msg from JSON', () => {
    const msg = MyMsg.fromJson(JSON.stringify(MSG_DATA));

    expect(msg).toBeInstanceOf(MyMsg);
    expect(msg.toData()).toEqual({
      data: MSG_DATA,
    });
  });

  it('hasSignature(): should return FALSE for unsigned message', () => {
    const msg = MyMsg.fromData(MSG_DATA);

    expect(msg.hasSignature()).toBeFalsy();
  });

  it('hasSignature(): should return TRUE for signed message', () => {
    const msg = MyMsg.fromData(MSG_DATA);
    // msg.sign();

    expect(msg.hasSignature()).toBeTruthy();
  });
});

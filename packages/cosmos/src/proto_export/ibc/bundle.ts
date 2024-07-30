//@ts-nocheck

import * as _93 from './applications/transfer/v1/transfer';
import * as _94 from './applications/transfer/v1/tx';
import * as _95 from './applications/transfer/v2/packet';
import * as _101 from './core/client/v1/client';
import * as _288 from './applications/transfer/v1/tx.amino';
import * as _296 from './applications/transfer/v1/tx.registry';
import * as _418 from './lcd';
import * as _419 from './rpc.query';
import * as _420 from './rpc.tx';
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._93,
        ..._94,
        ..._288,
        ..._296,
      };
      export const v2 = {
        ..._95,
      };
    }
  }
  export const ClientFactory = {
    ..._418,
    ..._419,
    ..._420,
  };
}

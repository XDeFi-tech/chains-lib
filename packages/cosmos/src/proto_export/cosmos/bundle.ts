/* eslint-disable @typescript-eslint/no-namespace */
//@ts-nocheck
import * as _2 from './auth/module/v1/module';
import * as _3 from './auth/v1beta1/auth';
import * as _4 from './auth/v1beta1/genesis';
import * as _5 from './auth/v1beta1/query';
import * as _6 from './auth/v1beta1/tx';
import * as _13 from './bank/module/v1/module';
import * as _14 from './bank/v1beta1/authz';
import * as _15 from './bank/v1beta1/bank';
import * as _16 from './bank/v1beta1/genesis';
import * as _17 from './bank/v1beta1/query';
import * as _18 from './bank/v1beta1/tx';
import * as _19 from './base/abci/v1beta1/abci';
import * as _20 from './base/node/v1beta1/query';
import * as _21 from './base/query/v1beta1/pagination';
import * as _22 from './base/reflection/v2alpha1/reflection';
import * as _23 from './base/v1beta1/coin';
import * as _67 from './upgrade/module/v1/module';
import * as _68 from './upgrade/v1beta1/query';
import * as _69 from './upgrade/v1beta1/tx';
import * as _70 from './upgrade/v1beta1/upgrade';
import * as _240 from './auth/v1beta1/tx.amino';
import * as _242 from './bank/v1beta1/tx.amino';
import * as _247 from './upgrade/v1beta1/tx.amino';
import * as _248 from './auth/v1beta1/tx.registry';
import * as _250 from './bank/v1beta1/tx.registry';
import * as _255 from './upgrade/v1beta1/tx.registry';
import * as _256 from './auth/v1beta1/query.lcd';
import * as _258 from './bank/v1beta1/query.lcd';
import * as _259 from './base/node/v1beta1/query.lcd';
import * as _265 from './upgrade/v1beta1/query.lcd';
import * as _266 from './auth/v1beta1/query.rpc.Query';
import * as _268 from './bank/v1beta1/query.rpc.Query';
import * as _269 from './base/node/v1beta1/query.rpc.Service';
import * as _276 from './upgrade/v1beta1/query.rpc.Query';
import * as _277 from './auth/v1beta1/tx.rpc.msg';
import * as _279 from './bank/v1beta1/tx.rpc.msg';
import * as _284 from './upgrade/v1beta1/tx.rpc.msg';
import * as _415 from './lcd';
import * as _416 from './rpc.query';
import * as _417 from './rpc.tx';
export namespace cosmos {
  export namespace auth {
    export namespace module {
      export const v1 = {
        ..._2,
      };
    }
    export const v1beta1 = {
      ..._3,
      ..._4,
      ..._5,
      ..._6,
      ..._240,
      ..._248,
      ..._256,
      ..._266,
      ..._277,
    };
  }
  export namespace bank {
    export namespace module {
      export const v1 = {
        ..._13,
      };
    }
    export const v1beta1 = {
      ..._14,
      ..._15,
      ..._16,
      ..._17,
      ..._18,
      ..._242,
      ..._250,
      ..._258,
      ..._268,
      ..._279,
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._19,
      };
    }
    export namespace node {
      export const v1beta1 = {
        ..._20,
        ..._259,
        ..._269,
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._21,
      };
    }
    export namespace reflection {
      export const v2alpha1 = {
        ..._22,
      };
    }
    export const v1beta1 = {
      ..._23,
    };
  }
  export namespace capability {
    export namespace module {
      export const v1 = {
        ..._24,
      };
    }
  }
  export namespace consensus {
    export namespace module {
      export const v1 = {
        ..._25,
      };
    }
    export const v1 = {
      ..._26,
      ..._27,
      ..._243,
      ..._251,
      ..._260,
      ..._270,
      ..._280,
    };
  }
  export namespace upgrade {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    export namespace module {
      export const v1 = {
        ..._67,
      };
    }
    export const v1beta1 = {
      ..._68,
      ..._69,
      ..._70,
      ..._247,
      ..._255,
      ..._265,
      ..._276,
      ..._284,
    };
  }
  export const ClientFactory = {
    ..._415,
    ..._416,
    ..._417,
  };
}

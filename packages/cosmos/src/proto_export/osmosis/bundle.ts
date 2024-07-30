//@ts-nocheck
import * as _126 from './concentratedliquidity/params';
import * as _144 from './gamm/poolmodels/balancer/v1beta1/tx';
import * as _145 from './gamm/poolmodels/stableswap/v1beta1/stableswap_pool';
import * as _146 from './gamm/poolmodels/stableswap/v1beta1/tx';
import * as _147 from './gamm/v1beta1/balancerPool';
import * as _152 from './gamm/v1beta1/tx';
import * as _154 from './ibchooks/genesis';
import * as _155 from './ibchooks/params';
import * as _156 from './ibchooks/tx';
import * as _160 from './incentives/gauge';
import * as _166 from './incentives/tx';
import * as _167 from './lockup/genesis';
import * as _168 from './lockup/lock';
import * as _169 from './lockup/params';
import * as _170 from './lockup/query';
import * as _171 from './lockup/tx';
import * as _180 from './poolmanager/v1beta1/genesis';
import * as _182 from './poolmanager/v1beta1/module_route';
import * as _184 from './poolmanager/v1beta1/swap_route';
import * as _186 from './poolmanager/v1beta1/tx';
import * as _187 from './poolmanager/v2/query';
import * as _188 from './protorev/v1beta1/genesis';
import * as _189 from './protorev/v1beta1/gov';
import * as _190 from './protorev/v1beta1/params';
import * as _191 from './protorev/v1beta1/protorev';
import * as _192 from './protorev/v1beta1/query';
import * as _193 from './protorev/v1beta1/tx';
import * as _194 from './smartaccount/v1beta1/genesis';
import * as _195 from './smartaccount/v1beta1/models';
import * as _196 from './smartaccount/v1beta1/params';
import * as _197 from './smartaccount/v1beta1/query';
import * as _198 from './smartaccount/v1beta1/tx';
import * as _203 from './superfluid/superfluid';
import * as _204 from './superfluid/tx';
import * as _205 from './tokenfactory/v1beta1/authorityMetadata';
import * as _206 from './tokenfactory/v1beta1/genesis';
import * as _207 from './tokenfactory/v1beta1/params';
import * as _208 from './tokenfactory/v1beta1/query';
import * as _209 from './tokenfactory/v1beta1/tx';
import * as _213 from './txfees/v1beta1/feetoken';
import * as _214 from './txfees/v1beta1/genesis';
import * as _215 from './txfees/v1beta1/gov';
import * as _216 from './txfees/v1beta1/params';
import * as _217 from './txfees/v1beta1/query';
import * as _218 from './txfees/v1beta1/tx';
import * as _219 from './valsetpref/v1beta1/query';
import * as _220 from './valsetpref/v1beta1/state';
import * as _221 from './valsetpref/v1beta1/tx';
import * as _330 from './concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino';
import * as _331 from './concentratedliquidity/v1beta1/tx.amino';
import * as _332 from './gamm/poolmodels/balancer/v1beta1/tx.amino';
import * as _333 from './gamm/poolmodels/stableswap/v1beta1/tx.amino';
import * as _334 from './gamm/v1beta1/tx.amino';
import * as _335 from './ibchooks/tx.amino';
import * as _336 from './incentives/tx.amino';
import * as _337 from './lockup/tx.amino';
import * as _338 from './poolmanager/v1beta1/tx.amino';
import * as _339 from './protorev/v1beta1/tx.amino';
import * as _340 from './smartaccount/v1beta1/tx.amino';
import * as _341 from './superfluid/tx.amino';
import * as _342 from './tokenfactory/v1beta1/tx.amino';
import * as _343 from './txfees/v1beta1/tx.amino';
import * as _344 from './valsetpref/v1beta1/tx.amino';
import * as _345 from './concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry';
import * as _346 from './concentratedliquidity/v1beta1/tx.registry';
import * as _347 from './gamm/poolmodels/balancer/v1beta1/tx.registry';
import * as _348 from './gamm/poolmodels/stableswap/v1beta1/tx.registry';
import * as _349 from './gamm/v1beta1/tx.registry';
import * as _350 from './ibchooks/tx.registry';
import * as _351 from './incentives/tx.registry';
import * as _352 from './lockup/tx.registry';
import * as _353 from './poolmanager/v1beta1/tx.registry';
import * as _354 from './protorev/v1beta1/tx.registry';
import * as _355 from './smartaccount/v1beta1/tx.registry';
import * as _356 from './superfluid/tx.registry';
import * as _357 from './tokenfactory/v1beta1/tx.registry';
import * as _358 from './txfees/v1beta1/tx.registry';
import * as _359 from './valsetpref/v1beta1/tx.registry';
import * as _368 from './lockup/query.lcd';
import * as _372 from './poolmanager/v2/query.lcd';
import * as _373 from './protorev/v1beta1/query.lcd';
import * as _374 from './smartaccount/v1beta1/query.lcd';
import * as _376 from './tokenfactory/v1beta1/query.lcd';
import * as _378 from './txfees/v1beta1/query.lcd';
import * as _379 from './valsetpref/v1beta1/query.lcd';
import * as _388 from './lockup/query.rpc.Query';
import * as _392 from './poolmanager/v2/query.rpc.Query';
import * as _393 from './protorev/v1beta1/query.rpc.Query';
import * as _394 from './smartaccount/v1beta1/query.rpc.Query';
import * as _396 from './tokenfactory/v1beta1/query.rpc.Query';
import * as _398 from './txfees/v1beta1/query.rpc.Query';
import * as _399 from './valsetpref/v1beta1/query.rpc.Query';
import * as _400 from './concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg';
import * as _402 from './gamm/poolmodels/balancer/v1beta1/tx.rpc.msg';
import * as _403 from './gamm/poolmodels/stableswap/v1beta1/tx.rpc.msg';
import * as _404 from './gamm/v1beta1/tx.rpc.msg';
import * as _405 from './ibchooks/tx.rpc.msg';
import * as _406 from './incentives/tx.rpc.msg';
import * as _407 from './lockup/tx.rpc.msg';
import * as _408 from './poolmanager/v1beta1/tx.rpc.msg';
import * as _409 from './protorev/v1beta1/tx.rpc.msg';
import * as _410 from './smartaccount/v1beta1/tx.rpc.msg';
import * as _411 from './superfluid/tx.rpc.msg';
import * as _412 from './tokenfactory/v1beta1/tx.rpc.msg';
import * as _413 from './txfees/v1beta1/tx.rpc.msg';
import * as _414 from './valsetpref/v1beta1/tx.rpc.msg';
import * as _424 from './lcd';
import * as _425 from './rpc.query';
import * as _426 from './rpc.tx';
export namespace osmosis {
  export const concentratedliquidity = {
    ..._126,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._330,
          ..._345,
          ..._400,
        },
      },
    },
    v1beta1: {
      ..._331,
      ..._346,
    },
  };
  export namespace gamm {
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._144,
          ..._332,
          ..._347,
          ..._402,
        };
      }
    }
    export const v1beta1 = {
      ..._147,
      ..._152,
      ..._334,
      ..._349,
      ..._404,
    };
  }
  export const ibchooks = {
    ..._154,
    ..._155,
    ..._156,
    ..._335,
    ..._350,
    ..._405,
  };
  export const incentives = {
    ..._160,
    ..._166,
    ..._336,
    ..._351,
    ..._406,
  };
  export const lockup = {
    ..._167,
    ..._168,
    ..._169,
    ..._170,
    ..._171,
    ..._337,
    ..._352,
    ..._368,
    ..._388,
    ..._407,
  };
  export namespace poolmanager {
    export const v1beta1 = {
      ..._180,
      ..._184,
      ..._186,
      ..._338,
      ..._353,
      ..._408,
    };
    export const v2 = {
      ..._187,
      ..._372,
      ..._392,
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._188,
      ..._189,
      ..._190,
      ..._191,
      ..._192,
      ..._193,
      ..._339,
      ..._354,
      ..._373,
      ..._393,
      ..._409,
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._194,
      ..._195,
      ..._196,
      ..._197,
      ..._198,
      ..._340,
      ..._355,
      ..._374,
      ..._394,
      ..._410,
    };
  }
  export const superfluid = {
    ..._203,
    ..._204,
    ..._341,
    ..._356,
    ..._411,
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._205,
      ..._206,
      ..._207,
      ..._208,
      ..._209,
      ..._342,
      ..._357,
      ..._376,
      ..._396,
      ..._412,
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._213,
      ..._214,
      ..._215,
      ..._216,
      ..._217,
      ..._218,
      ..._343,
      ..._358,
      ..._378,
      ..._398,
      ..._413,
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._219,
      ..._220,
      ..._221,
      ..._344,
      ..._359,
      ..._379,
      ..._399,
      ..._414,
    };
  }
  export const ClientFactory = {
    ..._424,
    ..._425,
    ..._426,
  };
}

import 'reflect-metadata';
import { TextEncoder, TextDecoder } from 'util';
// @ts-ignore
import XMLHttpRequest from 'xhr2';

Object.assign(global, { TextDecoder, TextEncoder, XMLHttpRequest });

const crypto = require('crypto');

Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: (
      arr: Array<Buffer | Uint8Array | DataView | ArrayBuffer>
    ) => crypto.randomBytes(arr.length),
  },
});

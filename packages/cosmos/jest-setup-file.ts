import 'reflect-metadata';

// @ts-ignore
import XMLHttpRequest from 'xhr2';

global.XMLHttpRequest = XMLHttpRequest;

import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });

const crypto = require('crypto');

Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: (
      arr: Array<Buffer | Uint8Array | DataView | ArrayBuffer>
    ) => crypto.randomBytes(arr.length),
  },
});

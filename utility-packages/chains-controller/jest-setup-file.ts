import 'reflect-metadata';

const crypto = require('crypto');

Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: (
      arr: Array<Buffer | Uint8Array | DataView | ArrayBuffer>
    ) => crypto.randomBytes(arr.length),
  },
});

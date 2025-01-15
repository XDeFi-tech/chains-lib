---
to: packages/<%= name.toLowerCase() %>/package.json
---

{
  "name": "@xdefi-tech/chains-<%= name.toLowerCase() %>",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "license": "MIT",
  "devDependencies": {
    "eslint-config-custom": "*",
    "jest": "^27.5.1",
    "jest-environment-jsdom": "^27.5.1",
    "jest-watch-typeahead": "^1.0.0",
    "ts-jest": "^27.1.4",
    "tsup": "^6.6.3",
    "typescript": "4.8.3"
  },
  "dependencies": {
    "@xdefi-tech/chains-core": "*",
    "bignumber.js": "^9.0.2",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^4.4.0",
    "rxjs": "^7.8.0",
    "ts-node": "^10.7.0"
  },
  "scripts": {
    "build": "tsup --minify --clean",
    "watch": "tsup --watch",
    "clean": "rimraf dist .turbo node_modules",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "test": "jest"
  },
  "type": "module",
  "tsup": {
    "entry": [
      "src/**/*.ts",
      "!src/**/*.spec.*",
      "!src/custom.d.ts",
    ],
    "format": "esm",
    "splitting": false,
    "dts": true,
    "types": [
      "./dist/index.d.ts",
      "./signers/web.d.ts",
      "./signers/react-native.d.ts"
    ],
    "platform": "browser",
    "external": ["*"]
  }
}

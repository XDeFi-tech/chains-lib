---
to: packages/<%= name.toLowerCase() %>/package.json
---

{
  "name": "@xdefi/chains-<%= name.toLowerCase() %>",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "license": "MIT",
  "devDependencies": {
    "jest": "^27.5.1",
    "jest-environment-jsdom": "^27.5.1",
    "jest-watch-typeahead": "^1.0.0",
    "ts-jest": "^27.1.4",
    "typescript": "^4.6.3"
  },
  "dependencies": {
    "@xdefi/chains-core": "*",
    "bignumber.js": "^9.0.2",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^4.4.0",
    "rxjs": "^7.8.0",
    "ts-node": "^10.7.0"
  },
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "watch": "webpack --config webpack.dev.js",
    "clean": "rimraf dist .turbo node_modules",
    "test": "jest"
  }
}

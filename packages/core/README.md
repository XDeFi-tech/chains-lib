# Chain Core Documentation

This document provides an overview of the Chain Core library and its configuration options.

## Overview

Chain Core is a library designed to facilitate interaction with various blockchain networks. It provides a unified interface for managing blockchain providers, signers, and transactions.

## Configuration

### CHAINS_CORE_OPTIONS

`CHAINS_CORE_OPTIONS` is a configuration object used to customize the behavior of the Chain Core library in client-side environments. It allows you to specify endpoints and client information.

#### Example Configuration

To configure `CHAINS_CORE_OPTIONS`, ensure that it is added to the `global` / `window` objects. This setup should be done on the client-side to avoid issues during server-side rendering.

```javascript
// for browser
window.CHAINS_CORE_OPTIONS = {
  httpUri: 'https://gql-router.xdefi.services/graphql',
  wsUri: 'wss://gateway-ws.xdefi.services/',
  clientName: 'chain-lib-react-example',
  clientVersion: '0.0.0',
};

// for Node.js
global.CHAINS_CORE_OPTIONS = {
  httpUri: 'https://gql-router.xdefi.services/graphql',
  wsUri: 'wss://gateway-ws.xdefi.services/',
  clientName: 'chain-lib-node-example',
  clientVersion: '0.0.0',
};
```

#### Usage

- **httpUri**: The HTTP URI for the GraphQL endpoint.
- **wsUri**: The WebSocket URI for real-time data.
- **clientName**: The name of the client application.
- **clientVersion**: The version of the client application.
- **disableApolloCache** (optional): set `no-cache` policy to all queries.

# Chain Core Documentation

This document provides an overview of the Chain Core library and its configuration options.

## Overview

Chain Core is a library designed to facilitate interaction with various blockchain networks. It provides a unified interface for managing blockchain providers, signers, and transactions.

## Configuration

### CHAINS_CORE_OPTIONS

`CHAINS_CORE_OPTIONS` is a configuration object used to customize the behavior of the Chain Core library in client-side environments. It allows you to specify endpoints and client information.

#### Example Configuration

To configure `CHAINS_CORE_OPTIONS`, ensure that it is added to the `window` object. This setup should be done on the client-side to avoid issues during server-side rendering.

```javascript
if (typeof window !== 'undefined') {
  window.CHAINS_CORE_OPTIONS = {
    httpUri: 'https://gql-router.xdefi.services/graphql',
    wsUri: 'wss://gateway-ws.xdefi.services/',
    clientName: 'chain-lib-react-example',
    clientVersion: 'v1.0',
  };
}
```

#### Usage

- **httpUri**: The HTTP URI for the GraphQL endpoint.
- **wsUri**: The WebSocket URI for real-time data.
- **clientName**: The name of the client application.
- **clientVersion**: The version of the client application.

### Backend Configuration

For backend environments, use environment variables to configure the endpoints and client information:

```bash
CHAIN_CORE_HTTP_URI=https://gql-router.xdefi.services/graphql
CHAIN_CORE_CLIENT_NAME=chain-lib-backend
CHAIN_CORE_CLIENT_VERSION=v1.0
```

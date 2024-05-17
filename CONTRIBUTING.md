# chains-lib Contributing Guide

## Introduction

This document is a set of guidelines for contributing to this project. These are guidelines, not rules. This guide is meant to make it easy for you to get involved.

First off, thank you for considering contributing to this project. It's people like you that make this documentation better for everyone.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open-source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

chains-lib is a community-driven project, and we welcome contributions from the community. Whether you're fixing a typo, adding a new feature, or changing the documentation, we'd love to have your contributions.

Please, don't use the issue tracker for personal support requests. Instead, use the [XDEFI Discord](https://discord.gg/xdefi) for support.

## Project structure

The project is divided into the following directories:

```
📦 chains-lib
├─ .changeset
│  └─ ...
├─ .github
│  └─ workflows
│     ├─ tests.yml
│     └─ release.yml
├─ .husky
│  └─ ...
├─ packages
│  ├─ core
│  │  ├─ src
│  │  │  ├─ index.ts
│  │  │  ├─ core
│  │  │  │  └─ ...
│  │  │  └─ common
│  │  │     └─ ...
│  │  └─ ...
│  ├─ binance
│  │  ├─ src
│  │  │  ├─ datasource
│  │  │  │  ├─ index.ts
│  │  │  │  └─ indexer
│  │  │  │     ├─ queries
│  │  │  │     │  ├─ index.ts
│  │  │  │     │  └─ ....query.ts
│  │  │  │     ├─ indexer.data-source.ts
│  │  │  │     └─ operations.graphql
│  │  │  ├─ signers
│  │  │  │  ├─ ledger.signer.ts
│  │  │  │  ├─ ledger.signer.spec.ts
│  │  │  │  ├─ private-key.signer.ts
│  │  │  │  ├─ private-key.signer.spec.ts
│  │  │  │  ├─ seed-phrase.signer.ts
│  │  │  │  ├─ seed-phrase.signer.spec.ts
│  │  │  │  ├─ trezor.signer.ts
│  │  │  │  ├─ trezor.signer.spec.ts
│  │  │  │  ├─ react-native.ts
│  │  │  │  └─ web.ts
│  │  │  ├─ chain.provider.ts
│  │  │  ├─ index.ts
│  │  │  ├─ manifests.ts
│  │  │  └─ msg.ts
│  │  └─ ...
│  ├─ bitcoin
│  │  └─ ...
│  ├─ bitcoincash
│  │  └─ ...
│  ├─ cosmos
│  │  └─ ...
│  ├─ dogecoin
│  │  └─ ...
│  ├─ evm
│  │  └─ ...
│  ├─ litecoin
│  │  └─ ...
│  ├─ solana
│  │  └─ ...
│  ├─ thor
│  │  └─ ...
│  ├─ tron
│  │  └─ ...
│  ├─ utxo
│  │  └─ ...
│  └─ ...
├─ templates
│  └─ ...
├─ examples
│  └─ ...
├─ utility-packages
│  └─ ...
├─ .gitignore
├─ .prettierrc
├─ coverage.js
├─ turbo.json
├─ yarn.lock
├─ package.jon
├─ CONTRIBUTING.md
└─ README.md
```

The project is a monorepo that contains multiple packages and we mainly work on the `packages` directory. Each package is a separate module that can be used independently. The `core` package is the main package that contains the core logic of the library. The `utxo` package contains the UTXO chain-specific logic and only supports UTXO-based chains. The `binance`, `bitcoin`, `bitcoincash`, `cosmos`, `dogecoin`, `evm`, `litecoin`, `solana`, `thor` and `tron` packages are chain-specific packages that contain chain-specific logic. The `utility-packages` directory contains utility packages that are used across multiple packages. With each package, we have a `src` directory that contains the source code of the package. The `index.ts` file is the entry point of the package. The `core` package contains the core logic of the library. The `common` directory contains common types and interfaces that are used across multiple packages.

## How to contribute?

Below are some frequently asked questions about concepts in the project and how to contribute to the project:

### How to integrate a new blockchain provider?

To integrate a new blockchain provider, you need to create a new package in the `packages` directory. The package should contain a `src` directory that contains the source code of the package. The `index.ts` file should be the entry point of the package. The package should contain chain-specific logic, such as chain-specific types, interfaces, and functions. `datasources`, `signers`, and `chain.providers` should be implemented in the package. The package should also contain chain-specific `manifests` and `messages`.

### What is a signer?

A signer is a class that is used to sign transactions. A signer should implement the `Signer` interface. The `Signer` interface has a `sign` method that takes a `SignMessage` object as an argument and returns a `Signature` object. The `SignMessage` object contains the message to sign, and the `Signature` object contains the signature of the message.

In addition to signing transactions, each signer should also implement methods such as `verifyAddress`, `getAddress`, and `getPublicKey`. The `verifyAddress` method takes an address as an argument and returns a boolean value indicating whether the address is valid. The `getPublicKey` method is used to get the public key of the signer, and the `getAddress` method is used to get the address of the signer. Some methods may not be implemented/supported by all signers as well as some signers may have additional methods.

Currently, the library supports the following signers:

- `LedgerSigner`: Ledger hardware wallet signer.
- `PrivateKeySigner`: Private key signer.
- `SeedPhraseSigner`: Seed phrase signer.
- `TrezorSigner`: Trezor hardware wallet signer.

### How to implement a new signer?

To implement a new signer, you need to create a new file in the `signers` directory of the chain-specific package. The file should contain a class that implements the `Signer` interface. The class should implement the `sign` method, which takes a `SignMessage` object as an argument and returns a `Signature` object. The `SignMessage` object contains the message to sign, and the `Signature` object contains the signature of the message.

### What is a datasource?

A datasource is a class that is used to interact with the blockchain. A datasource should implement the `DataSource` interface. The `DataSource` interface has a `query` method that takes a `Query` object as an argument and returns a `QueryResult` object. The `Query` object contains the query to execute, and the `QueryResult` object contains the result of the query.

Basically only indexer datasource has `query`, chain datasource get's information directly from blockchain and have no GQL queries (except additional metadata via `cryptoAsset` query)

### How to implement a new datasource?

To implement a new datasource, the only requirement is create "proxy" to interact with the blockchain and implement DataSource class from core library, you need to create a new file in the `datasources` directory of the chain-specific package. The file should contain a class that implements the `DataSource` interface. The class should implement the `query` method, which takes a `Query` object as an argument and returns a `QueryResult` object. The `Query` object contains the query to execute, and the `QueryResult` object contains the result of the query.

## Development setup

You will need to have [Node.js](https://nodejs.org/) vesion 18 or higher. We recommend using Yarn as the package manager.

After cloning the repository, run the following commands:

```bash
yarn # install dependencies of the project
```

To build the project, run:

```bash
yarn build
```

## Pull Requests guidelines

- chains-lib core has 2 main branches: `main` and `develop`. All development should be done in the `develop` branch. The `main` branch is only updated when a new release is made, the `develop` branch is merged into the `main` branch when a new release is made, and the `main` branch is tagged with the release version.
- Pull requests should be made to the `develop` branch.
- If adding a new feature or fixing a bug:
  - Add accurate tests and ensure they pass.
  - Run `npx changeset` to reflect and generate a [changeset](https://github.com/changesets/changesets) for the PR.
  - Provide a detailed description of the bug in the PR.
- It's OK to have multiple small commits as you work on the PR - we will squash them before merging.
- Make sure your code lints. Run `yarn lint` to check your code. You can also run `yarn lint:fix` to automatically fix some issues.
- Make sure your code is well-tested. Run `yarn test` to run the test suite. Better to use `yarn test --concurrency=2`, otherwise your system can be crashed.
- Commit messages must follow the conventional commit format: `type(scope): message`. Types include `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, and `revert`. For example, `feat: add new feature` or `fix: correct typo`.

## Contribution workflow

1. Search for an existing issue or create a new one to start a discussion around your idea or bug. Make sure no one else is already working on it, and assign yourself to the issue if you plan to work on it. If you don't have permissions to assign yourself, leave a comment asking for it.
2. Clone the repository to your local machine.
3. Create and checkout a new branch for your work, naming it relevantly. We recommend naming your branch with the issue number and a short description of the issue (e.g., `fix:issue-123-fix-typo`), which is a reminder to fix only one issue in a PR.
4. Open the project in your favorite editor and start making your changes.
5. Commit your changes, briefly describing what you did in the commit message. Push your changes to your branch.
6. On this repository, navigate to the "Pull Requests" tab and click on "New Pull Request". Describe your changes in detail, including the issue number you're addressing. If you're not ready for a review yet, you can open a draft pull request.
7. Specific reviewers will be assigned to your pull request. If you don't get a response within a week, feel free to ask for a review in the Discord channel.
8. Make changes to your pull request if the reviewer asks for them. Once the reviewer approves your changes, the pull request will be merged.

## Code review process

The core team looks at Pull Requests on a regular basis in a weekly triage meeting that we hold in Discord. The meeting is used to discuss Pull Requests and Issues. The meeting is open to the public, and you are welcome to join.

After feedback has been given, the Pull Request author should respond within a week. After a week with no response, the Pull Request may be closed.

## How to report a bug

If you find a security vulnerability, do NOT open an issue. Email [info@xdefi.io](mailto:info@xdefi.io) instead.

When filling an issue, make sure to answer these five questions:

1. What release version are you using?
2. What is issue you faced, steps to reproduce it?
3. What did you do?
4. What did you expect to see?
5. What did you see instead?
6. What operating system are you using?

## How to suggest a feature or enhancement

If you find yourself wishing for a feature that doesn't exist in the documentation, you are probably not alone. There are bound to be others out there with similar needs. Many of the features that exist in the documentation started as a pull request from a single contributor.

When suggesting a feature, please provide as much detail as possible. Explain what the feature would do and how it would be useful to other users.

## Community

Discussions about the documentation take place on the [XDEFI Discord](https://discord.gg/xdefi).

We also available on [X](https://twitter.com/xdefi_wallet) and [Telegram](https://t.me/xdefi_announcements).

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project, you agree to abide by its terms.

## Credits

Thank you to all the people who have already contributed to the project!

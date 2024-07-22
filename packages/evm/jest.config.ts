import type { Config } from 'jest';

const config: Config = {
  setupFiles: ['./jest-setup-file.ts'],
  preset: 'ts-jest',
  transform: {
    '.+\\.(t|j)s$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testEnvironment: 'jsdom',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  testTimeout: 15000,
  globals: {
    Uint8Array: Uint8Array,
  },
};

export default config;

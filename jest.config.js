module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./src'],
    silent: false,
    verbose: true,
    collectCoverageFrom: ['src/**'],
    coverageReporters: ['text'],
    testMatch: ['**/?(*.)+(spec|test|e2e).ts?(x)']
  };
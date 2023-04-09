import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  coverageDirectory: '<rootDir>/test-coverage',
  coverageReporters: ['text-summary', 'html-spa'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
};

export default config;

import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }]
  },

  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],

  moduleNameMapper: {
    '^ui-library$': '<rootDir>/__mocks__/ui-library.tsx',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
}

export default config

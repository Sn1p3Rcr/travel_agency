import type { Config } from 'jest'

const config: Config = {
  // окружение для testing-library/react
  testEnvironment: 'jsdom',

  // подключаем jest-dom матчеры
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // трансформация TS/TSX
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }]
  },

  // ✅ игнорим сборку и декларации типов
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],

  // ✅ ищем тесты только в src
  testMatch: ['<rootDir>/src/**/__tests__/**/*.(test|spec).(ts|tsx)'],

  // если в компонентах есть импорты стилей
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
}

export default config

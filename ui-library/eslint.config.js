import js from '@eslint/js'
import globals from 'globals'

import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },

  // основной код (ts/tsx)
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // важно для TS: иначе будет "JSX is not defined"
      'no-undef': 'off',

      'react-refresh/only-export-components': 'warn',

      indent: ['error', 2],
      semi: ['error', 'never']
    }
  },

  // Jest тесты
  {
    files: ['**/__tests__/**/*.{ts,tsx,js,jsx}', '**/*.{test,spec}.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
]

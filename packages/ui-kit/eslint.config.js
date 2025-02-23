import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import sort from 'eslint-plugin-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  sort.configs['flat/recommended'],
  {
    rules: {
      'sort/imports': [
        'warn',
        {
          groups: [
            { order: 10, type: 'side-effect' },
            { order: 20, type: 'dependency' },
            { order: 30, regex: '^(.*)?components?(.*)$' },
            { order: 31, regex: '^(.*)?atoms?(.*)$' },
            { order: 32, regex: '^(.*)?molecules?(.*)$' },
            { order: 33, regex: '^(.*)?organisms?(.*)$' },
            { order: 34, regex: '^(.*)?templates?(.*)$' },
            { order: 40, regex: '^(.*)?shared?(.*)$' },
            { order: 50, type: 'other' },
          ],
          separator: '\n',
        },
      ],
    },
  },
  {
    files: ['**/index.ts'],
    rules: {
      'sort/exports': [
        'error',
        {
          caseSensitive: false,
          groups: [],
          natural: true,
          typeOrder: 'preserve',
        },
      ],
    },
  },
  {
    rules: {
      'sort/object-properties': [
        'error',
        { caseSensitive: false, natural: true },
      ],
    },
  }
)

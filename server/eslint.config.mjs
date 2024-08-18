import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: pluginPrettier
    }
  },
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/public/**', '**/coverage/**']
  },
  {
    files: ['**/*.js', '**/*.ts']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    }
  },
  {
    rules: {
      'prefer-const': 'warn',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-use-before-define': 'error',
      'no-useless-constructor': 'error',
      'no-console': 'warn',
      semi: 'error',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return'
        }
      ]
    }
  }
];

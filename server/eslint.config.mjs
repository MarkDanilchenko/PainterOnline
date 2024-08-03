import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginImport from 'eslint-plugin-import';

export default [
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: pluginPrettier,
      import: pluginImport
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
    linterOptions: {
      noInlineConfig: true
    },
    rules: {
      'prefer-const': 'warn',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-use-before-define': 'error',
      'no-useless-constructor': 'error',
      'no-console': 'warn',
      'no-alert': 'error',
      semi: 'error',
      'prettier/prettier': 'error',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
        }
      ]
    }
  }
];

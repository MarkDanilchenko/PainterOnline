import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReactHooks from 'eslint-plugin-react-hooks';

export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      prettier: pluginPrettier,
      'react-hooks': pluginReactHooks,
    },
  },
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/public/**', '**/coverage/**'],
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  {
    linterOptions: {
      noInlineConfig: true,
    },
    rules: {
      'prefer-const': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-console': 'error',
      'no-alert': 'error',
      semi: 'error',
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
];

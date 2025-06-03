import js from '@eslint/js';
import globals from 'globals';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-x': reactX,
      'react-dom': reactDom,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@tanstack/query': pluginQuery,
    },
    rules: {
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...pluginQuery.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  }
);

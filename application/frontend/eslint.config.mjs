// @ts-check
import reactPlugin from 'eslint-plugin-react';
import * as reactPluginHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import { createBaseEslint } from '../../createBaseEslint.mjs';

export default [...createBaseEslint(), getReactLinting(), getImportLinting()];

function getReactLinting() {
  return {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      ...reactPlugin.configs.flat.recommended.plugins,
      'react-hooks': reactPluginHooks,
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPluginHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/display-name': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          children: 'never',
          props: 'never',
          propElementValues: 'always',
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/no-unknown-property': ['off'],
    },
  };
}

function getImportLinting() {
  return {
    files: ['**/*.{js,ts,tsx}'],
    settings: {
      'import/resolver': {
        // required for eslint-plugin-import
        typescript: true,
      },
    },
    plugins: {
      import: importPlugin, // sort "import" statements
    },
    // is required only for `@typescript-eslint/consistent-type-exports`
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'import/order': [
        'warn',
        {
          pathGroups: [
            {
              pattern: './**.module.scss', // ./my.module.scss
              group: 'sibling',
              position: 'after',
            },
          ],
          groups: [
            // import fs from 'fs';
            'builtin',

            // import _ from 'lodash';
            'external',

            // import foo from 'src/foo';
            'internal',

            // import qux from '../../foo/qux';
            'parent',

            // import main from './';
            'index',

            // import baz from './bar/baz';
            'sibling',
          ],
          'newlines-between': 'never',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { fixStyle: 'inline-type-imports', prefer: 'type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'warn',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      'import/no-duplicates': 'warn',
    },
  };
}

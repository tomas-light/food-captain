// @ts-check
import reactPlugin from 'eslint-plugin-react';
import * as reactPluginHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import { createBaseEslint } from '../../createBaseEslint.mjs';

export default [
  {
    ignores: [
      'src/shared/locale/__generated/**',
      'src/shared/locale/types/helpers.d.ts',
      'src/shared/locale/types/options.d.ts',
      'src/shared/locale/types/t.d.ts',
    ],
  },
  ...createBaseEslint(),
  getReactLinting(),
  ...getImportLinting(),
];

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
      'react/no-children-prop': 'off',
    },
  };
}

function getImportLinting() {
  return [
    {
      files: ['**/*.{js,ts,tsx}'],
      settings: {
        'import/resolver': {
          // required for eslint-plugin-import
          typescript: true,
        },
      },
      plugins: {
        import: importPlugin, // sort "import" statements
        indexImports: {
          name: 'index-imports-linter',
          version: '0.0.0',
          rules: {
            index: {
              create: (context) => ({
                ImportDeclaration: (node) => {
                  const importPath = node.source.value;

                  // import {} from '~/entities/recipe'; ✅
                  // import {} from '~/entities/recipe/index'; ❌
                  if (!importPath.endsWith('./index')) {
                    return;
                  }

                  context.report({
                    node,
                    message: '"/index" path in imports is not allowed',
                  });
                },
              }),
            },
          },
        },
        tooLongSlicesImports: {
          name: 'too-long-slices-imports-linter',
          version: '0.0.0',
          rules: {
            tooLong: {
              create: (context) => ({
                ImportDeclaration: (node) => {
                  const importPath = node.source.value;

                  // import {} from '../../../entities/recipe'; ✅
                  if (!importPath.startsWith('~')) {
                    return;
                  }

                  const subPaths = importPath.split('/');
                  const importDepth = subPaths.length;

                  // import {} from '~/entities/recipe'; ✅
                  // import {} from '~/entities/recipe/ui/MyButton.ts'; ❌
                  const MAX_DEPTH = 3;
                  if (importDepth <= MAX_DEPTH) {
                    return;
                  }

                  // import {} from '~/entities/recipe/crossExports'; ✅
                  if (subPaths.at(-1) === 'crossExports') {
                    return;
                  }

                  context.report({
                    node,
                    message: `Too deep (${importDepth}) tilda import '${node.source.value}'. Consider using import from '${subPaths.slice(0, MAX_DEPTH).join('/')}'`,
                  });
                },
              }),
            },
          },
        },
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
              {
                pattern: '~/**', // ~/entities
                group: 'internal',
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

        'indexImports/index': 'error',
        'tooLongSlicesImports/tooLong': 'error',
      },
    },

    // fsd
    getRuleForLinting(
      'shared',
      ['entities', 'features', 'widgets', 'pages', 'app'],
      false
    ),
    getRuleForLinting('entities', ['features', 'widgets', 'pages', 'app']),
    getRuleForLinting('features', ['widgets', 'pages', 'app']),
    getRuleForLinting('widgets', ['pages', 'app']),
    getRuleForLinting('pages', ['app']),
  ];
}

function getRuleForLinting(
  layer,
  prohibitedGroups = [],
  sameLevelProhibited = true
) {
  const patterns = [
    {
      regex: `~/(${prohibitedGroups.join('|')})`,
      message: `\n\n📤 Import '${prohibitedGroups.join("', '")}' from '${layer}' layer is not allowed.`,
    },
  ];

  if (sameLevelProhibited) {
    patterns.push({
      regex: `~/${layer}/(?!.*crossExports).*`,
      message: `\n\n📤 If you need to import within a same layer, export the required functionality from '${layer}/slice-name/crossExports.ts'.`,
    });
  }

  return {
    files: [`**/${layer}/**/*.{ts,tsx}`],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns,
        },
      ],
    },
  };
}

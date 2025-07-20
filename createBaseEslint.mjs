// @ts-check
import tsEslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default createBaseEslint;

export function createBaseEslint() {
  return tsEslint.config(
    {
      ignores: ['build/*', '.yarn/'],
    },
    tsEslint.configs.recommended,
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-floating-promises': 'error',
        'no-console': 'off',
      },
    },
    getPrettierLinting()
  );
}

function getPrettierLinting() {
  return {
    ...prettierConfig,
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      ...prettierConfig.rules,
      // 'max-len': [
      //   'warn',
      //   {
      //     code: 80,
      //     comments: 120,
      //     ignoreComments: true,
      //     ignoreStrings: true, // ignores lines that contain a double-quoted or single-quoted string
      //     ignoreTemplateLiterals: true, // ignores lines that contain a template literal
      //     ignoreRegExpLiterals: true, // ignores lines that contain a RegExp literal
      //     tabWidth: 2,
      //   },
      // ],
      quotes: [1, 'single', 'avoid-escape'],
      'spaced-comment': ['error', 'always'],
      curly: ['error', 'all'],
    },
  };
}

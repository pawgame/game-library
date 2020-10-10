module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
  },
  rules: {
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'class-methods-use-this': 'off',
    quotes: 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'import/no-cycle': 'off',
    'no-mixed-operators': 'off',
    'no-bitwise': 'off',
    'prefer-destructuring': 'off',
    // 'dot-notation': 'off',
    'import/prefer-default-export': 'off',
    // 'arrow-body-style': 'off',
    // 'no-new': 'off',
    // 'operator-linebreak': 'off',
    // 'object-curly-newline': 'off',
    // 'max-classes-per-file': 'off',
    // 'no-case-declarations': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
};

// TIPS
// 下一行禁用检查
// eslint-disable-next-line

// 整个文件禁用检查
/* eslint-disable */

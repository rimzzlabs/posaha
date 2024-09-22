module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'tailwindcss'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'prefer-const': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'tailwindcss/classnames-order': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'tailwindcss/no-contradicting-classname': 'warn',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}

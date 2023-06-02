module.exports = {
  env: { browser: true, es2021: true },
  extends: [
    // 'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint-config-airbnb/whitespace',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: './tsconfig.json' },
  plugins: ['react-refresh', 'react', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
}

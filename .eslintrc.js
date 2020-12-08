module.exports = {
  plugins: ['mocha', 'promise', 'node'],
  ignorePatterns: ['node_modules/*'],
  globals: { step: 'readonly' },
  rules: {
    'mocha/no-top-level-hooks': 0,
    'mocha/no-hooks-for-single-case': 0,
    'mocha/no-setup-in-describe': 0,
    'no-template-curly-in-string': 0,
    'node/no-unpublished-require': 0,
    'node/no-unsupported-features/node-builtins': [
      'error',
      {
        version: '>=12.0.0',
        ignores: [],
      },
    ],
    'node/no-unsupported-features/es-builtins': [
      'error',
      {
        version: '>=12.0.0',
        ignores: [],
      },
    ],
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=12.0.0',
        ignores: [],
      },
    ],
  },
  env: {
    mocha: true,
  },
  extends: [
    'standard',
    'prettier',
    'plugin:promise/recommended',
    'plugin:node/recommended',
    'plugin:mocha/recommended',
  ],
}

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0, // Conflicting with prettier
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', { 'afterColon': true }],
    'semi': 'error',
    'quotes': ['error', 'single'],
    'max-len': ['error', 80, {
      "ignoreComments": true,
      "ignoreStrings": true
    }],
  }
};

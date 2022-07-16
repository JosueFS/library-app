module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/prettier'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
      },
    ],
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'quotes': ['error', 'single'],
    // we want to force semicolons
    'semi': ['error', 'always'],
    // we use 2 spaces to indent our code
    'indent': ['error', 2],
    // we want to avoid extraneous spaces
    'no-multi-spaces': ['error'],
    //linebreak each 80 characters
    "max-len": ["error", {
      "code": 80
    }]
  }
}

// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    // 'airbnb-base',
    'plugin:vue/recommended',
    // 'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'prettier/prettier': 2,
    'import/no-unresolved': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 0,
    'no-shadow': 0, // allows to declare vars with same name in different scope
    'no-param-reassign': 0, // allows to change params value, makes stores a LOT simpler
    // allow async-await
    // 'generator-star-spacing': 'off',
    // 'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}

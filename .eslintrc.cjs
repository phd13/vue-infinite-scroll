module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['vue'],
};

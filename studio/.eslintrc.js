module.exports = {
  extends: ['@meteora-invent/config/eslint/node'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  root: true,
};

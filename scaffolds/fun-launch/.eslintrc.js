module.exports = {
  extends: ['@meteora-invent/config-eslint/next'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  root: true,
};

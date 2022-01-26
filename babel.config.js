module.exports = {
  presets: [
    [ '@babel/preset-env', { targets: { node: 'current' } } ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          Cache: './src/cache',
          Exceptions: './src/exceptions',
          Contracts: './src/contracts',
          Misc: './src/misc',
          Storage: './src/storage',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    [ '@babel/plugin-proposal-decorators', { legacy: true } ],
    [ '@babel/plugin-proposal-class-properties', { loose: true } ],
  ],
};

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mf-lol',
  filename: 'remoteEntry.js',
  exposes: {
    './JunglersPage': './src/app/presentation/pages/junglers/junglers.page.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

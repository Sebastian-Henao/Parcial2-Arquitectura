const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'Client-Host-Angular',
  remotes: {
    'mf-lol': 'http://localhost:4004/remoteEntry.js',
    'mf-misiones': 'http://localhost:4003/remoteEntry.js',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

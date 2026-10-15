const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mf-misiones',
  filename: 'remoteEntry.js',
  exposes: {
    './PaginaCentralMisiones': './src/app/presentation/pages/central-misiones/central-misiones.page.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

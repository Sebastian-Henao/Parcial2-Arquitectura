const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mf-misiones',
  filename: 'remoteEntry.js',
  exposes: {
    './PaginaCentralMisiones': './src/app/presentacion/paginas/central-misiones/central-misiones.pagina.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-personajes',
  filename: "remoteEntry.js",
  exposes: {
    './PersonajesPage': './src/app/presentation/pages/personajes.page'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

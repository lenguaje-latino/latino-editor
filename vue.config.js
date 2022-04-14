const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  },

  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      contextIsolation: false,
      externals: ['node-pty'], // this excludes the node-pty from the front end
      builderOptions: {
        productName: 'LatinoEditor',

        extraFiles: [
          {
            from: 'resources/${os}',
            to: 'Resources/bin',
            filter: ['**/*'],
          },
          {
            from: 'resources/latino.tmLanguage.json',
            to: 'Resources/latino.tmLanguage.json',
          },
        ],

        win: {
          target: ['portable', 'nsis'],
        },

        linux: {
          target: ['AppImage', 'snap', 'deb'],
        },
      },
    },
  },

  chainWebpack: (config) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: [],
      },
    ]);
  },

  transpileDependencies: ['vuetify'],
};

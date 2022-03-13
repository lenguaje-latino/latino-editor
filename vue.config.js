const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['node-pty'], // this excludes the node-pty from the front end
    },
  },

  chainWebpack: (config) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: ['javascript'],
      },
    ]);
  },
};

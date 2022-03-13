const { defineConfig } = require('@vue/cli-service');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = defineConfig({
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['node-pty'], // this excludes the node-pty from the front end
    },
  },

  transpileDependencies: true,

  chainWebpack: (config) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: ['javascript'],
      },
    ]);
  },
});

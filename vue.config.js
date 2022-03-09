const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['node-pty'] // this excludes the node-pty from the front end
    },
  },

  transpileDependencies: true,
})

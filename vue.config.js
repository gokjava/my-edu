// const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      })
    ]
  },
  // devServer: {
  //   https: {
  //     key: './server.key',
  //     cert: './server.crt'
  //   },
  //   port: 8080,
  // }
}

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'src/index.js')],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    hot: true,
    inline: true,
    port: 5000,
    proxy: { // Proxy only needed in development
      '/api': {
         target: {
            host: "localhost",
            protocol: 'http:',
            port: 3000
         }
      }
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  }
}

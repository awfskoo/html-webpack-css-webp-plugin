const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackCssWebpPlugin = require('../');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    // publicPath: '//baidud.com/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.(svg|png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackCssWebpPlugin({
      postfix: 'x-oss-process=image/format,webp'
    })
  ]
}
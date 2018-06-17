var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


var config = {
  devtool: 'eval',

  entry: [
    './src/app',
    'webpack-hot-middleware/client'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/'
  },

  resolve: {
    extensions: ['.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // "process.env": {
      //   BROWSER: JSON.stringify(true)
      // }
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name].css"),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        include: [path.join(__dirname, 'src')],
        exclude:path.resolve(__dirname, 'node_modules/')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpg|png|svg|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(ttf|eot|svg|gif)(\?[\s\S]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]?',
      },
      { 
        test: /\.scss$/, 
        loaders: ['style', 'css', 'postcss', 'sass'],
      },
      { 
        test: /bootstrap\/dist\/js\/umd\//, 
        loader: 'imports?jQuery=jquery' 
      }
    ]
  }
}

module.exports = config
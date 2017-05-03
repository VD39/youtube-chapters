const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

const config = {
  context: path.resolve(__dirname, 'app'),
  entry: path.join(__dirname, '/app/index'),
  output: {
    path: path.join(__dirname, '/dist/'),
    library: 'YTC',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'js/youtube-chapters.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '/public/')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=1000000'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/youtube-chapters.css'),
    new webpack.BannerPlugin({
      banner: `/*!\n * ${pkg.name}\n * ${pkg.title}\n * ${pkg.url}\n * @author ${pkg.author}\n * @version ${pkg.version}\n * Copyright ${pkg.copyright}. ${pkg.license} licensed.\n */\n`,
      raw: true,
      test: /\.js$/,
    })
  ],
  watch: false
};

module.exports = config;

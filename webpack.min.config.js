const config = require('./webpack.config');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

config.output.filename = 'js/youtube-chapters.min.js';
config.plugins = [];
config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    minimize: true
  }),
  new ExtractTextPlugin('css/youtube-chapters.min.css'),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.BannerPlugin({
    banner: `/*!\n * ${pkg.name}\n * ${pkg.title}\n * ${pkg.url}\n * @author ${pkg.author}\n * @version ${pkg.version}\n * Copyright ${pkg.copyright}. ${pkg.license} licensed.\n */\n`,
    raw: true,
    test: /\.js$/,
  })
);

module.exports = config;

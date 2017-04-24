const config = require('./webpack.config')
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

config.output.filename = 'js/youtube-chapters.min.js';
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        minimize: true
    }),
    new ExtractTextPlugin('css/youtube-chapters.min.css'),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
);

module.exports = config;
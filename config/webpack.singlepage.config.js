const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const metaData = require('../meta_data');

const config = {
  devtool : 'eval-source-map',
  entry: {
    'main' : `${metaData.SRC}/main.js`,
    'vendor' : ['jquery', 'bootstrap'],
  },
  output: {
    path : metaData.DIST,
    filename: 'js/[name].js'
  },
  module: {
    // 配置匹配规则
    rules: [
        // { test: /\.css$/, loader: 'style-loader!css-loader'},
        { test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})},
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
        { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
        {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        {test: /\.vue$/, loader: 'vue-loader'}
    ],
    // 配置 loaders
    loaders : [
    ]
  },
  // 配置插件
  plugins : [
        new HtmlWebpackPlugin({
            filename : path.join(metaData.DIST, 'index.html'),
            template : path.join(metaData.ROOT, 'index.html'),
            inject : 'body'
        }),
      /*引入jquery*/
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      }),
      /*将入口文件中引入的 css 文件单独抽取为文件*/
      new ExtractTextPlugin("styles.css"),
      /*提取公共 js 文件*/
      new CommonsChunkPlugin({
          name: 'vendor',
          minChunks: Infinity
      })
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
};

module.exports = config;

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
    'vendor' : ['bootstrap', 'jquery', 'ztree', 'toastr'],
  },
  output: {
    path : metaData.DIST,
    filename: 'util/[name].js',
    publicPath : '/dist/'
  },
  module: {
    // 配置匹配规则
    loaders: [
        // { test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        {test: /\.vue$/, loader: 'vue-loader'},
        { test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: "style-loader", use: 'css-loader'})},
        {test: /\.(gif|jpg|png)\??.*$/, loader: 'url-loader?limit=1024'},
        {test: /\.(eot|svg|ttf|woff|woff2)\w*/, loader: 'url-loader?limit=1000000'}
    ]
  },
  // 配置插件
  plugins : [
        new HtmlWebpackPlugin({
            filename : path.join(metaData.DIST, 'index.html'),
            template : path.join(metaData.ROOT, 'index.html'),
            inject : 'body',
            favicon : path.join(metaData.ROOT, 'src/assets/imgs/favicon.ico'),
            minify: {
                caseSensitive: false,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            }
        }),
      /*引入jquery*/
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          Toastr : 'toastr',
          Vue : 'vue'
      }),
      /*将入口文件中引入的 css 文件单独抽取为文件*/
      new ExtractTextPlugin("styles.css"),
      /*提取公共 util 文件*/
      new CommonsChunkPlugin({
          name: 'vendor',
          minChunks: Infinity
      })
    ],
  resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue',
            'config_c' : path.join(metaData.ROOT, './src/config'), // 全局配置文件
            'axios_c' : path.join(metaData.ROOT, './src/axios'), // axios 配置文件
            'mock_c' : path.join(metaData.ROOT, './src/mock'), // mock 配置文件
            '~imgs' : path.join(metaData.ROOT, './src/assets/imgs')
        }
    },
};

module.exports = config;

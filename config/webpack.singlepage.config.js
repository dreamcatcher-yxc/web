const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const metaData = require('../meta_data');


const config = {
  devtool : 'eval-source-map',
  entry: {
    'main' : `${metaData.SRC}/main.js`
  },
  output: {
    path : metaData.DIST,
    filename: 'js/[name].js'
  },
  module: {
    // 配置匹配规则
    rules: [
        { test: /\.css$/, loader: 'style-loader!css-loader'},
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
        { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
        {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        {test: /\.vue$/, loader: 'vue-loader'}
    ],
    // 配置 loaders
    loaders : [
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
        { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  // 配置插件
  plugins : [
        new HtmlWebpackPlugin({
            filename : path.join(metaData.DIST, 'index.html'),
            template : path.join(metaData.ROOT, 'index.html'),
            inject : 'body'
        })
  ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            'bootstrap-css' : 'src/assets/bootstrap/css/bootstrap.min.css'
        }
    },
};

module.exports = config;

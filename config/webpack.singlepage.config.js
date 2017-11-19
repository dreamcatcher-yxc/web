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
          {
            test: /\.css$/,
            /**
             *  Loaders can be chained by passing multiple loaders, which will be applied from right to left (last to first configured).
             *  加载程序可以通过传递多个加载程序来进行链接，这将从右向左应用（最后一次配置到第一个）。
             * */
            use: [
              { loader: 'styles-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              }
            ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          },
          {
              test: /\.vue$/,
              loader: 'vue-loader'
          }
    ],
    // 配置 loaders
    loaders : [
      {
          test : /\.js$/,
          loader : 'babel'
      }
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
            'vue': 'vue/dist/vue.js'
        }
    },
};

module.exports = config;

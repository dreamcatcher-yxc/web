const path = require('path');
const htmlFileMapArr = require('./html-config').fileMapArr;
const rp = (tp) => path.resolve(__dirname, `../${tp}`);
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const [source_path, dist_path]= [rp('src'), rp('dist')];

console.log("DIR_NAME: " + source_path);

const htmlWebPackPlugins = htmlFileMapArr.map((ele) => {
  return new HtmlWebpackPlugin(ele);
});


const config = {
  devtool : 'eval-source-map',
  entry: {
    'main' : `${source_path}/js/main.js`,
    'importTest' : `${source_path}/js/importTest.js`
  },
  output: {
    path : dist_path,
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
              { loader: 'style-loader' },
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
          }
    ]
    // 配置 loaders
    ,loaders : [
      {
        test : /\.js$/
        ,loader : 'babel'
        // 配置见 .babelrc
        // ,query : {
        //     "presets": [
        //       "env",
        //       "latest",
        //       "react",
        //       "stage-2"
        //     ],
        //     "plugins": []
        // }
      }
    ]
  }
  // 配置插件
  , plugins : [
        ...htmlWebPackPlugins
    // new CompressionPlugin({
    //   test: /\.js/,
    //   asset: '[path].gz[query]', // 默认值
    //   filename (asset) {
    //     console.log(asset);
    //     return asset;
    //   },
    //   algorithm: 'gzip', // 压缩算法
    //   threshold: 0, // 资源超过多少 bytes 才执行压缩.
    //   minRatio : 0.8, // 默认值
    //   deleteOriginalAssets : false // 删除原有资源, 默认为 false
    // })
  ]
};

module.exports = config;

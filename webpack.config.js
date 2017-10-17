const path = require('path');
const src = path.resolve(__dirname, 'src');
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  entry: {
    'main' : src + '/js/main.js',
    'importTest' : src + '/js/importTest.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    // 配置匹配规则
    rules: [
      {
        test: /\.css$/,
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
    new CompressionPlugin({
      test: /\.js/,
      asset: '[path].gz[query]', // 默认值
      filename (asset) {
        console.log(asset);
        return asset;
      },
      algorithm: 'gzip', // 压缩算法
      threshold: 0, // 资源超过多少 bytes 才执行压缩.
      minRatio : 0.8, // 默认值
      deleteOriginalAssets : false // 删除原有资源, 默认为 false
    })
  ]
};

module.exports = config;

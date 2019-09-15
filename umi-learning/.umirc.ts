import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: 'umi-learning',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],

  /**
   *  component 路径相对从 src/pages 目录开始
   *  Routes 路径相对于 根路径
   */
  routes : [
    { path: '/', component: './index' },
    { path: '/users', component: './users/index', Routes: ['./routes/PrivateRoute.tsx'],
      routes: [
        { path: '/users/:id', component: './users/$id' },
        { path: '/users/detail', component: './users/detail' }
      ]
    },
  ]
}

export default config;

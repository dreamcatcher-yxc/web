import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
  dynamicImport: {},
  /**
   *  component 路径相对从 src/pages 目录开始
   *  Routes 路径相对于 根路径
   */
  routes : [
    { path: '/', component: './index', title: '首页' },
    { path: '/index2', component: '@/layouts/adminLayout.jsx', title: '首页2' },
    {
      path: '/users',
      component: './users/index',
      title: '用户首页',
      routes: [
        { path: '/users/:id', component: './users/$id' },
        { path: '/users/detail', component: './users/detail' }
      ]
    },
  ]
});

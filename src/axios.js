import Vue from 'vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import {mockBasePath} from './config';

// 配置
const axios = Axios.create({
    baseURL: mockBasePath,
    timeout: 1000,
});

// 拦截请求
axios.interceptors.request.use(function (config) {
    Toastr.success('开始加载服务器数据...');
    return config;
}, function (error) {
    Toastr.error('请求服务器数据出错...');
    return Promise.reject(error);
});

// 拦截响应
axios.interceptors.response.use(function (response) {
    Toastr.success('接收到服务器响应数据...');
    return response;
}, function (error) {
    Toastr.error('接收服务器响应数据出错...');
    console.log(error);
    return Promise.reject(error);
});

Vue.use(VueAxios, axios);
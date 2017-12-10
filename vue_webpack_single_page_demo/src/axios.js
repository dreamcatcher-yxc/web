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
    // Toastr.success('开始加载服务器数据...');
    if(config.data === undefined || config.data == null) {
        config.data = {};
    }
    return config;
}, function (error) {
    Toastr.error('请求服务器数据出错...');
    return Promise.reject(error);
});

// 拦截响应
axios.interceptors.response.use(function (response) {
    response.isOk = function() {
        return this.data.code == 1;
    };
    response.msg = function() {
        return this.data.message || '';
    };
    response.getAttr = function(attr) {
        let body = this.data.body || {};
        // console.log(body[attr] || '');
        return body[attr] || '';
    }
    // Toastr.success('接收到服务器响应数据...');
    // console.log(response);
    return response;
}, function (error) {
    Toastr.error('接收服务器响应数据出错...');
    console.log(error);
    return Promise.reject(error);
});

Vue.use(VueAxios, axios);
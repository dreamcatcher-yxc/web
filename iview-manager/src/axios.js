import Vue from 'vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import _ from 'underscore';
import config from './config/config';

// 配置
const axios = Axios.create({
    // baseURL: config.axiosBaseUrl,
    baseURL: '/admin',
    timeout: 1000,
    withCredentials: true // 允许携带 cookie
});

/**
 * 将深层对象转换为浅层对象，例如:
 * @example {a : {b : {c : 'val1'}}, d : 'val2'} => {'a.b.c' : 'val1', 'd' : 'val2'}
 * @param dist
 * @param source
 * @param parentKey
 */
function obj2KV(dist, source, parentKey) {
    for(var key in source) {
        var val = source[key];
        var genKey = !!parentKey ? parentKey + '.' + key : key;
        if(typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]') {
            obj2KV(dist, val, genKey);
        } else if(typeof val === 'object' && Object.prototype.toString.call(val) == '[object Array]') {
            dist[genKey] = val.join(','); // 数组以逗号分隔
        } else if(!!val){
            dist[genKey] = val;
        }
    }
}

// 拦截请求
axios.interceptors.request.use(function (config) {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    if(_.indexOf(['post', 'put', 'delete'], config.method) >= 0) {
        try {
            if(typeof config.data === 'object' && Object.prototype.toString.call(config.data) == '[object Object]') {
                var newData = {};
                obj2KV(newData, config.data);
                var arr = [];
                for(var key in newData) {
                    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(newData[key]));
                }
                config.data = arr.join('&');
            }
        } catch (e) {
            console.warn('请求数据转换转换失败...');
        }
    }
    return config;
}, function (error) {
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
        return body[attr] == undefined || body[attr] == null ? '' : body[attr];
    }
    return response;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});

Vue.use(VueAxios, axios);
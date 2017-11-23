import Vue from 'vue';
import {router} from './router';
import store from  './store';
import App from './app.vue';
import 'mock_c';
import axios from 'axios_c';

import 'ztree/css/zTreeStyle/zTreeStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.css';

new Vue({
    router, // 将路由配置到全局环境下
    store, // 将状态配置到全局环境下
    data : {
    },
    methods : {
    },
    render : h => h(App)
}).$mount('#app');

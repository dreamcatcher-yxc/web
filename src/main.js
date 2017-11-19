import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterConfig from './router';
import App from './app.vue';
import Vuex from 'vuex';
// import 'ztree';
import 'ztree/css/zTreeStyle/zTreeStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter); // 路由
Vue.use(Vuex); // 状态管理
const router = new VueRouter({routes : RouterConfig.routes});
const store = new Vuex.Store({
    state: {
        paths : RouterConfig.paths
    },
    mutations: {

    }
})

new Vue({
    router, // 将路由配置到全局环境下
    store, // 将状态配置到全局环境下
    data : {
    },
    render : h => h(App)
}).$mount('#app');

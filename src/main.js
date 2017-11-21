import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterConfig from './router';
import App from './app.vue';
import Vuex from 'vuex';
import MENU_ARR from './js/menu';
// import 'ztree';
import 'ztree/css/zTreeStyle/zTreeStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.css';


Vue.use(VueRouter); // 路由
Vue.use(Vuex); // 状态管理
const router = new VueRouter({routes : RouterConfig.routes});
const store = new Vuex.Store({
    state: {
        paths : RouterConfig.paths,
        menuArr : MENU_ARR
    },
    mutations: {

    }
});
// 配置消息提示插件
Toastr.options = {
    closeButton: false,
    debug: false,
    progressBar: true,
    positionClass: "toast-bottom-right",
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
};

new Vue({
    router, // 将路由配置到全局环境下
    store, // 将状态配置到全局环境下
    data : {
    },
    render : h => h(App)
}).$mount('#app');

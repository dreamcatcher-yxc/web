import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Store from './store';
import Util from './libs/util';
import App from './app';
import './api-simulation';
import './axios';
import 'iview/dist/styles/iview.css';
import 'vue2-animate/dist/vue2-animate.css';

// 使用路由
Vue.use(VueRouter);
// 使用 iView
Vue.use(iView);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    Vue.axios
        .post('/islogin')
        .then(r => {
            if(r.isOk()) {// 用户已经登陆
                // 获取用户信息
                var userInfo = r.getAttr('user');
                Store.commit('setUserInfo', userInfo);
                if(to.fullPath === '/views/login') { // 路由到登陆界面，判断是否登陆，如果已经登陆，则直接跳转到主页。
                    next({path : '/views'});
                } else {
                    next();
                }
            } else { // 用户未登陆
                Store.commit('setUserInfo', {});
                if(to.fullPath !== '/views/login') { // 用户访问的路径不是登录界面，跳转到登录界面。
                    next({path : '/views/login'});
                } else {
                    next(); // 直接放行。
                }
            }
        })
        .catch(r => { // 出现异常情况永远只允许访问登录界面
            Store.commit('setUserInfo', {});
            if(to.fullPath !== '/views/login') { // 用户访问的路径不是登录界面，跳转到登录界面。
                next({path : '/views/login'});
            } else {
                next(); // 直接放行。
            }
        });
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    store : Store,
    render: h => h(App)
});

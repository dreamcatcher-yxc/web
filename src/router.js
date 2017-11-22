import Vue from 'vue';
import VueRouter from 'vue-router';
import store from  './store';

Vue.use(VueRouter);

const routes = [
    {
        path : '/',
        component : resolve => require(['./views/index.vue'], resolve),
        children : [
            {
                path : '',
                component: resolve => require(['./views/default.vue'], resolve)
            },
            {
                path: '/base/table',
                component: resolve => require(['./views/base/table.vue'], resolve)
            },
            {
                path: '/base/form',
                component:  resolve => require(['./views/base/form.vue'], resolve)
            }
        ]
    },
    {
        path : '/login',
        component : resolve => require(['./views/login.vue'], resolve)
    }
];

var router = new VueRouter({routes});

// 每次路由改变的时候都判断用户状态是否有效, 如果有效, 则正常访问, 否则路由到登录页面.
router.beforeEach((to, from, next) => {
    if(to.fullPath == '/login' && !store.state.isLogin) {
        next();
        return;
    }

    store.commit('validateIsLogin');
    if(!store.state.isLogin) {
        next({
            path : '/login'
        });
    } else {
        next()
    }
});

var tPaths = routes.map(router => {
    return router.customPath || router.path || router.name;
}).filter(path => {
    return path !== undefined;
});

let convert = (source, target) => {
    for(let t of source) {
        if((typeof t) != 'string') {
            convert(t, target);
        } else {
            target.push(t);
        }
    }
};
var paths = [];
convert(tPaths, paths);

export {
    router,
    paths
};
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
    // console.log('on router beforeEach...');
    let isAuth = store.state.isAuth;
    if(!isAuth) {
        if(to.fullPath == '/login') {
            next();
        } else {
            next({path : '/login'});
        }
    } else {
        // 每次路由改变的是否如果以前有授权, 则再检验一次有无授权.
        Vue.axios.post('/auth', {
            uuid : store.state.userInfo != null ? store.state.userInfo.uuid : undefined
        }).then(r => {
            if(r.isOk()) {
                if(to.fullPath != '/login') {
                    next();
                } else {
                    next({path : '/'});
                }
            } else {
                store.commit('notAuth');
                next({path : '/login'});
            }
        }).catch(r => {
            store.commit('notAuth');
            next({path : '/login'});
        });
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
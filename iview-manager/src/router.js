const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        redirect : '/views/login'
    },
    {
        path : '/views/login',
        meta : {
            title : '登陆',
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path : '/views',
        meta : {
            title : '管理系统布局',
        },
        component: (resolve) => require(['./views/admin.vue'], resolve),
        children : [
            {
                path : 'user',
                component: (resolve) => require(['./views/system/user/list.vue'], resolve)
            },
            {
                path : 'user/add',
                component: (resolve) => require(['./views/system/user/add.vue'], resolve)
            },
            {
                path : 'user/edit/:id',
                component: (resolve) => require(['./views/system/user/edit.vue'], resolve)
            }
        ]
    }
];

export default routers;

const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path : '/grid',
        meta : {
            title : '栅格测试',
        },
        component: (resolve) => require(['./views/grid.vue'], resolve)
    },
    {
        path : '/admin',
        meta : {
            title : '管理系统布局',
        },
        component: (resolve) => require(['./views/admin_layout.vue'], resolve)
    }
];

export default routers;

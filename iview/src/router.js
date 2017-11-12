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
            title : '栅格测试页面',
        },
        component: (resolve) => require(['./views/grid.vue'], resolve)
    }
];
export default routers;
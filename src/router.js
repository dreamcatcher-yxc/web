const routes = [
    {
        path: '/',
        component:  resolve => require(['./views/index.vue'], resolve)
    },
    {
        path: '/home2',
        component:  { template: '<div>home2</div>' }
    }
];

var paths = routes.map(router => {
    return router.path || router.name;
}).filter(path => {
    return path !== undefined;
});

export default {
    routes,
    paths
};
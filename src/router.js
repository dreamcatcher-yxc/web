const routes = [
    {
        path : '/',
        redirect : '/menu',
        component : resolve => require(['./views/index.vue'], resolve)
    },
    {
        path: '/index/:msg',
        customPath : ['/index/this-is-index1.vue', '/index/this-is-index2.vue'],
        component : resolve => require(['./views/index.vue'], resolve)
    },
    {
        path: '/home2',
        component:  { template: '<div>home2</div>' }
    },
    {
        path : '/menu',
        components : {
            "left-menu" : resolve => require(['./views/outlook_menu_style.vue'], resolve)
        }
    },
    {
        path: '/table',
        component: resolve => require(['./views/table.vue'], resolve)
    }
];

var paths = routes.map(router => {
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
var exportPaths = [];
convert(paths, exportPaths);

export default {
    routes,
    paths : exportPaths
};
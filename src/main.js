import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterConfig from './router';
import App from './app.vue';

Vue.use(VueRouter);
const router = new VueRouter({routes : RouterConfig.routes});

new Vue({
    router : router,
    data : {
        paths : RouterConfig.paths
    }
}).$mount('#app');

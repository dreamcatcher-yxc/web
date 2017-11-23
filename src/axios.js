import Vue from 'vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';

// 配置
const axios = Axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
});

Vue.use(VueAxios, axios);

export default axios;
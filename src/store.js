import Vue from 'vue';
import Vuex from 'vuex';
import {paths} from './router';
import {menuArr, userArr, global} from './config';
import {getCookie} from "./util/cookieUtil";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        paths,
        menuArr,
        userInfo : null,
        isAuth : false
    },
    mutations: {
        hasAuth(state, userInfo) {
            state.isAuth = true;
            state.userInfo = userInfo;
        },
        notAuth(state) {
            state.isAuth = false;
            state.userInfo = null;
        }
    }
});

export default store;
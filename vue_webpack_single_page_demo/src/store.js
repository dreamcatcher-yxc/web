import Vue from 'vue';
import Vuex from 'vuex';
import {paths} from './router';
import {menuArr, userArr, global} from './config';
import {setCookie, getCookie, delCookie} from "./util/cookieUtil";
const localUserInfoCookieId = 'session';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        paths,
        menuArr,
        userInfo : null,
        isAuth : true
    },
    mutations: {
        init(state) {
            state.userInfo = JSON.parse(getCookie(localUserInfoCookieId) || '{}');
        },
        hasAuth(state, userInfo) {
            state.isAuth = true;
            state.userInfo = userInfo;
            setCookie(localUserInfoCookieId, JSON.stringify(state.userInfo), 7);
        },
        notAuth(state) {
            state.isAuth = false;
            state.userInfo = null;
            delCookie(localUserInfoCookieId);
        }
    }
});

store.commit('init');

export default store;
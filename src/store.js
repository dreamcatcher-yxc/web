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
        userArr,
        isLogin : true,
        userInfo : null
    },
    mutations: {
        validateIsLogin() {
            let session = getCookie(global.userKey);
            if(session == null) {
                this.state.isLogin = false;
                this.state.userInfo = null;
            } else {
                let userInfo = JSON.parse(session);
                userInfo.password = undefined;
                this.state.isLogin = true;
                this.state.userInfo = userInfo;
            }
        }
    }
});

export default store;
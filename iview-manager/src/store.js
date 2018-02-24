import Vue from 'vue';
import Vuex from 'vuex';
const localUserInfoCookieId = 'session';

Vue.use(Vuex);

var menus = [
    {
        text : '导航',
        iconClass : 'navigate',
        url : ''
    },
    {
        text : '系统管理',
        iconClass : 'person-stalker',
        subMenus : [
            {
                text : '用户管理',
                iconClass : '',
                url : '/views/user'
            },
            {
                text : '角色管理',
                iconClass : '',
                url : ''
            },
            {
                text : '权限管理',
                iconClass : '',
                url : ''
            },
        ]}
];

const store = new Vuex.Store({
    state: {
        menus,
        userInfo : null,
        isAuth : true
    },
    mutations: {
        init(state) {
            state.userInfo = JSON.parse(localStorage.getItem(localUserInfoCookieId) || '{}');
        },
        setUserInfo(state, userInfo) {
            state.isAuth = true;
            state.userInfo = userInfo;
            localStorage.setItem(localUserInfoCookieId, JSON.stringify(state.userInfo));
        }
    }
});

store.commit('init');

export default store;
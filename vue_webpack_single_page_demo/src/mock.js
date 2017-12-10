/**
* 配置前端服务器.
* */
import Mock from './util/mock';
import {mockBasePath, userArr} from 'config_c';

const addGetMock = (path, handler) => {
    let fullPath = `${mockBasePath}${path}`;
    Mock.mock(fullPath, 'get', handler);
};

const addPostMock = (path, handler) => {
    let fullPath = `${mockBasePath}${path}`;
    Mock.mock(fullPath, 'post', handler);
};

let checkNumber = '';

let loginUserInfoArr = [];
let storageKey = 'hibernateLoginUserInfoArrKey';
let loginUserInfoArrJson = localStorage.getItem(storageKey) || '[]';
loginUserInfoArr = JSON.parse(loginUserInfoArrJson);

/**
 * 判断用户是否登录
 * @param: uuid 标记用户在服务器上是否登录的唯一 id.
 * */
addPostMock('/auth', options => {
    let body = JSON.parse(options.body);
    let uuid = body.uuid;
    for (let info of loginUserInfoArr) {
        if(info.uuid == uuid) {
            return {code : 1, message : '登录状态有效'};
        }
    }
    return {code : 2, message : '未登录或者已经失效'};
});

/*模拟登录*/
addPostMock('/login', options => {
    let body = JSON.parse(options.body);
    let username = body.username;
    let password = body.password;
    for (let user of userArr) {
        if(user.username == username && user.password == password) {
            let uuid = `${new Date().getTime()}${Math.ceil(Math.random() * 1000000)}`;
            let expireTime = new Date().getTime() + 30 * 60 * 1000;
            let userInfo = {uuid, username};
            loginUserInfoArr.push({uuid, expireTime});
            return {code : 1, message : '登录成功', body : { userInfo }};
        }
    }
    return {code : 2, message : '用户名或者密码错误'};
    // let checkCode = options.body.checkCode || '';
    // if(checkCode == '' || checkCode != checkCode) {
    //     return {code : 2, message : '验证码错误'};
    // } else {
    // }
});

/*注销当前用户的登录状态*/
addPostMock('/logout', options => {
    let body = JSON.parse(options.body);
    let uuid = body.uuid;
    let needRemoveIndex = -1;
    for(let i = 0; i < loginUserInfoArr.length; i++) {
        if(loginUserInfoArr[i].uuid == uuid) {
            needRemoveIndex = i;
            break;
        }
    }
    if(needRemoveIndex >= 0) {
        loginUserInfoArr.splice(needRemoveIndex, 1);
        return {code : 1, message : '注销成功'};
    } else {
        return {code : 2, message : '注销失败'};
    }
})

/*产生随机验证码*/
addPostMock('/checkCode', options => {
    let randNumArr = [];
    for(var i = 0; i < 4; i++) {
        randNumArr.push(Math.ceil(Math.random() * 10));
    }
    checkNumber = randNumArr.join('');
    let pic = Mock.Random.image('100x34', '#99CCFF', '#FFFFFF', 'png', randNumArr.join(' '));
    return {
        code : 1,
        message : 'ok',
        body : {
            pic
        }
    }
});

/*产生10张轮播图地址*/
addPostMock('/pics', options => {
    let numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let len = numArr.length;
    let randNumArr = [];
    for(let i = 0; i < len; i++) {
        let ti = Math.floor(Math.random() * numArr.length);
        randNumArr.push(numArr[ti]);
        numArr.splice(ti, 1);
    }
    let pics = randNumArr.map(rangNum => Mock.Random.image('1540x790', '#FFFFFF', 'png', rangNum));
    return {
        code : 1,
        message : 'ok',
        body : {
            pics
        }
    };
});

// let img1 = Mock.Random.image('200x100', '#99CCFF', '#FFFFFF', 'png', '!');
// console.error(img1);

/*表格数据*/
addPostMock('/list', options => {
    let body = JSON.parse(options.body);
    let page = body.page;
    let row = body.row;
    let count = 1000;
    let totalPage = Math.ceil(count / row);
    let obj = {rows : []};
    if(page <= totalPage) {
        obj = Mock.mock({
            ['rows|' + row] : [{
                'id|+1' : (page - 1) * row + 1,
                'username' : '@cname',
                'email|' : '@email',
                'gender|1' : ['男', '女'],
                'age|20-40' : 0,
            }]
        });
    }
    return {
        code : 1,
        message : 'success',
        body : {
            rows : obj.rows,
            count : count
        }
    };
});

setInterval(() => {
    let time = new Date().getTime();
    let tArr = [];
    for (let i = 0; i < loginUserInfoArr.length; i++) {
        if(loginUserInfoArr[i].expireTime < time) {
            tArr.push(i);
        }
    }
    tArr.reduce((pv, cv) => {
        loginUserInfoArr.splice(cv, 1);
    }, 0);
    // console.log(loginUserInfoArr);
    // console.log(JSON.stringify(loginUserInfoArr));
    localStorage.setItem(storageKey, JSON.stringify(loginUserInfoArr));
}, 1000);



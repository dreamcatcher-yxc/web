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

/**
 * 判断用户是否登录
 * @param: uuid 标记用户在服务器上是否登录的唯一 id.
 * */
addPostMock('/auth', options => {
    let uuid = options.body.uuid;
    return {code : 2, message : '未登录或者已经失效'};
});

/*模拟登录*/
addPostMock('/login', options => {
    let username = options.body.username;
    let password = options.body.password;
    let checkCode = options.body.checkCode || '';
    if(checkCode == '' || checkCode != checkCode) {
        return {code : 2, message : '验证码错误'};
    } else {
        for (let user of userArr) {
            if(user.username == username && password == password) {
                return {code : 1, message : '登录成功'};
            }
        }
        return {code : 2, message : '用户名或者密码错误'};
    }
});

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





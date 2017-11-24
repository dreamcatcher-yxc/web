/**
* 配置前端服务器.
* */
import Mock from './util/mock';
import {mockBasePath} from 'config_c';

const addPostMock = (path, handler) => {
    let fullPath = `${mockBasePath}${path}`;
    Mock.mock(fullPath, 'post', handler);
};

addPostMock('/list', function(options) {
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





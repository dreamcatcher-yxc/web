/**
 * 产生模拟 API 接口。
 * */
import Mock from './libs/mock';
import config from './config/config'

const addGetMock = (path, handler) => {
    let fullPath = `${config.mockBaseUrl}${path}`;
    Mock.mock(fullPath, 'get', handler);
};

const addPostMock = (path, handler) => {
    let fullPath = `${config.mockBaseUrl}${path}`;
    Mock.mock(fullPath, 'post', handler);
};

/**
 * 表格数据
 * */
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
                'gender|1' : ['0', '1'],
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
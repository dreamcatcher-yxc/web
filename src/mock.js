/**
* 配置前端虚拟请求.
* */
import Mock from './util/mock';
import {mockBasePath} from "./config";

const join = path => {`${mockBasePath}${path}`};

var path = join('/list')

Mock.mock(path, 'get', function() {
    let rows = Mock.mock({
        'rows|1-100' : [{
            'id|+1' : 1,
            'username' : '@name',
            'email|' : '@email',
            'gender|1' : ['男', '女'],
            'age|20-40' : 0,
        }]
    });
    return {
        code : 1,
        message : 'success',
        body : {
            rows,
            count : 1000
        }
    };
});


/**
* 配置前端服务器.
* */
import Mock from './util/mock';
import {mockBasePath} from 'config_c';

// const convertRequest = function() {
//     let index = this.url.lastIndexOf('?');
//     let params = {};
//     if(index >= 0 && index != this.url.length - 1) {
//         let paramsStr = this.url.substring(index + 1, this.url.length);
//         paramsStr.split('&').filter((entryStr) => {
//            let tArr = entryStr.split('=');
//            return tArr.length > 0;
//         }).map((entryStr) => {
//             let tArr = entryStr.split('=');
//             return tArr;
//         }).map((entryArr) => {
//             params[entryArr[0]]= entryArr[1 % entryArr.length];
//         });
//     }
//     this.params = params;
// }
//
console.log(mockBasePath);

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


const prompt = (msg = '', num = 20) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

((process) => {
    if(!process) {
        return;
    }
    prompt('读取文件测试');
    var rf=require('fs');
    function callBack(err,data){
        if(err){
            console.log('error');
        }else{
            console.log(data);
        }
    }
    rf.readFile('./file/test.txt','utf-8',callBack);
    console.log('READ FILE ASYNC END');
})(false);

prompt('异步任务的封装');
{
    // var fetch = require('node-fetch');
    // function* gen(){
    //     var url = 'https://api.github.com/users/github';
    //     var result = yield fetch(url);
    //     console.log(result.bio);
    // }
    // console.log(...gen());
    var thunkify = require('thunkify');
    function f(a, b, callback){
        var sum = a + b;
        callback(sum);
        callback(sum);
    }
    var ft = thunkify(f);
    var print = console.log.bind(console);
    ft(1, 2)(print);
}

// 1. Thunk 函数, 参看教程
// 2. Generator 函数的流程化管理以及函数的自动化流程管理.
prompt('Generator 函数的流程化管理');
{
    let gen = function*() {
        let r1 = yield 1 + 1;
        console.log(r1);
        let r2 = yield 2 + 2
        console.log(r2);
        return r2;
    }
    // 手动执行.
    // let g = gen();
    // let t1 = g.next();
    // let t2 = g.next(t1.value);
    // let t3 = g.next(t2.value);
    // console.log(...[t1.value, t2.value, t3.value]);
    // 自动化执行.

}



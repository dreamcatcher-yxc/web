const FS = require('fs');
const readFile = (fileName) => {
    return new Promise((resolve, reject) => {
        FS.readFile(fileName, 'UTF-8', (error, data) => {
            if(error) {
                reject(error)
            } else {
                resolve(data);
            }
        });
    });
}

const prompt = (msg = '', num = 20) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('使用异步执行函数读取多个文件');
{
    // const asyncReadFile = async function() {
    //     let r1 = await readFile('./file/test.txt');
    //     console.log('第一个文件读取完成:');
    //     console.log(r1);
    //     // let r2 = await readFile('./proxyTest.js');
    //     // console.log('第二个文件读取完成:');
    //     // console.log(r2);
    // }
    // asyncReadFile();
}

prompt('async 方法返回的是一个 promise 对象');
{
    // async function foo1() {
    //     return 'hello world!';
    // }
    // foo1().then(v => console.log(v)); // hello world!
    //
    // // await 后面的是一个 Promise 对象, 如果不是则会使用 Promise.resolve 对象.
    // async function foo2() {
    //     return await 123;
    // }
    // foo2().then(v => console.log(v)); // 123
    //
    // async function foo3() {
    //     await Promise.reject('出错了');
    // }
    // foo3()
    //     .then(console.log)
    //     .catch(console.log); // 出错了
    //
    // // 从函数的内部捕获异常.
    // async function foo4() {
    //     // 方式1
    //     // await Promise.reject('出错了').catch(console.log);
    //     // 方式2
    //     try {
    //         await Promise.reject('出错了');
    //     }catch(e) {
    //         console.log('函数内部捕获的错误:' + e);
    //     }
    //     return 'hello world!';
    // }
    // foo4().then(console.log); // hello world!
 }

// await 的使用注意点.
// 1. await 后面的 Promise 如果可能触发 reject, 则最好放在 try...catch 中执行.
// 2. 多个 await 如果不存在继发的关系, 则最好同时触发它们.
// 3. await 只能使用在异步函数中, 不能使用在普通函数中.

 prompt('实例: 按照顺序执行异步操作');
{
    // function logInOrder(randArr) {
    //     // 生成一组 Promise
    //     const randPromises = randArr.map(rand => new Promise((resolve, reject) => resolve(rand ** rand)).then(result => result));
    //     // 使用 Promise 顺序执行每个 Promise
    //     randPromises.reduce((chain, randPromise) => chain.then(() => randPromise).then(console.log), Promise.resolve());
    // }
    // logInOrder([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    // 使用异步函数改写上面的代码.
    // async function logInOrder2(randArr) {
    //     const resultArr = randArr.map(async rand => {
    //         let p = new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 resolve(`${rand} ** ${rand} = ${rand ** rand}`);
    //             }, 1000);
    //         }).then(console.log);
    //         return p;
    //     });
    //     for (let result of resultArr) {
    //         console.log(result);
    //     }
    // }
    // logInOrder2([4, 5, 6]);
}

prompt('异步遍历的接口、for await...of');
{
    // 目前只是一个提案, 参看 阮一峰ES6教程
    // for await...of 是针对异步遍历接口的一个循环结构.
}

prompt('异步 Generator 函数');
{
    // node 8.6.0 环境不支持
    // async function* gen() {
    //     yield 'hello';
    // }
    // gen.next().then(console.log);
    // 参看 阮一峰ES6教程, 不想看了, 以后会用到的时候再来具体研究吧~~~
}





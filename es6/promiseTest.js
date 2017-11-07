// 使用 promise 执行异步任务
//new Promise((resolve, reject)=> {
//  console.log('3 秒之后执行任务...');
//  setTimeout(() => {
//    let randNum = Math.ceil(Math.random() * 10);
//    if(randNum > 5) {
//      resolve('success!!!');
//    } else {
//      reject('failed!!!');
//    }
//  }, 3000);
//}).then(result => {
//  console.log(`then: ${result}`);
//}).catch(result => {
//  console.log(`catch: ${result}`);
//});

// 使用 promise 执行异步任务
//new Promise((resolve, reject)=> {
//    console.log('3 秒之后执行任务...');
//    setTimeout(() => {
//        let randNum = Math.ceil(Math.random() * 10);
//        if(randNum > 5) {
//            resolve('success!!!');
//        } else {
//            reject('failed!!!');
//        }
//    }, 3000);
//}).then(result => {
//        console.log(`then: ${result}`);
//    }, result => {
//        console.log(`catch: ${result}`);
//    });
//

// 多个 Promise 执行任务.
// 在多个 Promise 执行的时候, 判断是否成功是使用且的关系, 如下的返回结果的判断方式为:
// resultIsOK = p1 & p2;
// 也就是说只有当 p1 和 p2 都执行成功的时候 Promise.all 才会执行 then 方法, 否则执行 Promise.all 的 catch 方法.
// 但是如果 p2 在执行的过程中会报错, 但是 p2 提供了 catch 方法处理其抛出的错误, 则在 p1 执行成功的前提下, 会去执行
// Promise.all 的 then 方法, 而不是 catch
//let p1 = new Promise((resolve, reject) => {
//    //throw new Error('p1 出错了...');
//    resolve('1 + 1 = 2');
//});
//let p2 = new Promise((resolve, reject) => {
//    throw new Error('p2 出错了...');
//})
//    .then(r => console.log(r))
//    .catch(r => r);
//
//Promise.all([p1, p2]).then(rs => console.log(rs)).catch(e => console.log('出错: ' + e));

// Promise.race([p1, p2, p3]) 方法, 只要 p1, p2, p3 中有一个'率先'改变了值, 则 p 的状态就会跟着改变, 那个率先改变的
// Promise 的实例的返回值, 就传递给 p 的回调函数.

// Promise.resolve(arg): 能够将现有的对象转换为一个新的 Promise 对象, 相应的还有 Promise.reject 方法, 作用和 Promise 是类似的, 这里不做赘述.
// 具体细节请参看阮雪峰的ES6教程.
Promise.resolve().then(() => console.log('hello world!'));





// 使用 promise 执行异步任务
new Promise((resolve, reject)=> {
  console.log('3 秒之后执行任务...');
  setTimeout(() => {
    let randNum = Math.ceil(Math.random() * 10);
    if(randNum > 5) {
      resolve('success!!!');
    } else {
      reject('failed!!!');
    }
  }, 3000);
}).then(result => {
  console.log(`then: ${result}`);
}).catch(result => {
  console.log(`catch: ${result}`);
});

const prompt = (msg = '', num = 20) => {
  console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('(...) 扩展运算符');
{
  console.log(...[1, 2, 3]); // 1, 2, 3
  console.log(1, ...[2, 3, 4], 5, ...[6, 7]); // 1, 2, 3, 4, 5, 6, 7

  let randArr = [];
  (randArr=>{for(let i = 0; i < 100; i++) randArr.push(parseInt(Math.random() * 9900 + 100))})(randArr);
  // console.log("产生的最大随机数:" + Math.max.apply(null, randArr)); // ES5
  console.log(`产生的最大随机数: ${Math.max(...randArr)}`);
}

prompt('应用, 见: http://es6.ruanyifeng.com/#docs/array');

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
prompt('赋值数组');
{
  let a1 = [1, 2, 3];
  let a2 = [...a1];
  let [...a3] = a1;
  console.log(...a2);
  console.log(...a3);
}

prompt('合并数组');
{
  let a1 = [1, 2, 3];
  let a2 = [4, 5, 6];
  let a3 = [7, 8, 9];
  let a4 = [...a1, ...a2, ...a3];
  console.log(...a4);
}

prompt('解析赋值');
{
  // 必须放在最后使用.
}

prompt('字符串字符的拆分');
{
  let str = 'hello world!';
  console.log(...str);
}

prompt('任何实现了 Iterator 接口的对象, 都可以快速的转换为真正的数组');
{
  // 见 Iterator 接口讲解一章
}

prompt('Map 和 Set 接口, Generator 函数');
{

}

prompt('Array.from 将一个类似于数组的结构转换为真正的数组');
{
    // 类似于数组的结构必须有 length 属性
    let arrLike = {
      '0' : 'a',
      '1' : 'b',
      '2' : 'c',
      'length' : 3
    };
    console.log(...Array.from(arrLike)); // 1, 2, 3
    console.log(...Array.from({length : 3})); // undefined, undefined, undefined
    console.log(...Array.from({length : 3}, x => x ? x : 0)); // 0, 0, 0
}

prompt('Array.of 取代 new Array()');
{
  //
}

prompt('Array.copyWithin()');
{
  let arr = [1, 2, 3, 4, 5];
  let tArr = arr.copyWithin(0, 3, 4);
  console.log(...tArr);
}

prompt('Array.find, findIndex, fill');
{
  let arr = [1, 2, 3, 4];
  // find: 查找数组中第一个符合查找条件的数据.
  console.log(arr.find(x => x > 2)); //3
  // findIndex
  console.log(arr.findIndex((val, index, arr) => val > 2)); // 2
  // fill
  let arr2 = new Array(10).fill(0);
  console.log(...arr2);
  let arr3 = arr2.fill(3, 2, 5);
  console.log(...arr3);
}

prompt('entries, keys, values, includes');
{
    // 了解一下
}

prompt('数组空位的处理(由于空位的处理规则非常不统一，所以建议避免出现空位)');
{
  // 了解
}

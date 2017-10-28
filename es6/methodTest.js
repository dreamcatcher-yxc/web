const prompt = (msg = '', num = 20) => {
  //console.log(msg);
  //console.log(num);
  console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('函数默认值');
{
  function foo(x, y = 'world') {
    console.log(`${x}, ${y}`);
  }
  foo(1, 2);
  foo(1);
}


prompt('对象解析赋值和默认值对应使用');
{
  // function foo({x = [对象解析赋值的默认值], y = [对象解析赋值的默认值]} = [默认值])
  // 设置了对象解析赋值的默认值, 但是默认值是一个空对象
  function foo1({x = 1, y = 2} = {}) {
    console.log(`${x}, ${y}`);
  }

  // 设置了默认值, 但是没有这只对象解析赋值的默认值
  function foo2({x, y} = {x : 1, y : 2}) {
    console.log(`${x}, ${y}`);
  }

  // 之所以出现下面这种结果就是因为如果传递了参数就会使用参数的默认值,
  // 但是会使用对象解析赋值的默认值.
  foo1({x : 3}); // 3, 2
  foo2({x : 3}); // 3, undefined
}

prompt('length 属性');
{
  console.log(((x, y = 1) => {}).length); // 1
  console.log(((x, y, z = 1) => {}).length); // 2
  console.log(((x, y, z) => {}).length); // 3
  console.log(((x, y = 1, z) => {}).length); // 1
  console.log(((x = 1, y, z) => {}).length); // 0
  console.log((function(a) {}).length);  // 1
  console.log((function(...a) {}).length); // 0
  console.log((function(a, ...b) {}).length);  // 1
}

prompt('作用域');
{
  let s = 'outer';
  function foo(func = () => s) {
    let s = 'inner';
    console.log(func());
  }
  foo();
}

prompt('rest 参数');
{
  function sum(...args) {
    let sum = 0;
    for(let arg of args) {
      sum += arg
    }
    // 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 56
    console.log(`${args.join(' + ')} = ${sum}`);
  }
  sum(1, 2, 3, 4, 5, 6, 7, 9, 20, 30, 10);
  // name 属性
  console.log(sum.name);
}

prompt('箭头函数');
{
  let foo1 = (a, b) => a + b;
  console.log((foo1(1, 2)));
  let foo2 = (a, b) => {return a * b};
  console.log(foo2(25, 25));
  // 使用箭头函数简化回调函数的写法.
  let tArr = [1, 2, 3].map(x => x * x);
  console.log(tArr.join(',')); //[1, 4, 9]
}


prompt('函数作用域');
{
    let foo = 'outer';
    function bar(func = () => foo) {
      let foo = 'bar';
      console.log(func()); // outer, 因为此时 foo 指向为函数外部定义的 foo 变量.
    }
    bar();
    // 下面是一个比较复杂的例子
}

prompt('箭头函数需要注意的问题');
// 了解一下
prompt('嵌套的箭头函数');
{
    // ES5
    // function insert(val) {
    //     return {
    //       into : function(arr) {
    //         return {
    //           after : function(afterVal) {
    //             arr.splice(arr.indexOf(afterVal) + 1, 0, val);
    //             return arr;
    //           }
    //         }
    //       }
    //     }
    // }

    // ES6
    let insert = val => ({
      into : arr => ({
          after : afterVal => {
            arr.splice(arr.indexOf(afterVal) + 1, 0, val);
            return arr;
        }
      })
    });
    console.log(insert(2).into([1, 3]).after(1).join(','));
}

prompt('双冒号运算法');
// 提案, 了解一下
prompt('尾调用优化');
// 了解一下.
prompt('尾递归');
{
    // 使用递归实现阶乘, 递归实现, 但是是非为递归, 递归的层次太大的话会出现 StackOverflow 的错误.
    // function factorial(n) {
    //   if(n == 1) return 1;
    //   return n * factorial(n - 1);
    // }
    // console.log(factorial(10000)); // 出错, 栈溢出

    // 下面的方式是尾递归的实现, 因为递归函数的的调用都是函数的最后一行, 而且最后一次调用之后后面没有其他的操作,
    // 所以如下的递归调用无论递归多少层函数调用栈中的调用帧都只有一个, 所以不会出现栈溢出的情况.
    // 前提是该语言的运行环境已经实现了尾调用优化机制, ES6 必须在严格模式下才生效.
    function factorial(n, total) {
      'use strict'
      if( n === 1) return total;
      return factorial(n - 1, n * total);
    }
    // console.log(factorial(10000, 1));
}


prompt('应用', 40);

prompt('1. 维数组设置必须要传递的参数');
{
  function throwIfMissing() {
    throw new Error('Missing parameter');
  }
  function foo(mustParameter = throwIfMissing()) {
    console.log(mustParameter);
  }
  foo(1);
  //foo();
}

prompt('2. 项数组中插入数字');
{
    function appendValsToArr(arr, ...nums) {
      nums.forEach(num => arr.push(num));
    }
    let arr = [1, 2, 3];
    console.log(arr.join(','));
    appendValsToArr(arr, 4, 5, 6);
    console.log(arr.join(','));
}

prompt('严格模式');
{
    // 当函数中使用严格模式的时候需要注意哪些问题, 具体请参看 http://es6.ruanyifeng.com/#docs/function, 讲得很详细
    // 这里只做了解.
    // function doSomtings(a,  b = a) {
    //     'use strict'
    // }

    function strictFunc() {
      'use strict'
      // 严格模式下不允许下面方法的使用.
      // strictFunc.caller;
      // strictFunc.arguments;
    }
    strictFunc();
}

// 了解
prompt('尾递归的实现');
prompt('尾逗号');
prompt('try~catch');

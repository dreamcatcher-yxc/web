const prompt = ([msg = '', num = 20]) => {
  console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt(['函数默认值']);
{
  function foo(x, y = 'world') {
    console.log(`${x}, ${y}`);
  }
  foo(1, 2);
  foo(1);
}


prompt(['对象解析赋值和默认值对应使用']);
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

prompt(['length 属性']);
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

prompt(['作用域']);
{
  let s = 'outer';
  function foo(func = () => s) {
    let s = 'inner';
    console.log(func());
  }
  foo();
}

prompt(['rest 参数']);
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

prompt(['箭头函数']);
{
  let foo1 = (a, b) => a + b;
  console.log((foo1(1, 2)));
  let foo2 = (a, b) => {return a * b};
  console.log(foo2(25, 25));
  // 使用箭头函数简化回调函数的写法.
  let tArr = [1, 2, 3].map(x => x * x);
  console.log(tArr.join(',')); //[1, 4, 9]
}

const prompt = (msg = '', num = 20) => {
  console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('对象变量的简介表示法');
{
  // Object 中属性直接使用已有的变量, 则对象的属性名为变量名, 该属性的值为该变量的值.
  let attr = 'just a test';
  let obj = {attr};
  console.log(obj); // {attr : 'just a test!'}
  // 例子
  const foo = (x, y) => {return {x, y};};
  console.log(foo('aaa', 'bbb')); // {x : 'aaa', y : 'bbb'}
  // 对象中的方法也可以使用如下的简写形式代替.
  // ES5
  // let obj2 = {
  //   method : function() {console.log('hello world!')}
  // }
  // ES6
  let obj2 = {
    method() {
      console.log('hello world!');
    }
  }
  obj2.method(); // hello world!
}

prompt('属性名表达式');
{
  // eg1:
  let obj = {};
  obj['a' + 'bc'] = 'just a test';
  console.log(obj); // {abc : 'just a test'}
  // eg2:
  let obj2 = {
    ['aaa' + 'bbb'] : 'this is a attr',
    ['me' + 'thod']() {
      console.log('this is a method');
    }
  };
  console.log(obj2); // { aaabbb: 'this is a attr', method: [Function: method] }
  // note: 属性名表达式和属性简洁表示不能同时使用.
  // 报错
  // const foo = 'bar';
  // const bar = 'abc';
  // const baz = { [foo] };

  // 正确
  // const foo = 'bar';
  // const baz = { [foo]: 'abc'};
  // 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
  // const keyA = {a: 1};
  // const keyB = {b: 2};
  // const myObject = {
  //   [keyA]: 'valueA',
  //   [keyB]: 'valueB'
  // };
  // myObject // Object {[object Object]: "valueB"}
}

prompt('方法的 name 属性');
{
  // 了解
}

prompt('Object.is 判断两个对象是否相等, 和 === 运算符的使用基本一致');
{
  // 下面就是 Object.is 和 === 运算符行为不一致的地方.
  console.log(NaN === NaN); // false
  console.log(+0 === -0); // true
  console.log(Object.is(NaN, NaN)); // false
  console.log(Object.is(+0, -0)); // true
}

prompt('Object.assign');
{
  
}

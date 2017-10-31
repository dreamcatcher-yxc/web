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

prompt('getter、setter 方法');
{
  const cart = {
    _wheels: 4,

    get wheels () {
        return this._wheels;
    },

    set wheels (value) {
       if (value < this._wheels) {
         throw new Error('数值太小了！');
       }
       this._wheels = value;
    }
  };
  console.log(cart.wheels);
  //cart.wheels = 3; // 报错
}

// Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
prompt('Object.assign');
{
  let t = {a : 1, b : 2};
  let s = {b : 3, c : 4};
  Object.assign(t, s);
  console.log(t);
  // 对象转换
  let tObj = Object.assign(2); // [Number : 2]
  console.log(tObj);
  // undefined 和 null 无法转换为对象.
  //Object.assign(null); // 报错
  //Object.assign(undefined); // 报错

  //let obj = {a: 1};
  //Object.assign(obj, undefined) === obj // true
  //Object.assign(obj, null) === obj // true

  console.log(Object(2)); // [Number : 2]
  console.log(Object(true)); // [Boolean : true]
  console.log(Object('abc')); // [String : 'abc']

  // 注意点:
  // 1. Object.assign 使用的拷贝方式为浅拷贝.
  let obj1 = {a : {b : 1}};
  let obj2 = Object.assign({}, obj1);
  obj1.a.b = 2;
  console.log(obj2.a.b); // 2

  // 2. Object.assign 进行的是同名属性的替换.

  // 3. 数组的处理
  // 相当于以数组的下标为 key 惊醒拷贝.
  console.log(Object.assign([1, 2, 3], [4, 5])); // [4, 5, 3]

  // 4. 取值的处理
  // Object.assign 只能复制值, 如果需要复制的值为一个取值函数, 则先将取值函数的值返回之后在将返回的值复制.
  let source = {
    get foo() {return 1}
  };
  console.log(Object.assign({}, source)); // {foo : 1}
}

prompt('Object.assign 的常见用途', 40);
prompt('1. 为对象添加属性');
prompt('2. 为对象添加方法');
prompt('3. 克隆对象');
prompt('4. 合并多个对象');
prompt('5. 为对象制定默认值');
{

}

prompt('对象的可枚举性与遍历');
{
  
}

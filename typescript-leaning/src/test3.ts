console.log('----------------test3----------------');
{
  let obj = {
    name: 'zs',
    age: 20
  };
  let { name, age }: { name: string, age: number } = obj;

  // 默认值
  // 默认值可以让你在属性为 undefined 时使用缺省值：
  function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
  }
}

// 函数声明
{
  type C = { a: string, b?: number }
  function f({ a, b }: C): void {
    // ...
  }

  function f2({ a = "", b = 0 } = {}): void {
    // ...
  }
  f2();

  function f3({ a, b = 0 } = { a: "" }): void {
    // ...
  }
  f3({ a: "yes" }); // ok, default b = 0
  f3(); // ok, default to {a: ""}, which then defaults b = 0
  // f3({}); // error, 'a' is required if you supply an argument
}

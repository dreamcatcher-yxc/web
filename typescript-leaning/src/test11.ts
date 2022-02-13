console.log('----------------test11----------------');

{
  let sym1 = Symbol();
  let sym2 = Symbol("key"); // 可选的字符串key
}

{
  let sym2 = Symbol("key");
  let sym3 = Symbol("key");

  console.log('sym2 === sym3:', sym2 === sym3); // false, symbols是唯一的  
}

// 像字符串一样，symbols也可以被用做对象属性的键。
{
  // 编译选项 target 至少为 es2015 才能通过
  let sym = Symbol();

  let obj = {
    [sym]: "value"
  };

  console.log(obj[sym]); // "value"
}

// Symbols也可以与计算出的属性名声明相结合来声明对象的属性和类成员。
{
  const getClassNameSymbol = Symbol();

  class C {
    [getClassNameSymbol]() {
      return "C";
    }
  }

  let c = new C();
  let className = c[getClassNameSymbol](); // "C"
  console.log(className);
  
}
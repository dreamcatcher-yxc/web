console.log('----------------test7----------------');

{
  function indentity<T>(arg: T) {
    console.log(arg);
  }

  function logFunc<T>(args: T[]) {
    console.log(args.join('、'), args.length);
  }

  function logFunc2<T>(args: Array<T>) {
    console.log(args.join('、'), args.length);
  }

  indentity<string>('hello world!'); // 指定必须传递 string 类型
  indentity<number>(1); // 指定必须传递 number 类型
  indentity(2); // 传递类型根据参数自动推导，不需要手动指定
  logFunc<string>(['a', 'b', 'c']);
  logFunc2<string>(['a', 'b', 'c']);
}

// 泛型类型
{
  function fooFunc<T>(arg: T): T {
    return arg;
  }

  let foo: <T>(arg: T) => T = fooFunc; // 泛型类型赋值
  let foo2: <U>(arg: U) => U = fooFunc; // 泛型参数名不需要相同，只要在数量上和使用方式上对应就行
  let foo3: { <U>(arg: U): U } = fooFunc; // 使用带有调用签名的对象字面量来定义泛型函数

  // 通过 interface 定义泛型类型
  interface FooType {
    <T>(arg: T): T;
  }

  let foo4: FooType = fooFunc;

  interface FooType2<T> {
    (arg: T): T;
  }

  // 锁定类型是 foo5 泛型类型必须是 number 类型
  let foo5: FooType2<number> = fooFunc;
  foo5(1);
  // foo5('5'); // ERROR: Argument of type 'string' is not assignable to parameter of type 'number'
}

// 泛型类
// GenericNumber类的使用是十分直观的，并且你可能已经注意到了，没有什么去限制它只能使用number类型。
// 也可以使用字符串或其它更复杂的类型。
{
  class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
  }

  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y) { return x + y; };
}

// 泛型约束
{
  // function loggingIdentity<T>(arg: T): T {
  //   console.log(arg.length);  // Error: T doesn't have .length
  //   return arg;
  // }

  interface Lengthwise {
    length: number;
  }

  // 类似泛型类型必须是 lengthWise 的子类
  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
  }

  // loggingIdentity(3);  // Error, number doesn't have a .length property
  loggingIdentity({ length: 10, value: 3 }); // ok
}

// 在泛型束中使用类型参数
// 你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。
// 并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束。
// 下方示例报错，原因未知。
{
  // function getProperty(obj: T, key: K) {
  //   return obj[key];
  // }

  // let x = { a: 1, b: 2, c: 3, d: 4 };

  // getProperty(x, "a"); // okay
  // getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
}

// 在泛型里使用类类型
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。
{
  function create1<T>(c: { new(): T; }): T {
    return new c();
  }

  create1(Object);
  // create('1'); // error: 
}

// 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系
{
  class BeeKeeper {
    hasMask: boolean;
  }

  class ZooKeeper {
    nametag: string;
  }

  class Animal {
    numLegs: number;
  }

  class Bee extends Animal {
    keeper: BeeKeeper;
  }

  class Lion extends Animal {
    keeper: ZooKeeper;
  }

  function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
  }

  // createInstance(Lion).keeper.nametag;  // typechecks!
  // createInstance(Bee).keeper.hasMask;   // typechecks!
}
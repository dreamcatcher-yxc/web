console.log('----------------test10----------------');

// 交叉类型
// 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
// 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。 就是说这个类型的对象同时拥有
// 了这三种类型的成员。

// 我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在JavaScript里发生这种情况的场合很多！） 
// 下面是如何创建混入的一个简单例子：
{
  function extend<T, U>(first: T, second: U): T & U {
    // let result = <T & U>{}; // 在 strictNullChecks = true 时会报错 
    let result = <T & U & Object>{};
    for (let id in first) {
      (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
      if (!result.hasOwnProperty(id)) {
        (<any>result)[id] = (<any>second)[id];
      }
    }
    return result;
  }

  class Person {
    constructor(public name: string) { }
  }

  interface Loggable {
    log(): void;
  }

  class ConsoleLogger implements Loggable {
    log(...args) {
      if (!args) {
        return;
      }
      console.log(args.join('\n'));
    }
  }

  let jim = extend(new Person("Jim"), new ConsoleLogger());
  console.log('jim name is', jim.name);
  jim.log('hello', 'world!');
}

// 联合类型（Union Types）
// 联合类型与交叉类型很有关联，但是使用上却完全不同。 偶尔你会遇到这种情况，一个代码库希望传入 number或 string类型的参数。
// 例如下面的函数：
{
  // paddingLeft 的参数 padding 允许接收 string 或者 number 类型的参数
  function padLeft(padding: string | number): { padding: string } {
    if (typeof padding === 'string') { // ts 会自动将 typeof 识别为类型保护， typeof padding === 'string' 块里面的 padding ts 都知道是 string 类型
      return {
        padding: padding
      }
    }
    return {
      padding: padding + 'px'
    }
  }

  // let indentedString = padLeft("Hello world", true); // errors during compilation
  console.log('style', padLeft('12px')); // is ok
  console.log('style', padLeft(12)); // is ok

  interface Bird {
    fly();
    layEggs();
  }

  interface Fish {
    swim();
    layEggs();
  }

  function getSmallPet(): Fish | Bird {
    return <Fish | Bird>{
      layEggs() {
        console.log('egg');
      }
    }
  }

  // 联合类型只能访问联合类型中共同拥有的成员
  let pet = getSmallPet();
  pet.layEggs(); // okay
  // pet.swim();    // error: Property 'swim' does not exist on type 'Bird | Fish'
  // (<Fish>pet).swim();    // 可以编译通过，因为使用类型断言告诉了编译器 pet 就是 Fish 类型

  // 类型保护
  // 下面定义了 pet is Fish，表明返回的值标识参数 pet 类型是否为 Fish 类型（pet 必须和参数名对应）
  // 则在 ts 能在条件判断中自动推荐如果 isFish(pet) = true，则在 if 块里 pet 是 Fish 类型
  function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
  }

  // 'swim' 和 'fly' 调用都没有问题了

  if (isFish(pet)) {
    pet.swim();
  }
  else {
    pet.fly();
  }
}

// instanceof 类型保护
// 类似于 typeof 关键字, ts 能根据 instanceof(v) 判断结果知道当前条件块里面的 v 的类型是什么
{
  interface Padder {
    getPaddingString(): string
  }

  class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
      return Array(this.numSpaces + 1).join(" ");
    }
  }

  class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
      return this.value;
    }
  }

  function getRandomPadder() {
    return Math.random() < 0.5 ?
      new SpaceRepeatingPadder(4) :
      new StringPadder("  ");
  }

  // 类型为SpaceRepeatingPadder | StringPadder
  let padder: Padder = getRandomPadder();

  if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
  }
  if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
  }
}

// 可以为 null 的类型
// TS 中 stirng | null、string | null | undefined、string | undefined 被认为是不同的类型，
// 互相之间是不兼容的，当使用 --strictNullChecks，可选参数会被自动地加上 | undefined (默认为 false)
{
  let s = "foo";
  // s = null; // 错误, 'null'不能赋值给'string'
  let sn: string | null = "bar";
  sn = null; // 可以

  // sn = undefined; // error, 'undefined'不能赋值给'string | null'

  // 可选属性也会有同样的处理
  class C {
    a: number;
    b?: number;
  }
  let c = new C();
  c.a = 12;
  // c.a = undefined; // error, 'undefined' is not assignable to 'number'
  c.b = 13;
  c.b = undefined; // ok
  // c.b = null; // error, 'null' is not assignable to 'number | undefined'

  // 类型保护
  function f(sn: string | null): string {
    if (sn == null) { //采用 if 判断过 null 的情况，则下方返回不会报错，因为 ts 分析已经判断过 null 的情况了
      return "default";
    }
    return sn;
  }

  function f2(sn: string | null): string {
    return sn || 'default'; // 采用短路运算符也能起到类型保护的作用
  }

  // function broken(name: string | null): string {
  //   function postfix(epithet: string) {
  //     return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
  //   }
  //   name = name || "Bob";
  //   return postfix("great");
  // }

  // 添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined
  function fixed(name: string | null): string {
    function postfix(epithet: string) {
      return name!.charAt(0) + '.  the ' + epithet; // ok
    }
    name = name || "Bob";
    return postfix("great");
  }
}

// 类型别名
// 类型别名会给一个类型起个新名字。 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。
{
  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;
  function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
      return n;
    }
    else {
      return n();
    }
  }

  // 类型别名也可以使用泛型
  type container<T> = { value: T };

  // 也可以使用类型别名来在属性里引用自己：
  type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
  };

  // 与交叉类型一起使用，我们可以创建出一些十分稀奇古怪的类型。
  type LinkedList<T> = T & { next: LinkedList<T> | null };

  interface Person {
    name: string;
  }

  let people: LinkedList<Person> = {
    name: '1',
    next: {
      name: '2',
      next: null
    }
  };
  let s = people!.name;
  // let s1 = people!.next.name;
  // let s2 = people!.next.next.name;
  // let s3 = people!.next.next.next.name;
}

// 接口 vs 类型别名
{
  type Alias = { num: number }
  interface Interface {
    num: number;
  }

  // 在编译器中将鼠标悬停在 interfaced上，显示它返回的是 Interface，但悬停在 aliased上时，显示的却是对象字面量类型。
  // declare function aliased(arg: Alias): Alias;
  // declare function interfaced(arg: Interface): Interface;

  // 另一个重要区别是类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）。 因为 软件中
  // 的对象应该对于扩展是开放的，但是对于修改是封闭的，你应该尽量去使用接口代替类型别名。
}

// 字符串字面量类型
// 字符串字面量类型允许你指定字符串必须的固定值。 在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。
// 通过结合使用这些特性，你可以实现类似枚举类型的字符串。
{
  type Easing = "ease-in" | "ease-out" | "ease-in-out";
  class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
      if (easing === "ease-in") {
        // ...
      }
      else if (easing === "ease-out") {
      }
      else if (easing === "ease-in-out") {
      }
      else {
        // error! should not pass null or undefined.
      }
    }
  }

  let button = new UIElement();
  button.animate(0, 0, "ease-in");
  // button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here

  // 字符串字面量类型还可以用于区分函数重载：
  function createElement(tagName: "img"): HTMLImageElement;
  function createElement(tagName: "input"): HTMLInputElement;
  // ... more overloads ...
  function createElement(tagName: string): Element {
    if (tagName === 'img') {
      return new HTMLImageElement();
    }
    if (tagName === 'input') {
      return new HTMLInputElement();
    }
    return new Element();
  }
}

// 数字字面量类型
{
  function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    // ...
    return 1;
  }

  // 它们可以用在缩小范围调试bug的时候：
  function foo(x: number) {
    // 下面的判断是没有有逻辑错误的判断，TS 会自动识别
    // if (x !== 1 || x !== 2) { // error: This condition will always return 'true' since the types '1' and '2' have no overlap.
    // }
  }
}

// 可辨识联合（Discriminated Unions）
{
  interface Square {
    kind: "square";
    size: number;
  }

  interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
  }

  interface Circle {
    kind: "circle";
    radius: number;
  }

  interface Triangle {
    kind: "triangle";
    width: number;
    height: number;
  }

  type Shape = Square | Rectangle | Circle | Triangle;

  // 因为明确指定返回类型为 number，所以 TS 会自动检测 switch 语句中是否将传入类型所有的可能处理完，
  // 如果没有处理完所有情况，并且也没有默认返回，则会报错。
  function area(s: Shape): number {
    switch (s.kind) {
      case "square": return s.size * s.size;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
      case "triangle": return s.height * s.width / 2;
    }
  }
}

// 多态的 this类型
// TS 能正常处理继承之后基类继承方法返回的子类类型
{
  class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
      return this.value;
    }
    public add(operand: number): this {
      this.value += operand;
      return this;
    }
    public multiply(operand: number): this {
      this.value *= operand;
      return this;
    }
    // ... other operations go here ...
  }

  // let v = new BasicCalculator(2)
  //   .multiply(5)
  //   .add(1)
  //   .currentValue();

  class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
      super(value);
    }
    public sin() {
      this.value = Math.sin(this.value);
      return this;
    }
    // ... other operations go here ...
  }

  let v = new ScientificCalculator(2)
    .multiply(5)
    .sin()
    .add(1)
    .currentValue();
}

// 索引类型
{
  function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
  }

  interface Person {
    name: string;
    age: number;
  }
  let person: Person = {
    name: 'Jarid',
    age: 35
  };
  let strings: string[] = pluck(person, ['name']); // ok, string[]
  // let strings2: string[] = pluck(person, ['name2']); // error: Type '"name2"' is not assignable to type 'keyof Person'

  // 编译器会检查 name是否真的是 Person的一个属性。 本例还引入了几个新的类型操作符。 首先是 keyof T， 索引类型查询操作符。 
  // 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合。 例如:
  let personProps: keyof Person; // 'name' | 'age'

  // 第二个操作符是 T[K]， 索引访问操作符。 在这里，类型语法反映了表达式语法。 这意味着 person['name']具有类型
  // Person['name'] — 在我们的例子里则为 string类型。 然而，就像索引类型查询一样，你可以在普通的上下文里使用
  // T[K]，这正是它的强大所在。 你只要确保类型变量 K extends keyof T就可以了。 例如下面 getProperty函数的例子：
  function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
  }

  // getProperty里的 o: T和 name: K，意味着 o[name]: T[K]。 当你返回 T[K]的结果，编译器会实例化键的真实类型，
  // 因此 getProperty的返回值类型会随着你需要的属性改变。
  let name: string = getProperty(person, 'name');
  let age: number = getProperty(person, 'age');
  // let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'
}

// 索引类型和字符串索引签名
{
  // keyof和 T[K]与字符串索引签名进行交互。 如果你有一个带有字符串索引签名的类型，那么 keyof T会是 string。 并且 T[string]为索引签名的类型：
  interface Map<T> {
    [key: string]: T;
  }
  let keys: keyof Map<number>; // string
  let value: Map<number>['foo']; // number
}

// 映射类型
// 详见: https://www.tslang.cn/docs/handbook/advanced-types.html --- 映射类型
{
  // 原始类型
  interface Person {
    name: string;
    age: number;
  }

  // 如果需要属性可选，需要额外的定义一个类型，并以此声明原来的属性可选
  interface PersonPartial {
    name?: string;
    age?: number;
  }

  // 如果需要属性只读，需要额外的定义一个类型，并以此声明原来的属性只读
  interface PersonReadonly {
    readonly name: string;
    readonly age: number;
  }

  // 类型映射允许我们使用下面的方法，统一转换类型，减少大量冗余代码
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  }

  type Partial<T> = {
    [P in keyof T]?: T[P];
  }

  type Nullable<T> = { [P in keyof T]: T[P] | null }

  type PersonPartial2 = Partial<Person>;
  type ReadonlyPerson2 = Readonly<Person>;
  type NullablePerson = Nullable<Person>;
}

// typescript 预定义的有条件类型
// TypeScript 2.8在lib.d.ts里增加了一些预定义的有条件类型：
//  - Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
//  - Extract<T, U> -- 提取T中可以赋值给U的类型。
//  - NonNullable<T> -- 从T中剔除null和undefined。
//  - ReturnType<T> -- 获取函数返回值类型。
//  - InstanceType<T> -- 获取构造函数类型的实例类型。
{
  type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
  type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

  type T02 = Exclude<string | number | (() => void), Function>;  // string | number
  type T03 = Extract<string | number | (() => void), Function>;  // () => void

  type T04 = NonNullable<string | number | undefined>;  // string | number
  type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

  function f1(s: string) {
    return { a: 1, b: s };
  }

  class C {
    x = 0;
    y = 0;
  }

  type T10 = ReturnType<() => string>;  // string
  type T11 = ReturnType<(s: string) => void>;  // void
  type T12 = ReturnType<(<T>() => T)>;  // {}
  type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
  type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
  type T15 = ReturnType<any>;  // any
  type T16 = ReturnType<never>;  // any
  // type T17 = ReturnType<string>;  // Error
  // type T18 = ReturnType<Function>;  // Error

  type T20 = InstanceType<typeof C>;  // C
  type T21 = InstanceType<any>;  // any
  type T22 = InstanceType<never>;  // any
  // type T23 = InstanceType<string>;  // Error
  // type T24 = InstanceType<Function>;  // Error
}
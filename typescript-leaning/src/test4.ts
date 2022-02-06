console.log('----------------test4----------------');

// 接口定义
{
  interface LabelledValue {
    label: string;
  }

  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
  }

  let myObj = { size: 10, label: "Size 10 Object" };
  printLabel(myObj);

}

// 可选属性
{
  interface SquareConfig {
    color?: string;
    width?: number;
  }

  function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    // if (config.clor) {
    //   // Error: Property 'clor' does not exist on type 'SquareConfig'
    //   newSquare.color = config.clor;
    // }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
  }

  let mySquare = createSquare({ color: "black" });
  console.log(mySquare);
}

// 只读属性
{
  interface Point {
    readonly x: number;
    readonly y: number;
  }
  let p1: Point = { x: 10, y: 20 };
  // p1.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

  // TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，
  // 因此可以确保数组创建后再也不能被修改：
  let a: number[] = [1, 2, 3, 4];
  let ro: ReadonlyArray<number> = a;
  // ro[0] = 12; // error!
  // ro.push(5); // error!
  // ro.length = 100; // error!
  // a = ro; // error!
}

// 函数类型
{
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  // let mySearch: SearchFunc;
  // mySearch = function(source: string, subString: string) {
  //   let result = source.search(subString);
  //   return result > -1;
  // }

  // 参数名不一定需要和定义的相同
  // let mySearch: SearchFunc;
  // mySearch = function(src: string, sub: string): boolean {
  //   let result = src.search(sub);
  //   return result > -1;
  // }

  // 可以不写函数参数类型， typescript 可以自动推算
  let mySearch: SearchFunc;
  mySearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
  }
  console.log(mySearch('hello world!', 'world'));
}

// 可索引类型
{
  interface StringArray {
    // 1. 索引类型只能是 string、number、symbol 类型
    [index: number]: string;
  }

  let myArray: StringArray = ['1', '2'];
  console.log('myArray[0] is: ', myArray[0]);

  // TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，
  // 但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用
  // number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是
  // 说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此
  // 两者需要保持一致。
  class Animal {
    name: String;
  }

  class Dog extends Animal {
    breed: String;
  }

  // Error: 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.
  // 数字索引的返回值必须是字符串索引返回值类型的子类型
  interface NotOkay {
    // [x: number]: Animal;
    // [x: string]: Dog;
  }

  interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
  }

  let myDic: NumberDictionary = {
    '一': 1,
    '二': 2,
    '三': 3,
    length: 3
  };
  console.log(JSON.stringify(myDic));

  interface ReadonlyStringArray {
    readonly [index: number]: string;
  }
  let myReadonlyArray: ReadonlyStringArray = ["Alice", "Bob"];
  // myReadonlyArray[2] = "Mallory"; // error!
  console.log(myReadonlyArray);
}

// 类类型
{
  interface Person {
    name: string;
    male: string;
    sayName(): void;
  }

  // Student 中实现了 Person 接口，则必须包含 Person 中定义的属性和方法
  class Student implements Person {
    // constructor (public name: string, public male: string) {
    //   this.name = name;
    //   this.male = male;
    // }

    // 此种方式和上面的形式是等价的
    name: string;
    male: string;

    constructor(name: string, male: string) {
      this.name = name;
      this.male = male;
    }

    sayName(): void {
      console.log('my name is ', this.name, ' male is ', this.male);
    }
  }

  let student: Person = new Student('张三', '男');
  student.sayName();

  // 构造函数定义不能使用下面这种形式，不是很理解
  // interface ClockConstructor {
  //   new (hour: number, minute: number): any;
  // }

  // class Clock implements ClockConstructor {
  //   currentTime: Date;
  //   constructor(h: number, m: number) { }
  // }

  // 需要使用下面这中
  interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
  }
  interface ClockInterface {
    tick();
  }

  function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
  }

  class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
      console.log("beep beep");
    }
  }
  class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
      console.log("tick tock");
    }
  }

  let digital = createClock(DigitalClock, 12, 17);
  let analog = createClock(AnalogClock, 7, 32);
  console.log('digital:', digital);
  console.log('analog:', analog);
}

// 继承接口
{
  interface Shape {
    color: string;
  }

  interface PenStroke {
    penWidth: number;
  }

  interface Square extends Shape, PenStroke {
    sideLength: number;
  }

  let square = <Square>{};
  square.color = "blue";
  square.sideLength = 10;
  square.penWidth = 10;
  console.log('square: ', square);
}

// 混合类型
{
  interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
  }

  function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
  }

  let c = getCounter();
  c(10);
  c.reset();
  c.interval = 5.0;
}

// 接口继承类
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有
// 提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个
// 拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
// 当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承
// 至基类外与基类没有任何关系。 例：
{
  class Control {
    private state: any;
  }

  interface SelectableControl extends Control {
    select(): void;
  }

  class Button extends Control implements SelectableControl {
    select() { }
  }

  class TextBox extends Control {
    select() { }
  }

  // 错误：“Image”类型缺少“state”属性。
  // class Image implements SelectableControl {
  //   select() { }
  // }

  class Location {

  }
}

// 在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。 因为 state是私有
// 成员，所以只能够是Control的子类们才能实现SelectableControl接口。 因为只有 Control的子类才能够
// 拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的。

// 在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 实际上， SelectableControl
// 接口和拥有select方法的Control类是一样的。 Button和TextBox类是SelectableControl的子类（因为它们都继承
// 自Control并有select方法），但Image和Location类并不是这样的。

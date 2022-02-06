console.log('----------------test2----------------');

// 基本类型

// 布尔
let isDone: boolean = false;

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

console.log(isDone);

// 字符串
let username: string = 'yangxiuchu';
username = 'zhangsan';
console.log(username);

{
  let name: string = `Gene`;
  let age: number = 37;
  let sentence: string = `Hello, my name is ${name}.

  I'll be ${age + 1} years old next month.`;
  console.log(sentence);
}

// 数组
{
  let list: number[] = [1, 2, 3];
  // Array<元素类型>
  let list2: Array<String> = ['1', '2', '3'];
  console.log(list);
  console.log(list2);
}

// 元组 Tuple
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 
// 比如，你可以定义一对值分别为 string和number类型的元组。
{
  let x: [String, Number];
  x = ['1', 2];
  console.log(x);

  // 元组第一个元素是字符串，可以指定 substr
  console.log(x[0].substr(0));

  //  Error, 'number' does not have 'substr'
  // console.log(x[1].substr(1));

  // 当访问一个越界的元素，会使用联合类型替代：
  // x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型(tsc v4+ 报错!!!)
  // console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
  // x[6] = true; // Error, 布尔不是(string | number)类型
}

// 枚举
{
  enum Color { Red, Green, Blue };
  let c: Color = Color.Green;
  console.log(c); // 1（按照顺序自动赋值）

  enum Color2 { Red = 2, Green, Blue };
  let c2: Color2 = Color2.Green;
  console.log(c2); // 3（初始化了前面的值，后面的自动递增）
  console.log(Color2[2]); // Red
}

// Any
// 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来
// 自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段
// 的检查。 那么我们可以使用 any类型来标记这些变量：
{
  let notSure: any = 4;
  notSure = "maybe a string instead";
  notSure = false; // okay, definitely a boolean
}

// Object
// 在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 你可能
// 认为 Object有相似的作用，就像它在其它语言中那样。 但是 Object类型的变量只是允许你给它赋任意值 - 但
// 是却不能够在它上面调用任意的方法，即便它真的有这些方法：
{
  let notSure: any = 4;
  // notSure.ifItExists(); // okay, ifItExists might exist at runtime
  notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

  // 和面向对象的向上转型是一个意思，prettySure 是 Object 类型，兼容子类赋值，但是不能调用子类的方法。
  let prettySure: Object = 4;
  // prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

  // 初始化一个数组元素未知的数组
  let list: any[] = [1, 2, 3];
  let list2: Array<any> = [1, 2, 3];
  console.log('list', list);
  console.log('list2', list2);
}

// Void
{
  function noneReurnFunc(): void {

  }

  // 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
  // 当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。 
  // 这能避免 很多常见的问题。 也许在某处你想传入一个 string或null或undefined，
  // 你可以使用联合类型string | null | undefined。 再次说明，稍后我们会介绍联
  // 合类型。
  let foo: void = null;
  let foo2: void = undefined;
  // foo2 = null;
  // let foo3: void = 1; // Error:  Type 'number' is not assignable to type 'void'
}

// Never
// never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或
// 根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类
// 型，当它们被永不为真的类型保护所约束时。

// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型
// 或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
{
  // 返回never的函数必须存在无法达到的终点
  function error(message: string): never {
    throw new Error(message);
  }

  // 推断的返回值类型为never
  function fail() {
    return error("Something failed");
  }

  // 返回never的函数必须存在无法达到的终点
  function infiniteLoop(): never {
    while (true) {
    }
  }
}

// Object
// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
// 使用object类型，就可以更好的表示像Object.create这样的API。
declare function create(o: object | null): void;
{
  // create({ prop: 0 }); // OK
  // create(null); // OK
  // create(42); // Error
  // create('string'); // Error
  // create(false); // Error
  // create(undefined); // Error
}

// 类型断言
// 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 
// 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

// 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 
// 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，
// 程序员，已经进行了必须的检查。

// 类型断言有两种形式。 其一是“尖括号”语法：

// 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，
// 当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
{
  let someValue: any = "this is a string";
  let strLength: number = (<string>someValue).length;
  let someValue2: any = "this is a string";
  let strLength2: number = (someValue2 as string).length;
}

const foo2: () => void = () => {
  console.log(this);
}
foo2();
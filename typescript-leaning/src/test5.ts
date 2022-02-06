console.log('----------------test5----------------');

// 一个比较复杂的例子
{
  class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }

  class Snake extends Animal {
    constructor(name: string) {
      super(name); // 必须调用
    }
    move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
    }
  }

  class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
    }
  }

  let sam = new Snake("Sammy the Python");
  let tom: Animal = new Horse("Tommy the Palomino");

  sam.move();
  tom.move(34);
}

// public、private、protected、readonly
// typescript 类中的属性，不配置修饰符，则其默认就是 public，private 和 protected 和 Java 中的类似，private 和 protected 都代表私有，
// 不同点是 private 只能在自身类范围内被访问，而 protected 除了在自身类范围内能被访问之外，子类还能访问。
// readonly 类似于 java 中的 final，如果一个类的属性是 readonly 类型，则其只能在声明时初始化或者在类的构造函数中初始化。
{
  class Person {
    public name: string; // 默认就是 public
    private foo: string;
    protected age: number;
  }

  class Student extends Person {
    public readonly male: string;
    constructor(name: string, age: number, male: string) {
      super(); // 必须调用父类的构造函数
      this.name = name;
      this.age = age;
      this.male = male;
      // this.foo = ''; // foo 是私有属性，只能在 Person 中访问
    }

    // setMale (male: string) {
    //   // this.male = male; // 只读属性只能在声明时初始化或者构造函数中初始化
    // }

    getAge(): number {
      return this.age;
    }

    getName(): string {
      return this.name;
    }
  }

  let person: Student = new Student('zs', 20, '男');
  console.log(person);
}

// 静态属性
{
  class Grid {
    static origin = { x: 0, y: 0 };
    calculateDistanceFromOrigin(point: { x: number; y: number; }) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor(public scale: number) { }
  }

  let grid1 = new Grid(1.0);  // 1x scale
  let grid2 = new Grid(5.0);  // 5x scale

  console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
  console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
}

// 抽象类
// 和面向对象语言中，抽象类用于实现多态，向上转型的规则一致
{
  abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
      console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
  }

  class AccountingDepartment extends Department {

    constructor() {
      super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
      console.log('Generating accounting reports...');
    }
  }

  let department: Department; // 允许创建一个对抽象类型的引用
  // department = new Department(); // 错误: 不能创建一个抽象类的实例
  department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
  department.printName();
  department.printMeeting();
  // department.generateReports(); // 错误: 方法在声明的抽象类中不存在
}

// 高级使用
//  greeter1与之前看到的一样。 我们实例化 Greeter类，并使用这个对象。 与我们之前看到的一样。

// 再之后，我们直接使用类。 我们创建了一个叫做 greeterMaker的变量。 这个变量保存了这个类或者说保存了类构造函数。
// 然后我们使用 typeof Greeter，意思是取Greeter类的类型，而不是实例的类型。 或者更确切的说，"告诉我 Greeter
// 标识符的类型"，也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数。 之后，就和前面一样，我们在
// greeterMaker上使用 new，创建 Greeter的实例。
{
  class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
      if (this.greeting) {
        return "Hello, " + this.greeting;
      }
      else {
        return Greeter.standardGreeting;
      }
    }
  }

  let greeter1: Greeter;
  greeter1 = new Greeter();
  console.log(greeter1.greet());

  let greeterMaker: typeof Greeter = Greeter;
  greeterMaker.standardGreeting = "Hey there!";

  let greeter2: Greeter = new greeterMaker();
  console.log(greeter2.greet());
}

// 把类当做接口使用
{
  class Point {
    x: number;
    y: number;
  }

  interface Point3d extends Point {
    z: number;
  }

  let point3d: Point3d = { x: 1, y: 2, z: 3 };
  console.log(point3d);
}

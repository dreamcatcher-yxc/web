const prompt = (msg = '', num = 20) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('类的简单示例');
{
    // ES5
    // function Point(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }
    // Point.prototype.toString = function() {
    //     return '('+ this.x +', ' + this.y +')';
    // }
    // var p = new Point(2, 3);
    //
    // ES6
    // 从下面的测试结果可知, ES6 中创建类的写法完全就是 ES5 的写法的一种更符合传统的面向对象语言的一种写法而已。
    // 类上面的方式实际是附在 Point.prototype 属性下面的.
    class Point {
        constructor(x, y) {
            this.x  = x;
            this.y = y;
        }
        getx() {
            return this.x;
        }
        getY() {
            return this.y;
        }
    }
    let p = new Point(2, 3);
    console.log(p); // Point { x: 2, y: 3 }
    console.log(p.getx() + ', ' + p.getY()); // 2, 3
    console.log(typeof Point); // function
    console.log(Point === Point.prototype.constructor); // true
}

prompt('class');
{
    // 1. 类或模块的内部, 默认就是严格模式, 所以不需要使用 user strict 指定运行模式,
    //    只要你的代码写在类或模块中, 就只有严格模式可用.
    // 2. constructor 方法, 通过 new 生成对象实例的时候, 自动调用该方法, 一个类如果没有显式定义
    //    一个 constructor, 则一个空的 constructor 会被默认提供.
    // 需要注意的是 constructor 默认返回的是 this, 也可以改变它的返回值.
    // 3. 类的实例对象, 必须使用 new, 不使用 new 会报错.
    // 4. 实例的属性除非显式的使用 this.[propertyName] 定义在实例之上, 否则都是定义在类的原型上.
    // 5. 类的所有实例共享一个原型对象, 这意味这我们可以通过 prototype 为对象添加方法或者类共享的属性.
    // 6. Class 表达式
    // 后面的 Foo 只有类内部能用, 这代当前的类, 前面的 Foo 才是类的名字, 代码内部没用使用到后面的 Foo, 则可以将其省略.
    // const Foo = class Foo {
    //     getClassName() {
    //         return Foo.name;
    //     }
    // }
    // let foo = new Foo();
    // console.log(foo.getClassName()); // Foo
    // console.log(foo.name); // undefined
    // 立即执行类.
    // const person =  new class {
    //     constructor(name) {
    //         this.name = name;
    //     }
    //     getName() {
    //         return this.name;
    //     }
    // }('张三');
    // console.log(person.getName()); // 张三
    //
    // 7. 不存在变量的提升.
    // ES6 不会把类的声明提升到代码头部, 但是 ES5 会这样做.
    // 8. ES6 和 ES5 一样, 不为类提供私有方法, 可以使用传统的方式区分私有属性(方法)和公有属性(方法),
    //    当然, 也可以使用 ES6 提供的 Symbol 命名私有属性(方法), 导致第三方无法获取它们, 这样也能达到
    //    将属性(方法)私有化的目的.
    // 9. 私有属性和方法(提案).
    // 10. this 的指向问题.
    //     和 ES5 一样, this 默认的指向都是当前对象, 但是如果将对象中的方法单独拿出来使用很有可能会出现问题, 因为该方法的 this 指向是当前的运行环境.
    // 11. Class.name 属性
    // 12. Class 的取值函数(get) 和存值函数(set)
    //      存值函数(set)和取值函数(get)是被定义在属性的 Descriptor 对象上的.
    // class Person {
    //     get name() {
    //         console.log('getter');
    //         if(!this.props) {
    //             this.props = new Map();
    //         }
    //         return this.props.has('name') ? this.props.get('name') : null;
    //     }
    //     set name(name) {
    //         console.log('setter');
    //         if(!this.props) {
    //             this.props = new Map();
    //         }
    //         this.props.set('name', name);
    //     }
    // }
    // let p = new Person();
    // console.log(p.name); // null
    // p.name = '张三';
    // console.log(p.name); // 张三
    //
    // 13. class 的 Generator 函数.
    // class Person {
    //     constructor(name, age, gender) {
    //         this.name = name;
    //         this.age = age;
    //         this.gender = gender;
    //     }
    //     *[Symbol.iterator]() {
    //         let props = Object.keys(this);
    //         for (let prop of props) {
    //             yield [prop, this[prop]];
    //         }
    //     }
    // }
    // console.log(...new Person('张三', '20', '男')); // [ 'name', '张三' ] [ 'age', '20' ] [ 'gender', '男' ]
    // 14. Class 的静态方法.
    // class Foo {
    //     static staticMethod() {
    //         return 'this is a static method';
    //     }
    // }
    // let foo = new Foo();
    // // 方法里面的 this 指向类, 而不是类实例.
    // console.log(Foo.staticMethod());
    // 不能通过类实例调用静态方法.
    // console.log(foo.staticMethod());
    //
    // 15. 目前类不支持属性, 静态属性的定义, 但是有相应的提案.
    //     可以使用 Foo.prop 为对象添加静态属性.
    //
    // 16. new.target: 返回 new 对象作用于的那个构造函数, 一般用于构造函数中.
    class Shape {
        constructor() {
            if(new.target === Shape) {
                throw new Error('Shape 不能初始化!');
            }
        }
    }
    class Circle {
        constructor(radius) {
            this.radius = radius;
        }
        getArea() {
            return Math.PI * (this.radius ** 2);
        }
    }
    // new Shape(); // Shape 不能初始化
    let circle = new Circle(2);
    console.log(circle.getArea());
}
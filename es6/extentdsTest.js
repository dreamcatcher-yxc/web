const prompt = (msg = '', num = 20) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('class 的继承');
{
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            console.log(new.target.name); // ColorPoint
        }
        static desc() {
            return 'this is Point Class';
        }
    }
    Point.prototype.foo = 'foo property at Point';

    class ColorPoint extends Point {
        // 如果构造函数提供, 则必须显式的调用父类 Point 的构造方法, 子类的 this 必须在 super 使用之后才能调用.
        // 没有提供构造函数, 默认提供的是如下的方式.
        // constructor(...args) {
        //      super(...args);
        // }
        constructor(x, y, color) {
            // super 关键字指向的是父类的 constructor 函数, 但是返回的却是子类的实例.
            // 相当于 Point.prototype.constructor.call(this);
            super(x, y);
            // super 指向 Point.prototype
            console.log(super.foo); // foo property at Point
            this.color = color;
        }

        static invokePointStaticMethod() {
            // super 在静态函数中指向 Point 对象.
            return super.desc();
        }

        *[Symbol.iterator]() {
            let props = Object.keys(this);
            for (let prop of props) {
                yield [prop, this[prop]];
            }
        }
    }
    let cp = new ColorPoint(1, 2, 'red');
    console.log(...cp); //[ 'x', 1 ] [ 'y', 2 ] [ 'color', 'red' ]
    console.log(cp instanceof Point); // true
    console.log(cp instanceof ColorPoint); // true
    // 父类的静态方法也会被子类继承.
    console.log(ColorPoint.desc()); // this is a Point Class
    // 可以使用此方法判断一个类是否继承另外一个类.
    console.log(Object.getPrototypeOf(ColorPoint) === Point); // true
    console.log(ColorPoint.invokePointStaticMethod()); // this is Point Class
    console.log(ColorPoint.__proto__ === Point); // true
    console.log(ColorPoint.prototype.__proto__ == Point.prototype); // true
}

prompt('类的 prototype 和 __proto__ 属性');
{
    // 参看教程.
}

prompt('extends 继承的目标');
{
    // 第一种情况.
    class A extends Object {
    }
    console.log(A.__proto__ === Object); // true
    console.log(A.prototype.__proto__ === Object.prototype); // true

    // 第二中情况
    class B {

    }
    console.log(B.__proto__ === Function.prototype); // true
    console.log(B.prototype.__proto__ === Object.prototype); // true

    // 第三种情况
    class C extends null {
    }
    console.log(C.__proto__ === Function.prototype); // true
    console.log(C.prototype.__proto__ === undefined); // true
}

prompt('实例的 __proto__ 属性');
{
    class Animal {

    }
    class Dog extends Animal {

    }
    let animal = new Animal();
    let dog = new Dog();
    console.log(dog.__proto__ === animal.__proto__); // false
    // 子类的原型的原型, 是父类的原型.
    console.log(dog.__proto__.__proto__ === animal.__proto__); // true
    // 如果能够确定该对象实例是使用该对象自身的构造方法构造的, 则下面的等式成立。
    console.log(dog.__proto__ === Dog.prototype.constructor.prototype); // true
}

prompt('原生构造函数的继承');
{
    // JS 提供的原生构造函数.
    // String(), Boolean(), Number(), Object(), RegExp(), Function(), Date(), Error(), Array()
    // ES5 是不允许继承这些原生构造函数的, 但是 ES6 中使用 extends 可以实现.
    // 具体参看教程.
    // Mixin 模式: 指将多个类混入另外一个类.
}


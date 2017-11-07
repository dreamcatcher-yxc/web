const prompt = (msg = '', num = 20) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('实例');
{
    //1. Generator 函数是 ES6 提供的一种异步编程的解决方案.
    //2. Generator 可以理解为一个状态机, 封装了多个内部状态.
    //3. 执行 Generator 函数会生成一个 Iterator 对象.
    //4. yield 后面的语句是使用 '懒求值' 的方式执行.
    let i = 0;
    function* foo() {
        yield ++i;
        yield ++i;
        yield ++i;
        return ++i;
    }
    let t = foo();
    t.next();
    console.log(i);
    //5. yield 只能出现在 Generator 函数中
    let flat = function* (arr) {
        for(let e of arr) {
            if(typeof e !== 'number') {
                // yield* 用于在 Generator 函数内部调用另外一个 Generator 函数.
                yield* flat(e);
            } else {
                yield e;
            }
        }
    };
    let arr = [1, [2, [3]]];
    console.log(...arr); // 1, 2, 3;
    // 6. Generator 函数执行之后返回的是一个 Iterator 对象, 该对象自身也具有 Symbol.iterator 属性, 执行后返回本身
    let it = foo();
    console.log(it[Symbol.iterator]() === it); // true
    // 7. next 方法的参数.
    function* foo1(x) {
        var y = 2 * (yield (x + 1)); // 1
        var z = yield (y / 3); // 2
        return (x + y + z); // 3
    }

    var a = foo1(5);
    // 执行 1
    a.next() // Object{value:6, done:false}
    // 执行 2
    a.next() // Object{value:NaN, done:false}
    // 执行 3
    a.next() // Object{value:NaN, done:true}

    var b = foo1(5);
    // 执行 1, 第一次执行 next 传递进入的参数无效, 因为第一次执行 next() 没有上一个执行的 yield, 传入参数无意义, 但是不会报错.
    b.next() // { value:6, done:false }
    // 执行 2, 设置 1 执行的结果为 12, 故 y = 24, y / 3 = 8
    b.next(12) // { value:8, done:false }
    // 执行3, 设置 2 的执行结果为 8, x + y + z = 5 + 24 + 13 = 42
    b.next(13) // { value:42, done:true }

    // 使用 Generator 函数生成 斐波那契数组.
    function* fibonacci() {
        let [prev, curr] = [0, 1];
        while(true) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
    let tArr = [];
    for(let n of fibonacci()) {
        if(n > 1000) break;
        tArr.push(n);
    }
    console.log(...tArr)

    // 为 Object 添加生成 Iterator.
    function* toIterator(obj) {
        let keys = Reflect.ownKeys(obj);
        for(let key of keys) {
            yield [key, obj[key]];
        }
    };
    
    let obj = {
        name : 'zhangsan',
        gender : 'male',
        age : 20
    };
    for (let [k, v] of toIterator(obj)) {
        console.log(`${k} => ${v}`);
    }
    // 8. return 函数在执行之后之后的 yield 不会再执行
}

prompt('Generator.prototype.throw');
{
    // 1. Generator.prototype.throw 抛出的异常会首次在相应的 yield 位置处抛出, 如果没有捕获则会抛出方法外部.
    // 具体参看 阮一峰ES6 教程.
    function* foo() {
        try {
            yield  // 1
        }catch(e) {
            console.log('内部捕获', e);
        }
    };
    let t = foo();
    t.next();
    try {
        t.throw('b');
    }catch(e) {
        console.log('外部捕获', e);
    }
}

prompt('Generator.prototype.return()');
{
    // 用于提前结束 Generator 生成的 Iterator 的遍历.
    // 具体参看 阮一峰ES6 教程.
}

prompt('yield* 表达式');
{
    const foo1 = function*() {
        yield 'b';
        yield 'c';
    }
    const foo2 = function*() {
        yield 'a';
        // 相当于:
        // yield : 'b';
        // yield : 'c';
        // 直接使用 foo1() 在执行的时候是不会报错的, 但是不会有任何的效果.
        // 直接使用 yield foo1(); 则返回的是一个遍历器对象.
        yield* foo1();
        yield 'd';
    }
    console.log(...foo2()); // a b c d

    const foo3 = function*() {
        yield* ['a', 'b', 'c'];
    }
    console.log(...foo3()); // a b c

    const foo4 = function*() {
        yield* 'hello';
    }
    console.log(...foo4()); // h e l l o
}

prompt('使用 yield 取出嵌套数组中的所有元素的值');
{
    let arr = ['a', ['b', ['c']]];
    function* iterArr(arr) {
        if(Array.isArray(arr)) {
            for (let e of arr) {
                yield* iterArr(e);
            }
            return;
        }
        yield arr;
    };
    console.log(...iterArr(arr)); // a b c
}

prompt('Generator 的 this 对象');
{
    // 1. ES6 规定 Generator 产生的遍历器是 Generator 函数的实例, 因此也继承了 Generator 函数的 prototype 上的方法.
    // Generator 产生的遍历器是不能采用构造函数的方式构造的, 因此不能使用 new GeneratorFunction() 的方式, 但是可以使用
    // 下面变通的方式获取向将 Generator 当成普通的构造函数使用.
    function* gen() {
        this.a = 1;
        yield  this.b = 2;
        yield  this.c = 3;
    };
    function F() {
        return gen.call(gen.prototype);
    };
    let f = F();
    console.log(...f); // 2 3
    console.log(f.a); // 1
    console.log(f.b); // 2
    console.log(f.c); // 3
}

prompt('实例: 使用 Generator 逐行读取文件');
{
    
}

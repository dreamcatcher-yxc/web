const prompt = (msg = '', num = 20) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('Symbol 测试');
{
    let s = Symbol('my symbol');
    console.log(s.toString()); // Symbol(my symbol)
    console.log(String(s)); // Symbol(my symbol)
    // Symbol 可以通过如下的方式作为对象的属性.
    let propertySymbol = Symbol('property');
    // 第一种方式
    let obj = {};
    obj[propertySymbol] = 1;
    // 第二种方式
    //let obj = {
    //    [propertySymbol] : 1
    //};
    // 第三种方式
    //Object.defineProperty(obj, propertySymbol, {value : 1});
    console.log(obj[propertySymbol]); // 1

    // 使用 Symbol 定义一组常量值.
    let log = {
        levels : {
            DEBUG : Symbol('debug'),
            INFO : Symbol('info'),
            WARN : Symbol('warn')
        }
    };
    console.log(log.levels.DEBUG == log.levels.INFO); // false

    // 使用 Symbol 消除魔术字符串.
    // 所谓魔术字符串就是一个应用中会多次适应的字符串, 没有使用变量的方式定义, 而是直接使用
    // 常量的方式使用, 这样的设计会为后期的代码升级和维护带来很大的不便.
}

prompt('Symbol.for(), Symbol.forKey()');
{
    // 1. 使用 Symbol.for() 可以创建一个 Symbol 对象, 和 Symbol() 的方式的差异在于:
    // Symbol 是每次都创建一个新的 Symbol 对象, 而 Symbol.for 在创建 Symbol 对象的
    // 时候会先查找该 Symbol 是否已经被创建, 如果有则会返回已经创建的 Symbol 对象, 如:
    console.log(Symbol('foo') == Symbol('foo')); // false
    console.log(Symbol.for('foo') == Symbol.for('foo')); // true
    console.log(Symbol.keyFor(Symbol.for('foo1'))); // foo
    console.log(Symbol.keyFor(Symbol('foo2'))); // undefined
}

prompt('Symbol 实例');
{
    // 1. Symbol 用于单例设计模式.
    // 2. Symbol 存在 11 个内置的值, 指向 ES6 内部使用的方法.
}

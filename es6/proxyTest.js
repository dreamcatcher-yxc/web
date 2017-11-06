const prompt = (msg = '', num = 20) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('代理(Proxy 测试)');
{
    var obj = new Proxy({}, {
        get: function (target, key, receiver) {
            console.log(`getting ${key}!`);
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            console.log(`setting ${key}!`);
            return Reflect.set(target, key, value, receiver);
        }
    });
    obj.count = 1;
    obj.count++;
    obj.count++;
    obj.count++;
    obj.count;
}

prompt('同一个拦截器函数, 设置多个拦截操作');
{
    var handler = {
        get(target, name) {
            console.log('invoke get method...');
            if (name === 'prototype') {
                return Object.prototype;
            }
            return 'Hello, ' + name;
        },

        apply(target, thisBinding, args) {
            console.log('invoke set method...');
            return args[0];
        },

        construct(target, args) {
            console.log('invoke construct method...');
            return {value: args[1]};
        }
    };

    var fproxy = new Proxy(function(x, y) {
        return x + y;
    }, handler);

    console.log(fproxy(1, 2));// 1
    console.log(new fproxy(1, 2)); // {value: 2}
    console.log(fproxy.prototype === Object.prototype); // true
    console.log(fproxy.foo === 'Hello, foo'); // true
}

prompt('实例');
{
    prompt('1. 代理数组的方法');
    function createArr(... eles) {
        let handler = {
            get(target, propertyKey, receiver) {
                let index = Number(propertyKey);
                if(index < 0) {
                    propertyKey = String(target.length + (index % target.length));
                }
                return Reflect.get(target, propertyKey, receiver);
            }
        };
        return new Proxy([...eles], handler);
    }
    var arr = createArr('a', 'b', 'c', 'd', 'e');
    console.log(arr[1]); // 'b'
    console.log(arr[-1]); // 'e'
    console.log(arr[-3]); // 'c'
    console.log(arr[-7]); // 'd'

    // 需要在浏览器环境中执行
    //prompt('2. 实现方法的链式调用');
    //const double = n => n * 2;
    //const pow = n => n * n;
    //const reverseInt = n => n.toString().split('').reverse().join('') || 0;
    //
    //const pipe = val => {
    //    let funStack = [];
    //    let proxy = new Proxy({}, {
    //        get(pipeObj, fnName) {
    //            if(fnName == 'get') {
    //                fnName.reduce((val, fn) => fn(val), val);
    //            } else {
    //                funStack.push(window[fnName]);
    //            }
    //        }
    //    });
    //    return proxy;
    //}
    //console.log(pipe(3).double.pow.reverseInt.get);
    // Proxy 可以代理的方法还有很多, 具体可以参看阮一峰的ES6教程.
}

prompt('Proxy.revocable');
{
    // Proxy 的该方法能够返回一个可取消的 Proxy 实例
    // Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
    let target = {};
    let handler = {};

    let {proxy, revoke} = Proxy.revocable(target, handler);

    proxy.foo = 123;
    proxy.foo // 123

    //revoke();
    //proxy.foo // TypeError: Cannot perform 'get' on a proxy that has been revoked
}

prompt('this 问题');
{
    //虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，
    // 也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字
    // 会指向 Proxy 代理。
}
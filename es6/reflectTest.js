const prompt = (msg = '', num = 20) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('Reflect.get');
{
    let person = {
        name : 'zs',
        age : 20,
        get resume() {
            return 'name: ' + this.name + ', age: ' + this.age;
        }
    };

    let person2 = {
        name : 'lisi',
        age : '22'
    };

    console.log(Reflect.get(person, 'name'));
    console.log(Reflect.get(person, 'age'));
    console.log(Reflect.get(person, 'resume'));
    // 设置 receiver, 相当于在调用 resume(set 方法) 的时候 this 指向 receiver
    console.log(Reflect.get(person, 'resume', person2));
}

prompt('Reflect.set');
{
    let person = {
        name : 'zs',
        age : 20,
        get resume() {
            return 'name: ' + this.name + ', age: ' + this.age;
        }
    };

    let handler = {
        set(target, prop, val, rece) {
            console.log('invoke set method...');
            console.log('target: %o, prop: %s, val: %s, rece: %o', target, prop, val, rece);
            // Reflect.set 传入了 rece, 会调用 rece 的 defineProperty 为 target 赋值.
            Reflect.set(target, prop, val, rece);
        },
        defineProperty(target, key, attribute) {
            console.log('invoke defineProperty method...');
            console.log('target: %o, key: %s, attribute: %s', target, key, attribute);
            Reflect.defineProperty(target, key, attribute);
        }
    }

    let proxy = new Proxy(person, handler);

    proxy.name = 'aaa';
    // Proxy 可以代理的方法还有很多, 具体可以参看阮一峰的ES6教程.
}
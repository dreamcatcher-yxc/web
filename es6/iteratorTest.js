const prompt = (msg = '', num = 20) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('实例');
{
    function makeIterator(arr) {
        let next = 0;
        return {
            hasNext() {
              return next < arr.length;
            },
            next() {
                return next < arr.length ? arr[next++] : undefined;
            }
        }
    }
    var it = makeIterator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    while(it.hasNext()) {
        console.log(it.next()) ;
    }
}

prompt('自定义 Symbol.iterator 方法');
{
    let person = {
        name : 'zhangsan',
        gender : 'male',
        age : '20',
        length : 3,
        [Symbol.iterator]() {
            const self = this;
            let next = 0;
            return {
                next() {
                    let val = undefined;
                    if(next < 3) {
                        switch (next) {
                            case 0:
                                val = self.name;
                                break;
                            case 1:
                                val = self.gender;
                                break;
                            case 2:
                                val = self.age;
                                break;
                        }
                        next++;
                        return {done : false, value: val}
                    } else {
                        return {done : true, value : val};
                    }
                }
            }
        }
    };
    //for(let e of person) {
    //    console.log(e);
    //}
    console.log(...person);
    // 需要使用 Iterator 接口的场所.
    // 1. 解析赋值. 2. 扩展运算符. 3. yield*
    // 4. for...of, Array.from(), Map(), Set(), WeakMap(). WeakSet(), Promise.all,  Promise.race()
    // note: 在 JS 中字符串是一个类似于数组的对象.
    console.log(...'abc'); // a b c
}

prompt('Iterator 和 Generator 函数');
{
    // 1. 上述的 person 对象可以使用下面的方法生成 Iterator 函数.
    //let person = {
    //    [Symbol.iterator] : function* () {
    //        yield  'zhangsan';
    //        yield  'male';
    //        yield  '20'
    //    }
    //}
    // 或者如下的简洁方式.
    let person = {
        *[Symbol.iterator]() {
            yield  'zhangsan';
            yield  'male';
            yield  '20'
        }
    };
    console.log(...person); // zhangsan male 20
}

prompt('return()、throw() 方法');
{
    // 1. throw 方法是配合 Generator 函数使用的, 一般不会使用到, 下面介绍 return 函数的使用方式.
    // 数组遍历器默认提供的 return 函数.
    for(let e of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
        if(e % 2) continue
        console.log(e);
    }
    // 自定义对象的遍历器.
    let person = {
        *[Symbol.iterator]() {
            yield  'zhangsan';
            yield  'male';
            yield undefined;
            yield  20
        }
    };
    for(let e of person) {
        if(!e) {
           //throw new Error('can\'t exists undefined proerty');
           break;
        }
        console.log(e);
    }
    // 1. return 函数会在 for...of 结构中使用 continue、break、throw new Error() 的时候触发, 具体参看阮一峰ES6教程.
    // 2. for...of 遍历的对象中必须提供了 iterator 接口
}

prompt('数组')
{
    let arr = ['a', 'b', 'c'];
    // 遍历下标
    for(let e in arr) {
        console.log(e); // 0 1 2
    }
    // 遍历值
    for(let e of arr) {
        console.log(e); // a b c
    }
}

prompt('Set、Map');
{
    let s = new Set(['a', 'b', 'c']);
    let m = new Map([['name', 'zhangsan'], ['gender', 'male'], ['age', 20]]);
    for(let e of s) {
        console.log(e);
    }
    for(let e of m) {
        console.log(e);
    }
    for(let [k, v] of m) {
        console.log(`${k} => ${v}`);
    }
}

//
prompt('for...of ')





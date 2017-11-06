const prompt = ([msg = '', num = 20]) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('Set 结构测试');
{
    let s = new Set();
    [1, 2, 3, 4, 5, 6, 7,1, 3, 5].forEach(e => s.add(e));
    console.log(...s); // 1, 2, 3, 4, 5, 6, 7
    console.log(s.size); // 7
    s.delete(2);
    console.log(...s); // 1 3 4 5 6 7
    // Set.size: 集合中有多少给元素
    // Set.delete(val): 删除某个值, 返回值为 Boolean 类型.
    // Set.has(val):
    // Set.clear(): 清空集合, 没有返回值.
    // 可以使用 Array.from(Set): 将 Set 转换为数组.
    // (arr) => Array.form(new Set(arr)); // 去除数组中的重复元素.

    for(let val of s) {
        console.log(val);
    }

    // 更多例子参看阮一峰的学习笔记.
}

prompt('Set 的应用');
{
    // 1. Set 中使用 Array 的 Map 和 Filter
    let s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let t1 = [...s].map(x => x ** x);
    console.log(...t1);
    let t2 = [...s].filter(x => x % 2 == 0);
    console.log(...t2);
    // 2. 使用 Set 实现 并集、交集、差集
    let c1 = new Set([1, 2, 3, 4, 5, 6, 7]);
    let c2 = new Set([5, 6, 7, 8, 9, 10, 11]);
    let c3 = new Set([...c1, ...c2]); // 并集
    let c4 = new Set([...c1].filter(x => c2.has(x))); // 交集
    let c5 = new Set([...[...c1].filter(x => !c2.has(x)), ...[...c2].filter(x => !c1.has(x))]); // 差集
    console.log(...c3);
    console.log(...c4);
    console.log(...c5);
    // WeakSet、Map、WeakMap 的使用参看教程.
}

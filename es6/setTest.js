const prompt = ([msg = '', num = 20]) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('Set 结构测试');
{
    let s = new Set();
    [1, 2, 3, 4, 5, 6, 7,1, 3, 5].forEach(e => s.add(e));
    console.log(...s); // 1, 2, 3, 4, 5, 6, 7
}

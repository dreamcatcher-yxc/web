const prompt = (msg = '', num = 20) => {
  //console.log(msg);
  //console.log(num);
  console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('函数作用域');
{
    let foo = 'outer';
    function bar(func = () => foo) {
      let foo = 'bar';
      console.log(func()); // outer, 因为此时 foo 指向为函数外部定义的 foo 变量.
    }
    bar();

    // 下面是一个比较复杂的例子

}

prompt('应用');
{
  function throwIfMissing() {
    throw new Error('Missing parameter');
  }
  function foo(mustParameter = throwIfMissing()) {
    console.log(mustParameter);
  }
  foo(1);
  //foo();
}

prompt('2. 项数组中插入数字');
{
    function appendValsToArr(arr, ...nums) {
      nums.forEach(num => arr.push(num));
    }
    let arr = [1, 2, 3];
    console.log(arr.join(','));
    appendValsToArr(arr, 4, 5, 6);
    console.log(arr.join(','));
}

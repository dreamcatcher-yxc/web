const prompt = (msg = '', num = 20) => {
    console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt('修饰器');
{
    // 提案
    // @testable
    // class MyTestableClass {
    // }
    // function testable(target) {
    //     target.isTestable = true;
    // }
    // MyTestableClass.isTestable // true
}


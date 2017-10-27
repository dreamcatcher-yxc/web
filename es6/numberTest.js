const prompt = ([msg = '', num = 20]) => {
  console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt(['数值扩展']);
{
    // 0b 0B: 二进制
    // 0o 0O: 八进制
    console.log(0b111110111.toString(10));
    console.log(Number('0b111110111'));
    // Number.isFinite: 判断是否有限
    // Number.isNaN: 判断是否为 NaN
    // ES6 将 parseInt 和 parseFloat 转换到 Number 上, 为的是逐渐减少全局方法, 使得语言逐步模块化
    // isInteger: 判断一个数字是否为正整数, 3.0 也算正整数
    console.log(Number.isInteger(3)); // true
    console.log(Number.isInteger(3.0)); // true
    console.log(Number.isInteger(3.5)); // false

    // js 数值能够表示的最小数字
    // ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示1与大于1的最小浮点数之间的差。
    console.log(Number.EPSILON === Math.pow(2, -52));
    console.log(0.1 + 0.2 === 0.3); // false

    // js 能够表示的数值范围
    console.log(`${Number.MIN_SAFE_INTEGER} ~ ${Number.MAX_SAFE_INTEGER}`);
    // 使用 isSafeInteger 判断表示的数值是否在 js 能够表示的数值范围之内.
    console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)); // false
    console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false
    // 在使用每个函数的时候不要只是验证计算的结果, 还要注意验证每个参与计算的数值。
    console.log(9007199254740993 === 9007199254740992); // true
}

prompt(['Math 对象的扩展']);
{
  // trunc: 去除数值小数的部分, 非数值会首先转换为数值再去除
  console.log(Math.trunc(4.5)); // 4
  console.log(Math.trunc(-4.5)); // -4
  // 还有许多扩展, 但是通常使用不到, 这里不举例子.
  // ** 指数运算符号
  console.log(2 ** 2); // 4
  console.log(2 ** 3); // 8
  // Integer, 为了使 js 适合于科学和金融方面的精度计算, 目前只提案, 相当于 Java 中的 BigDecimal, 目前只是提案, 暂时只是了解一下
  // 关于 Integer 的运算方面, 也暂时了解一下.
}

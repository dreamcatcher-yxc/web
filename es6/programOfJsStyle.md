<h1 align='center'>代码编程风格</h1>

## 1. 块级作用域
- 使用 let 取代 var
- 全局常量和线程安全
    - let 和 const 之间建议优先使用 const

## 2. 字符串
- 静态字符串统一使用单引号或者反引号, 不实用双引号, 动态字符串使用反引号
```
// bad
const a = "foobar";
const b = 'foo' + a + 'bar';

// acceptable
const c = `foobar`;

// good
const a = 'foobar';
const b = `foo${a}bar`;
const c = 'foobar';
```

## 3. 解析赋值
- 使用数组成员为多个变量赋值, 优先使用解析赋值的方式.
```
const arr = [1, 2, 3, 4];
// bad
const first = arr[0];
const second = arr[1];
// good
const [first, second] = arr;
```
- 函数的参数如果是对象的成员, 优先使用解析赋值.
```
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}

// best
function getFullName({ firstName, lastName }) {
}
```
- 如果函数的...
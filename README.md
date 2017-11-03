# ES6 学习测试工程
## 1. Object 扩展
1. Object.getOwnPropertyDescriptor([Object], [propertyName]): 获取对象属性的描述信息
    - for ... in 循环: 只遍历对象自身的和继承的可以枚举的属性。
    - Object.keys(): 返回对象自身的可以枚举的属性的键名。
    - Object.stringify(): 只串化对象自身可以枚举的属性。
    - Object.assign(): 忽略 enumerable 为 false 的属性, 只拷贝对象自身的可枚举属性。

2. Object.getOwnPropertyDescriptors(Object)： 获取对象的的所有属性描述。
    - Object.setPrototypeOf(): 设置一个对象的 prototype 对象.
    - Object.getPrototypeOf(): 获取一个对象的 pritotype 对象.

3. super 关键字
    - super.[propertyName]: 相当于 Object.getPrototypeOf(this).[propertyName].

> 当 super 表示原型对象的时候只能用于对象的方法之中, 用在其他地方都会报错

## 2. Symbol
1. 产生背景: ...

## 3. Set 结构
1. Set 结构和数组结构相似, 但是其中的值不能存在相应的数值.
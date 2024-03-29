## 介绍
  typescript 联系项目

## 目录文件

- src
  - test1.ts - 快速入门示例
  - test2.ts - 基础类型
  - test3.ts - 变量声明
  - test4.ts - 接口
  - test5.ts - 类
  - test6.ts - 函数
  - test7.ts - 泛型
  - test8.ts - 枚举
  - test9.ts - 类型推论
  - test10.ts - 高级类型
  - test11.ts - Symbol
  - 迭代器和生成器
    - 讲述的就是 for-in 和 for-of 语法迭代遍历对象时，需要对象实现了 iterator 属性，既为可迭代的，具体参考 [迭代器和生成器](https://www.tslang.cn/docs/handbook/iterators-and-generators.html)，这里不做 demo 演示。
  - moudleTest - 模块测试
    - TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。
    - import、export 语法基本和 es6 一致。
    - 在模块里面虽然可以使用命名空间，但是完全没有必要，而且会模块导出复杂性。
  - namespace - 命名空间
    > 关于术语的一点说明: 请务必注意一点，TypeScript 1.5里术语名已经发生了变化。 “内部模块”现在称做“命名空间”。 “外部模块”现在则简称为“模块”，这是为了与 ECMAScript 2015里的术语保持一致，(也就是说 module X { 相当于现在推荐的写法 namespace X {)。
    - 命名空间是位于全局命名空间下的一个普通的带有名字的JavaScript对象。 这令命名空间十分容易使用。 它们可以在多文件中同时使用，并通过 --outFile结合在一起。 命名空间是帮你组织Web应用不错的方式，你可以把所有依赖都放在HTML页面的 &lt;script&gt;标签里。
  - 命名空间和模块
    - 命名空间
      > 命名空间是位于全局命名空间下的一个普通的带有名字的JavaScript对象。 这令命名空间十分容易使用。 它们可以在多文件中同时使用，并通过 --outFile结合在一起。 命名空间是帮你组织Web应用不错的方式，你可以把所有依赖都放在HTML页面的 &lt;script&gt;标签里。
    
    - 模块
    
      > 像命名空间一样，模块可以包含代码和声明。 不同的是模块可以 声明它的依赖。
      
      > 模块会把依赖添加到模块加载器上（例如CommonJs / Require.js）。 对于小型的JS应用来说可能没必要，但是对于大型应用，这一点点的花费会带来长久的模块化和可维护性上的便利。 模块也提供了更好的代码重用，更强的封闭性以及更好的使用工具进行优化。

      > 对于Node.js应用来说，模块是默认并推荐的组织代码的方式。

      > 从ECMAScript 2015开始，模块成为了语言内置的部分，应该会被所有正常的解释引擎所支持。 因此，对于新项目来说推荐使用模块做为组织代码的方式。

    - 个人理解
      
      > 命名空间解决的是全局作用域下多个命名冲突的问题，相当于 Java 通过包名隔离多个区分多个同名的类；而模块则是为了解决代码过多之后如何模块化拆分的问题。通常来说一个模块中命名是不会重复的，如果重复则是代码组织有问题，所以不推荐在模块中还是用命名空间，这样反而会增加代码的复杂性和降低代码的可读性，具体参看: [模块和命名空间](https://www.tslang.cn/docs/handbook/namespaces-and-modules.html)。

  - 模块解析
    - 阐述了 TS 两种模块解析方式：classic、nodejs（默认） 的方式的模块解析规则，参看：[模块解析](https://www.tslang.cn/docs/handbook/module-resolution.html)

  - test12.ts - 模块合并



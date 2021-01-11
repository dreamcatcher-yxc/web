## 介绍

react 中如何获取当前原生 DOM 对象（使用 React API）

## 目录文件说明

- `index.js` - 入口
- `MyComp` - 子组件，其 ref 会设置在父组件传递的 ref 上

> 在高阶组件中，可以使用 React.forwardRef 转发 ref 到被包裹组件中，具体使用参看：
[forward refs](https://zh-hans.reactjs.org/docs/forwarding-refs.html)
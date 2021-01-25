## 说明

React Hooks 入门示例

## 文件说明

- `index.js` - 入口
- `Counter.js` - 使用 useState 创建状态，实现一个简单的按钮点击计数组件
- `FiendStatus.js` - 使用 useEffect 实现在函数式组件中执行副作用代码
- `UserInfo.js` - 使用 FriendStatus 组件，并且实现动态销毁和创建该组件，可以观察到 useEffect 的创建的销毁事件

## hooks 的使用要求

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

> 详情可以参看：
- [Hook 概览](https://zh-hans.reactjs.org/docs/hooks-overview.html) 
- [使用 State Hook](https://zh-hans.reactjs.org/docs/hooks-state.html)
- [使用 Effect Hook](https://zh-hans.reactjs.org/docs/hooks-effect.html)
- [自定义 Hook](https://zh-hans.reactjs.org/docs/hooks-custom.html)


## 介绍

react Portal 允许我们将一个元素关挂载到非父元素之外的其他元素

## 目录文件说明

- `index.js` - 入口
- `parent.js` - 父组件，关在到 div#root 元素下
- `modal.js` - 模拟一个模态框，此元素挂载到 div#modal-root 元素下，与 div#root 元素属于平级关系
- `child.js` - 该组件作为 `Modal` 组件的子元素，其会挂载到 div#modal-root 元素下

> 具体使用参看：
[Portals](https://zh-hans.reactjs.org/docs/portals.html)
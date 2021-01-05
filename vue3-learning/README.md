# vue3-learning

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Demo 说明

- `Demo01` 测试 Setup API
- `Demo02` 测试 Setup API 下 provide & reject 的使用
- `Demo04` 测试 `teleport` 组件使用
- `Demo05` 测试 Vue3 支持根组件多标签（在 Vue2 中只支持根组件单标签）
- `Demo06` Vue3 中 `v-model` 的新使用方式
- `Demo07` Vue3 中 v-bind 中声明的 property 绑定的顺序决定了它们如何合并，换句话说，相对于假设开发者总是希望单独的 property 覆盖 object 中定义的内容，现在开发者对自己所希望的合并行为有了更好的控制。

    ```html
    <!-- vue2.x -->
    
    <!-- template -->
    <div id="red" v-bind="{ id: 'blue' }"></div>
    <!-- result -->
    <div id="red"></div>

    <!-- vue3.x -->

    <!-- template -->
    <div id="red" v-bind="{ id: 'blue' }"></div>
    <!-- result -->
    <div id="blue"></div>

    <!-- template -->
    <div v-bind="{ id: 'blue' }" id="red"></div>
    <!-- result -->
    <div id="red"></div>
    ```
- `Demo08` Vue3 `for` 中 refs 不再自动注册数组
- `Demo09` Vue3 中的函数式组件，既 **只能使用普通函数创建功能组件**
- `Demo10` 需要使用 `defineAsyncComponent` 显式的定义异步组件

const fs = require('fs')
const Vue = require('vue')
const createRender = require('vue-server-renderer').createRenderer

// 第 1 步：创建一个 Vue 实例
const app = new Vue({
    template: `<h1>hello world!</h1>`
})

// 第 2 步：创建一个 renderer
const renderer = createRender({
    template: fs.readFileSync('./templates/index.template.html', 'utf-8')
});

// 第 3 步：将 Vue 实例渲染为 HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
})

// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})

/**
 * 注意 <!--vue-ssr-outlet--> 注释 -- 这里将是应用程序 HTML 标记注入的地方。
 */
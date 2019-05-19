const fs = require('fs')
const Vue = require('vue')
const createRender = require('vue-server-renderer').createRenderer

// 第 1 步：创建一个 Vue 实例
const app = new Vue({
    template: `<h1>hello world!</h1>`
})

// 第 2 步：创建一个 renderer
const renderer = createRender({
    template: fs.readFileSync('./templates/index2.template.html', 'utf-8')
});

// 第 3 步：将 Vue 实例渲染为 HTML
const context = {
  title : 'hello',
  meta : `<meta http-equiv="content-type" content="text/html;charset=UTF-8">`
}

renderer.renderToString(app, context, (err, html) => {
  if (err) throw err
  console.log(html)
})

// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
renderer.renderToString(app, context).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
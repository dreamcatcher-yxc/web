const fs = require('fs')
const Vue = require('vue')
const server = require('express')()
const createRender = require('vue-server-renderer').createRenderer

const renderer = createRender({
    template: fs.readFileSync('./templates/index.template.html', 'utf-8')
});

function createApp (context) {
  return new Vue({
    data: {
      url: context.url
    },
    template: `<div>access url is: {{ url }}</div>`
  })
}

server.get('*', (req, res) => {
  const context = { url: req.url }
  const app = createApp(context)

  renderer.renderToString(app, (err, html) => {
    // 处理错误……
    res.end(html)
  })
})


server.listen(8080)
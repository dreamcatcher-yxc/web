const [Koa, bodyParser, router, fs] = [require('koa'), require('koa-bodyparser'), require('koa-router')(), require('fs')];
const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

// 必须在路由被添加之前添加
app.use(bodyParser());
// 添加路由处理
app.use(router.routes());
app.listen(3000);
console.log('app started at port 3000...');
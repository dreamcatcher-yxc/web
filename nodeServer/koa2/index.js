const [Koa, bodyParser, router, fs, controller, ] = [require('koa'), require('koa-bodyparser'), require('koa-router')(), require('fs'), require('./controller')];
const app = new Koa();
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(bodyParser());
app.use(controller('controller'));
app.listen(3000);
console.log('app started at port 3000...');
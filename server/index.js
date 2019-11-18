const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();

const local = process.env.LOCAL;

const next = require('next');
const socket = require('./socket');
const app = next({ dev: local || false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();

  // 创建流
  router.get("/api/createStream", async ctx => {
    const { key } = ctx.query;
    const { port, msg } = socket.createStream(key);

    ctx.body = {
      status: 0,
      msg: msg || '频道创建',
      port
    }
  });

  router.get('/index/:line', async (ctx) => {
    const queryParams = { line: ctx.params.line }

    await app.render(ctx.req, ctx.res, '/index', queryParams);
  })

  router.get("*", async (ctx) => {
    // await app.render(ctx.req, ctx.res, ctx.url, ctx.query);
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());

  server.listen(5999, () => {
    console.log(`> Ready on http://127.0.0.1:5999`);
  });
});

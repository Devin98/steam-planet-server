const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const User = require('./models/User').UserModel;
const jwt = require('jwt-simple');
const jwtTokenSecret = require('./config').jwtTokenSecret;

// const index = require('./routes/index')
// const users = require('./routes/users')
const routes = [
  require('./routes/index'),
  require('./routes/user'),
];

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});


// CORS
app.use(async (ctx, next) => {
  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 200
  }
  ctx.set("Access-Control-Allow-Origin", "*"); //允许哪些url可以跨域请求到本域
  ctx.set("Access-Control-Allow-Methods", "OPTION,GET,POST"); //允许的请求方法，一般是GET,POST,PUT,DELETE,OPTIONS
  ctx.set("Access-Control-Allow-Headers", "x-requested-with,content-type,Token"); //允许哪些请求头可以跨域
  await next();
});


// token
app.use(async (ctx, next) => {
  // todo 解析token
  if (token) {
    try {
      const decoded = jwt.decode(token, jwtTokenSecret);
      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      } else {
        User.findOne({
          _id: decoded.iss
        }, function (err, user) {
          req.user = user;
        });
      }
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
  await next();
});


// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
for (let i = 0; i < routes.length; i++) {
  app.use(routes[i]['routes'](), routes[i]['allowedMethods']())
}

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;

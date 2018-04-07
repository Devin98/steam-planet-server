const router = require('koa-router')();
const bcrypt = require('bcrypt');
const log = require('../utils/logUtil').log();
const UserModel = require('../models/User').UserModel;
const RestResult = require('../utils/RestResultUtil');
const jwt = require('jwt-simple');
const moment = require('moment');
const jwtTokenSecret = require('../config').jwtTokenSecret;

router.prefix('/iv1/user');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
});

router.post('/login', async (ctx, next) => {
  log.info(ctx.request.body);
  let {
    name,
    pwd
  } = ctx.request.body;

  const user = await UserModel.findOne({
    name
  });
  if (!user) {
    ctx.body = RestResult.error(RestResult.BUSINESS_ERROR_CODE, '用户不存在');
    return;
  }
  log.info(user);
  const right = await bcrypt.compare(pwd, user.pwd);
  if (right) {
    const expires = moment().add(7,'days').valueOf();
    const token = jwt.encode({
      iss: user.name,
      exp: expires
    }, jwtTokenSecret);
    ctx.body = RestResult.success({
      name,
      token,
    })
  } else {
    ctx.body = RestResult.error(RestResult.BUSINESS_ERROR_CODE, '密码错误')
  }
});


router.post('/register', async (ctx, next) => {
  log.info(ctx.request.body);
  let {
    name,
    pwd
  } = ctx.request.body;

  const hash = await bcrypt.hash(pwd, 10);
  new UserModel({
    name,
    pwd: hash
  }).save();

  ctx.body = {
    name,
    token: name + pwd
  }
});


module.exports = router;

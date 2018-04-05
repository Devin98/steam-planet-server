# JWT权限控制

[在Nodejs中使用JSON WEB Tokens](http://cnodejs.org/topic/53c652bfc9507b404446ee40)

## 安装

```bash
yarn add jwt-simple
yarn add moment
```

## 使用

```js
const expires = moment().add('days', 7).valueOf();
const jwtTokenSecret = 'csdfq5345gdzrf34fers65'
const token = jwt.encode({
  iss: user.id,
  exp: expires
}, jwtTokenSecret);

res.json({
  token : token,
  expires: expires,
  user: user.toJSON()
});
```

```js
if (token) {
  try {
    const decoded = jwt.decode(token, app.get('jwtTokenSecret'));
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
```

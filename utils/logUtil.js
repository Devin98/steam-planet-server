/**
 * tracer库简单封装，加了开关以及输出等级设置
 * @param open 是否开启log，默认打开
 * @param level 控制台输出等级，默认最低（全部输出）
 * @return {{log: log, trace: trace, debug: debug, info: info, warn: warn, error: error}}
 * @using
 * var log = require('../utils/logUtil').log();
 * log.log('hello');
 * log.trace('hello', 'world');
 * log.debug('hello %s',  'world', 123);
 * log.info('hello %s %d',  'world', 123, {foo:'bar'});
 * log.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
 * log.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
 * @if 生产环境关闭log
 * var log = require('../utils/logUtil').log(false);
 * @if 修改输出等级（只有大于等于设置等级的log才会输出）
 * var log = require('../utils/logUtil').log(true,'debug');
 * @main using log.debug() log.info() log.warn() log.error()
 */
exports.log = function (open = true, level = 'log') {
  if (open) {
    return require('tracer').console({
      level: level
    });
  } else {
    return {
      log: function () {},
      trace: function () {},
      debug: function () {},
      info: function () {},
      warn: function () {},
      error: function () {}
    }
  }
};

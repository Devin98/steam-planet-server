const mongoose = require('../config').mongoose;
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const AutoIncrementIdScheme = new Schema({
  nextId: {
    type: Number,
    default: 1
  },
  collectionName: String
});

const AutoIncrementIdEntity = mongoose.model('AutoIncrementIdEntity', AutoIncrementIdScheme, 'autoIncrementId');


exports.mongoose = mongoose;
exports.Schema = Schema;
exports.ObjectId = ObjectId;
exports.Mixed = Schema.Types.Mixed;

/**
 * 自增长工具
 * @param collection  记录哪一个集合的自增长值
 * @param callback 回调函数
 * @param start 开始值
 * @param step 增长步长
 */

exports.nextId = function (collection, callback, start, step) {
  AutoIncrementIdEntity.findOne({
    collectionName: collection
  }, function (err, adventure) {
    if (adventure) {
      const nextId = parseInt(adventure.nextId);
      AutoIncrementIdEntity.update({
        _id: adventure.id
      }, {
        $set: {
          nextId: nextId + (step || 1)
        }
      }, function () {
        callback(nextId);
      });
    } else {
      adventure = new AutoIncrementIdEntity({
        nextId: (start || 1),
        collectionName: collection
      });
      adventure.save(function () {
        callback(1);
      });
    }
  });
};

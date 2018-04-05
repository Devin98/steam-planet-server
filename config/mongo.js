const mongoose = require('mongoose');
const log = require('../utils/logUtil').log();

// Use bluebird promise framework
mongoose.Promise = require('bluebird');
const uri = 'mongodb://127.0.0.1:27017/steam-plant';
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(uri, options).then(
  () => {
    log.info('mongodb connect success in 127.0.0.1:27017/steam-plant')
  },
  err => {
    log.error('mongodb connect error in 127.0.0.1:27017/steam-plant')
  }
);

exports.mongoose = mongoose;

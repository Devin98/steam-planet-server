exports.mongoose = require('./mongo').mongoose;
exports.jwtTokenSecret = '67b40ddf620090114806747ed79a1519064fb295bd8de29b616b50f98fb5a892';
exports.needLoginUrlRegs = [
  /^(\/)+iv1(\/)+profile/,
  /^(\/)+iv1(\/)+test/,
];

exports.data = require('./data.json');

exports.findByUsername = function(username, cb) {
    process.nextTick(function() {
      for (var i = 0, len = exports.data.participants.length; i < len; i++) {
        var record = exports.data.participants[i];
        if (record.name === username) {
          return cb(null, record);
        }
      }
      return cb(null, null);
    });
  }
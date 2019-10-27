// var records = [
//     { id: 1, username: 'user1', password: '123456', displayName: 'User 1'},
//     { id: 2, username: 'user2', password: '123456', displayName: 'User 2'}
// ];

// exports.findById = function(id, cb) {
//   process.nextTick(function() {
//     var idx = id - 1;
//     if (records[idx]) {
//       cb(null, records[idx]);
//     } else {
//       cb(new Error('User ' + id + ' does not exist'));
//     }
//   });
// }

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    console.log(data.participants)
    for (var i = 0, len = records.length; i < len; i++) {
      var record = data.participants[i];
      if (record.name === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  id: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  accessToken: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);

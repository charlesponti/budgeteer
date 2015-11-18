'use strict';

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  id: {type: String, required: true},
  accessToken: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);

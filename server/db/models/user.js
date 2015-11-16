'use strict';

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  facebookId: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);

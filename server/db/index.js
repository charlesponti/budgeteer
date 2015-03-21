'use strict';

var util = require('util');
var mongoose = require('mongoose');
var config = require('../../config');

mongoose.connect(config.db);

var db = mongoose.connection;

db.once('open', function(err) {
  if (err)
    throw new Error(err);

  return util.log("Connected to " + config.db + " database");
});

module.exports = db;

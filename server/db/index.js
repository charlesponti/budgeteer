const util = require('util');
const mongoose = require('mongoose');

// Require models
require('./models/user');
require('./models/weight');

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/backpack-dev");

var db = mongoose.connection;

db.once('open', function(err) {
  if (err)
    throw new Error(err);

  return util.log("Connected to " + config.db + " database");
});

module.exports = db;

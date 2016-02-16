const util = require('util')
const mongoose = require('mongoose')
const dbURL = process.env.MONGODB_URL || 'mongodb://localhost/backpack-dev'

// Require models
require('./models/user')
require('./models/weight')
require('./models/transaction')
require('./models/cost-per-day')

mongoose.connect(dbURL)

var db = mongoose.connection

db.once('open', function (err) {
  if (err)
    throw new Error(err)

  return util.log('Connected to ' + dbURL + ' database')
})

module.exports = db

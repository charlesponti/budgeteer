'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema({
  name: String,
  price: Number,
  costPerDay: Number,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date: Date
})

module.exports = mongoose.model('CostPerDay', Schema)

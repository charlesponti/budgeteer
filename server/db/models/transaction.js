'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema({
  description: String,
  category: String,
  amount: Number,
  date: Date,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Transaction', Schema)

'use strict'

var mongoose = require('mongoose')

var WeightSchema = mongoose.Schema({
  kgs: String,
  lbs: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date: Date
})

module.exports = mongoose.model('Weight', WeightSchema)

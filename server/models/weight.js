'use strict';

var mongoose = require('mongoose');

var WeightSchema = new mongoose.Schema({
  kilograms: Number,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  created_at: Date,
  updated_at: Date
});

WeightSchema.pre('save', function(next) {
  var date = new Date();

  if (this.isNew) {
    // Update `created_at` attribute
    this.created_at = date;
  }

  // Update `updated_at` attribute
  this.updated_at = date;

  next();
});

mongoose.model('Weight', WeightSchema);

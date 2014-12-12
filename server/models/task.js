'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose');

/**
 * Task Schema
 * @type {mongoose.Schema}
 */
var TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    unique: true,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  created_at: { type: Date },
  updated_at: { type: Date }
});

/**
 * Perform actions before Task instance is saved
 */
TaskSchema.pre('save', function(next) {
  var date = new Date();

  if (this.isNew) {
    // Update `created_at` attribute
    this.created_at = date;
  }

  // Update `updated_at` attribute
  this.updated_at = date;

  next();
});

var Task = mongoose.model('Task', TaskSchema);
